import { ArrowUpRight } from '@phosphor-icons/react'
import type { Entry } from '../../content/types'
import { cx } from '../../lib/cx'
import { useLocale } from '../../state/useSettings'
import layout from '../Section/layout.module.css'
import { BulletList } from './BulletList'
import { SubProject } from './SubProject'
import styles from './TimelineEntry.module.css'

interface TimelineEntryProps {
  entry: Entry
  /** Work entries number and collapse their sub-projects; education keeps them plain. */
  numberedProjects: boolean
  isExpanded: (projectIndex: number) => boolean
  onToggleProject: (projectIndex: number) => void
}

function Organisation({ name, url }: { name: string; url?: string }) {
  if (!url) return <span className={styles.orgName}>{name}</span>
  return (
    <a href={url} target="_blank" rel="noopener" className={styles.orgLink}>
      {name}
      <ArrowUpRight size={12} aria-hidden className={styles.orgIcon} />
    </a>
  )
}

export function TimelineEntry({ entry, numberedProjects, isExpanded, onToggleProject }: TimelineEntryProps) {
  const { ui, t } = useLocale()
  const current = !entry.end
  const bullets = entry.bullets ? t(entry.bullets) : []

  return (
    <article className={cx(layout.twoColumn, styles.entry)}>
      <span aria-hidden className={cx(styles.node, current && styles.nodeCurrent)} />
      <div className={styles.when}>
        <span>
          {entry.start} – {entry.end ?? ui.present}
        </span>
        <span className={styles.location}>{t(entry.location)}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>
          {t(entry.title)}
          {entry.partTime && <span className={styles.note}>{ui.partTime}</span>}
        </h3>
        <p className={styles.org}>
          <Organisation name={entry.org} url={entry.orgUrl} />
        </p>
        {bullets.length > 0 && <BulletList className={styles.bullets} items={bullets} />}
        {entry.subProjects && (
          <div className={styles.projects}>
            {entry.subProjects.map((project, i) => (
              <SubProject
                key={i}
                project={project}
                index={i}
                numbered={numberedProjects}
                expanded={isExpanded(i)}
                onToggle={() => onToggleProject(i)}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
