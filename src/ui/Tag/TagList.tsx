import { Tag } from './Tag'
import styles from './Tag.module.css'

export function TagList({ items }: { items: string[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  )
}
