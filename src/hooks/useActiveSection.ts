import { useState } from 'react'
import { scrollMetrics } from '../lib/scrollFrame'
import { useScrollFrame } from './useScrollFrame'

/** A section counts as active once its top is within this distance of the viewport top. */
const ACTIVATION_OFFSET = 170

/**
 * The last section whose top has scrolled past the activation line.
 * At the very bottom of the page the last section wins, even if it is short.
 */
export function useActiveSection<T extends string>(ids: readonly T[]): T | null {
  const [active, setActive] = useState<T | null>(null)

  useScrollFrame(() => {
    let current: T | null = null
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top < ACTIVATION_OFFSET) current = id
    }
    const { top, max } = scrollMetrics()
    if (max > 0 && top >= max - 4) current = ids[ids.length - 1]
    setActive(current)
  })

  return active
}
