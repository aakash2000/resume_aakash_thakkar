import { useState } from 'react'
import type { Entry } from '../../content/types'
import { useSettings } from '../../state/useSettings'
import layout from '../Section/layout.module.css'
import { SectionHeader } from '../Section/SectionHeader'
import type { SectionId } from '../sections'
import { TimelineEntry } from './TimelineEntry'
import styles from './TimelineSection.module.css'

interface TimelineSectionProps {
  id: SectionId
  label: string
  entries: Entry[]
  numberedProjects?: boolean
}

/** A titled list of entries hanging off a vertical rail (experience, education). */
export function TimelineSection({ id, label, entries, numberedProjects = false }: TimelineSectionProps) {
  const { profileId } = useSettings()
  // Expanded sub-projects, remembered per profile so switching back restores them.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const keyFor = (entryId: string, projectIndex: number) => `${profileId}:${entryId}:${projectIndex}`

  return (
    <section id={id} className={layout.section}>
      <SectionHeader>{label}</SectionHeader>
      <div className={styles.rail}>
        <span aria-hidden className={styles.track} />
        {entries.map((entry) => (
          <TimelineEntry
            key={entry.id}
            entry={entry}
            numberedProjects={numberedProjects}
            isExpanded={(i) => !!expanded[keyFor(entry.id, i)]}
            onToggleProject={(i) => {
              const key = keyFor(entry.id, i)
              setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
            }}
          />
        ))}
      </div>
    </section>
  )
}
