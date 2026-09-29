import { useEffect, useState } from 'react'

interface TweenOptions {
  duration: number
  delay?: number
  /** When false the tween sits at its end (progress 1). */
  enabled: boolean
  /** Changing this restarts the tween. */
  replayKey?: unknown
}

/**
 * A 0 → 1 progress value driven by requestAnimationFrame, for effects that
 * CSS cannot do (counting numbers, scrambling text). Jumps to the end when the
 * tab is hidden or the page is about to print.
 */
export function useTween({ duration, delay = 0, enabled, replayKey }: TweenOptions): number {
  // Progress is stored with the run it belongs to, so a new replayKey starts at 0 on the same render.
  const [state, setState] = useState({ run: replayKey, progress: 0 })

  useEffect(() => {
    if (!enabled) return

    let frame = 0
    const start = performance.now()
    const report = (progress: number) => setState({ run: replayKey, progress })
    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - start - delay) / duration))
      report(progress)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    const finish = () => {
      cancelAnimationFrame(frame)
      report(1)
    }
    const onVisibility = () => {
      if (document.visibilityState !== 'visible') finish()
    }

    frame = requestAnimationFrame(tick)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('beforeprint', finish)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('beforeprint', finish)
    }
  }, [enabled, replayKey, duration, delay])

  if (!enabled) return 1
  return state.run === replayKey ? state.progress : 0
}

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
