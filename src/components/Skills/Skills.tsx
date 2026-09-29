import { resume } from '../../content/resume'
import type { SkillGroup } from '../../content/types'
import { useReveal } from '../../hooks/useReveal'
import { cx } from '../../lib/cx'
import { useLocale } from '../../state/useSettings'
import { TagList } from '../../ui'
import layout from '../Section/layout.module.css'
import { SectionHeader } from '../Section/SectionHeader'
import styles from './Skills.module.css'

function SkillRow({ group }: { group: SkillGroup }) {
  const { t } = useLocale()
  const reveal = useReveal<HTMLDivElement>()
  const revealTags = useReveal<HTMLDivElement>('stagger')
  return (
    <div ref={reveal} className={cx(layout.twoColumn, styles.row)}>
      <span className={styles.label}>{t(group.label)}</span>
      <TagList ref={revealTags} items={t(group.items)} />
    </div>
  )
}

export function Skills() {
  const { ui, t } = useLocale()
  const revealSpoken = useReveal<HTMLDivElement>()
  return (
    <section id="skills" className={layout.section}>
      <SectionHeader className={styles.header}>{ui.sections.skills}</SectionHeader>
      <div className={styles.rows}>
        {resume.skills.map((group) => (
          <SkillRow key={t(group.label)} group={group} />
        ))}
        <div ref={revealSpoken} className={cx(layout.twoColumn, styles.row, styles.spoken)}>
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
