import { useEffect } from 'react'
import { finishAllAnimations } from '../lib/reveal'

/** Printing mid-animation would capture half-faded content, so jump everything to its end state. */
export function useFinishAnimationsOnPrint() {
  useEffect(() => {
    window.addEventListener('beforeprint', finishAllAnimations)
    return () => window.removeEventListener('beforeprint', finishAllAnimations)
  }, [])
}
