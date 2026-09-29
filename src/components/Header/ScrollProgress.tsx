import { useRef } from 'react'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { scrollMetrics } from '../../lib/scrollFrame'
import styles from './ScrollProgress.module.css'

/** Thin bar on the header's bottom rule showing how far the page has been read. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useScrollFrame(() => {
    const { top, max } = scrollMetrics()
    const progress = max > 0 ? Math.min(1, Math.max(0, top / max)) : 0
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
  })

  return <div ref={barRef} className={styles.bar} aria-hidden />
}
