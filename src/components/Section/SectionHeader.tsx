import { useReveal } from '../../hooks/useReveal'
import { cx } from '../../lib/cx'
import styles from './Section.module.css'

/** Small uppercase section title. */
export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return <h2 className={cx(styles.label, className)}>{children}</h2>
}

/** Section title followed by a rule that fills the remaining width. */
export function SectionHeader({ children, className }: { children: string; className?: string }) {
  const reveal = useReveal<HTMLDivElement>()
  const revealRule = useReveal<HTMLSpanElement>('rule')
  return (
    <div ref={reveal} className={cx(styles.header, className)}>
      <SectionLabel>{children}</SectionLabel>
      <span ref={revealRule} className={styles.rule} aria-hidden />
    </div>
  )
}
