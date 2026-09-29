import { cx } from '../../lib/cx'
import styles from './BulletList.module.css'

interface BulletListProps {
  items: string[]
  /** Items beyond this count are rendered but hidden (they still print). */
  visibleCount?: number
  className?: string
}

export function BulletList({ items, visibleCount = items.length, className }: BulletListProps) {
  return (
    <ul className={cx(styles.list, className)}>
      {items.map((text, i) => (
        <li key={text} className={styles.item} hidden={i >= visibleCount}>
          <span className={styles.marker} aria-hidden />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}
