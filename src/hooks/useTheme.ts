import { useCallback, useLayoutEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { useMediaQuery } from './useMediaQuery'

export type Theme = 'dark' | 'light'

/** Shared with the inline script in index.html that sets the theme before first paint. */
const STORAGE_KEY = 'aakash-resume-theme'

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this visit only.
  }
}

interface ToggleOptions {
  /** Element the circular reveal grows from, usually the toggle button. */
  origin?: HTMLElement | null
  animate?: boolean
}

/**
 * Follows the system colour scheme until the visitor picks a theme, then
 * remembers that choice. Applies it as `data-theme` on <html>.
 */
export function useTheme() {
  const [stored, setStored] = useState<Theme | null>(readStoredTheme)
  const systemLight = useMediaQuery('(prefers-color-scheme: light)')
  const theme: Theme = stored ?? (systemLight ? 'light' : 'dark')

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = useCallback(
    ({ origin, animate = true }: ToggleOptions = {}) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      storeTheme(next)
      const commit = () => {
        flushSync(() => setStored(next))
        document.documentElement.dataset.theme = next
      }

      if (!animate || !document.startViewTransition) {
        commit()
        return Promise.resolve()
      }

      const rect = origin?.getBoundingClientRect()
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth
      const y = rect ? rect.top + rect.height / 2 : 0
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

      const transition = document.startViewTransition(commit)
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 620, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
          )
        })
        .catch(() => {})
      return transition.finished.catch(() => {})
    },
    [theme],
  )

  return { theme, toggle }
}
