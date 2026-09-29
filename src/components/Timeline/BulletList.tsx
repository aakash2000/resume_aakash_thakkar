import { useCallback, useLayoutEffect, useRef } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { cx } from '../../lib/cx'
import { EASE } from '../../lib/motion'
import { useSettings } from '../../state/useSettings'
import styles from './BulletList.module.css'

interface BulletListProps {
  items: string[]
  /** Items beyond this count are rendered but hidden (they still print). */
  visibleCount?: number
  /** Fade the bullets in one after another when the list scrolls into view. */
  stagger?: boolean
  className?: string
}

export function BulletList({ items, visibleCount = items.length, stagger = false, className }: BulletListProps) {
  const { motion } = useSettings()
  const listRef = useRef<HTMLUListElement | null>(null)
  const reveal = useReveal<HTMLUListElement>('stagger')
  const previous = useRef({ items, visibleCount })

  const setListRef = useCallback(
    (el: HTMLUListElement | null) => {
      listRef.current = el
      return stagger ? reveal(el) : undefined
    },
    [stagger, reveal],
  )

  // When more of the same bullets become visible ("Show more"), slide the new ones in.
  // A different list (profile or language switch) is not an expansion.
  useLayoutEffect(() => {
    const { items: previousItems, visibleCount: from } = previous.current
    previous.current = { items, visibleCount }
    const list = listRef.current
    if (!motion || !list || items !== previousItems || visibleCount <= from) return
    Array.from(list.children)
      .slice(from, visibleCount)
      .forEach((li, i) =>
        li.animate([{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], {
          duration: 320,
          delay: i * 50,
          easing: EASE,
          fill: 'backwards',
        }),
      )
  }, [items, visibleCount, motion])

  return (
    <ul ref={setListRef} className={cx(styles.list, className)}>
      {items.map((text, i) => (
        <li key={text} className={styles.item} hidden={i >= visibleCount}>
          <span className={styles.marker} aria-hidden />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}
