import { useEffect, useState, type RefObject } from 'react'

interface ReplayLoopOptions {
  /** How long one run of the animation takes. */
  runMs: number
  /** How long the finished state stays on screen before replaying. */
  holdMs: number
  /** Fade-out before each replay, applied to `targetRef`. */
  fadeMs?: number
  enabled: boolean
  targetRef: RefObject<HTMLElement | null>
  /** Changing this restarts the timer (e.g. a new illustration). */
  restartKey?: unknown
}

/** Poll interval while the animation is off screen or the tab is hidden. */
const IDLE_CHECK_MS = 1000

function isOnScreen(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.bottom > 0 && rect.top < window.innerHeight
}

/**
 * Returns a counter that increments after every run + hold, for use as a React
 * `key` to replay a CSS-animated element. Fades the target out before each
 * replay, and waits while it is off screen or the tab is hidden.
 */
export function useReplayLoop({ runMs, holdMs, fadeMs = 400, enabled, targetRef, restartKey }: ReplayLoopOptions) {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let timer = 0
    let fade: Animation | undefined

    const replay = () => {
      const el = targetRef.current
      if (!el || document.visibilityState !== 'visible' || !isOnScreen(el)) {
        timer = window.setTimeout(replay, IDLE_CHECK_MS)
        return
      }
      // Keep the faded state until the new run mounts; cleanup then cancels it.
      fade = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: fadeMs, easing: 'ease', fill: 'forwards' })
      fade.onfinish = () => setCycle((c) => c + 1)
    }

    timer = window.setTimeout(replay, runMs + holdMs)
    return () => {
      window.clearTimeout(timer)
      fade?.cancel()
    }
  }, [enabled, runMs, holdMs, fadeMs, targetRef, restartKey, cycle])

  return cycle
}
