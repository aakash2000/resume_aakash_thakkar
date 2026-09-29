import { useCallback } from 'react'
import { registerReveal, type RevealKind } from '../lib/reveal'
import { useSettings } from '../state/useSettings'

/**
 * Ref callback that plays an entrance animation when the element first
 * scrolls into view. Does nothing when the visitor prefers reduced motion.
 */
export function useReveal<T extends HTMLElement>(kind: RevealKind = 'fade') {
  const { motion } = useSettings()
  return useCallback(
    (el: T | null) => {
      if (!el || !motion) return
      return registerReveal(el, kind)
    },
    [motion, kind],
  )
}
