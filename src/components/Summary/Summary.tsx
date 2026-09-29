import { useReveal } from '../../hooks/useReveal'
import { cx } from '../../lib/cx'
import { useLocale, useProfile } from '../../state/useSettings'
import layout from '../Section/layout.module.css'
import { SectionLabel } from '../Section/SectionHeader'
import styles from './Summary.module.css'

export function Summary() {
  const { ui, t } = useLocale()
  const profile = useProfile()
  const reveal = useReveal<HTMLElement>()
  return (
    <section ref={reveal} id="summary" className={cx(layout.twoColumn, styles.summary)}>
      <SectionLabel className={styles.label}>{ui.sections.summary}</SectionLabel>
      <p className={styles.text}>{t(profile.summary)}</p>
    </section>
  )
}
