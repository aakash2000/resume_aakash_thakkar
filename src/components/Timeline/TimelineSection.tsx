import { useRef, useState } from 'react'
import type { Entry } from '../../content/types'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { useSettings } from '../../state/useSettings'
import layout from '../Section/layout.module.css'
import { SectionHeader } from '../Section/SectionHeader'
import type { SectionId } from '../sections'
import { TimelineEntry } from './TimelineEntry'
import styles from './TimelineSection.module.css'

/** The rail fills and nodes light up as they pass this fraction of the viewport height. */
const READING_LINE = 0.62

interface TimelineSectionProps {
  id: SectionId
  label: string
  entries: Entry[]
  numberedProjects?: boolean
}

/** A titled list of entries hanging off a vertical rail (experience, education). */
export function TimelineSection({ id, label, entries, numberedProjects = false }: TimelineSectionProps) {
  const { profileId, motion } = useSettings()
  const railRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  // Expanded sub-projects, remembered per profile so switching back restores them.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const keyFor = (entryId: string, projectIndex: number) => `${profileId}:${entryId}:${projectIndex}`

  useScrollFrame(() => {
    const rail = railRef.current
    if (!rail) return
    const line = window.innerHeight * READING_LINE
    const rect = rail.getBoundingClientRect()
    const progress = motion ? Math.min(1, Math.max(0, (line - rect.top) / Math.max(1, rect.height))) : 1
    if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress.toFixed(4)})`
    rail.querySelectorAll<HTMLElement>('[data-timeline-node]').forEach((node) => {
      node.toggleAttribute('data-lit', !motion || node.getBoundingClientRect().top < line)
    })
  })

  return (
    <section id={id} className={layout.section}>
      <SectionHeader>{label}</SectionHeader>
      <div ref={railRef} className={styles.rail}>
        <span aria-hidden className={styles.track} />
        <span ref={fillRef} aria-hidden className={styles.fill} />
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
