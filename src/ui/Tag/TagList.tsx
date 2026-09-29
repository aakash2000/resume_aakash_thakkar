import type { Ref } from 'react'
import { Tag } from './Tag'
import styles from './Tag.module.css'

export function TagList({ items, ref }: { items: string[]; ref?: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={styles.list}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  )
}
