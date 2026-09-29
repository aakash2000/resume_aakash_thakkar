import type { SubProject as SubProjectData } from '../../content/types'
import { cx } from '../../lib/cx'
import { useLocale } from '../../state/useSettings'
import { Button, TagList } from '../../ui'
import { BulletList } from './BulletList'
import styles from './SubProject.module.css'

/** Sub-projects with more bullets than this are collapsed… */
const COLLAPSE_ABOVE = 4
/** …down to this many. */
const COLLAPSED_COUNT = 3

interface SubProjectProps {
  project: SubProjectData
  /** Numbered ("01") and indented, as in work entries. Education uses the plain style. */
  numbered: boolean
  index: number
  expanded: boolean
  onToggle: () => void
}

export function SubProject({ project, numbered, index, expanded, onToggle }: SubProjectProps) {
  const { ui, t } = useLocale()
  const bullets = t(project.bullets)
  const tech = project.tech ? t(project.tech) : []
  const collapsible = numbered && bullets.length > COLLAPSE_ABOVE
  const collapsed = collapsible && !expanded

  return (
    <div className={styles.project}>
      <div className={styles.heading}>
        {numbered && <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>}
        <h4 className={styles.title}>{t(project.title)}</h4>
      </div>
      <div className={cx(styles.body, numbered && styles.indented)}>
        {tech.length > 0 && <TagList items={tech} />}
        <BulletList items={bullets} visibleCount={collapsed ? COLLAPSED_COUNT : undefined} />
        {collapsible && (
          <div className={styles.more} data-noprint>
            <Button variant="ghost" className={styles.moreButton} aria-expanded={expanded} onClick={onToggle}>
              {expanded ? ui.showFewer : ui.showMore(bullets.length - COLLAPSED_COUNT)}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
