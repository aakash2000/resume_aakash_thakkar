import { useEffect, useRef } from 'react'
import { subscribeScrollFrame } from '../lib/scrollFrame'

/** Call `callback` once per frame while the page scrolls or resizes (and once on mount). */
export function useScrollFrame(callback: () => void) {
  const latest = useRef(callback)
  useEffect(() => {
    latest.current = callback
  })
  useEffect(() => subscribeScrollFrame(() => latest.current()), [])
}
