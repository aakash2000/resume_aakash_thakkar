import { useEffect, type RefObject } from 'react'
import { EASE } from '../lib/motion'
import { useSettings } from '../state/useSettings'

/** Briefly dims and lifts `ref` after the visitor switches profile or language. */
export function useSwitchAnimation(ref: RefObject<HTMLElement | null>) {
  const { switchCount, motion } = useSettings()

  useEffect(() => {
    if (switchCount === 0 || !motion) return
    ref.current?.animate(
      [
        { opacity: 0.25, transform: 'translateY(4px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 380, easing: EASE },
    )
  }, [switchCount, motion, ref])
}
