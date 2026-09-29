import { resume } from '../../content/resume'
import { cx } from '../../lib/cx'
import { useLocale } from '../../state/useSettings'
import { TagList } from '../../ui'
import layout from '../Section/layout.module.css'
import { SectionHeader } from '../Section/SectionHeader'
import styles from './Skills.module.css'

export function Skills() {
  const { ui, t } = useLocale()
  return (
    <section id="skills" className={layout.section}>
      <SectionHeader className={styles.header}>{ui.sections.skills}</SectionHeader>
      <div className={styles.rows}>
        {resume.skills.map((group) => (
          <div key={t(group.label)} className={cx(layout.twoColumn, styles.row)}>
            <span className={styles.label}>{t(group.label)}</span>
            <TagList items={t(group.items)} />
          </div>
        ))}
        <div className={cx(layout.twoColumn, styles.row, styles.spoken)}>
          <span className={styles.label}>{ui.spokenLanguages}</span>
          <div className={styles.languages}>
            {resume.spokenLanguages.map(({ language, level }) => (
              <span key={level}>
                {t(language)} <span className={styles.level}>{level}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
