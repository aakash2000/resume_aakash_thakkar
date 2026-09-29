import { useState } from 'react'
import { cx } from '../../lib/cx'
import styles from './Avatar.module.css'

interface AvatarProps {
  src?: string
  alt: string
  /** Shown when there is no image or it fails to load. */
  initials: string
  className?: string
}

/** Circular photo with an initials fallback. Size it through `className`. */
export function Avatar({ src, alt, initials, className }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  return (
    <span className={cx(styles.avatar, className)}>
      {showImage ? (
        <img src={src} alt={alt} className={styles.image} onError={() => setFailed(true)} />
      ) : (
        <span className={styles.initials} aria-hidden>
          {initials}
        </span>
      )}
    </span>
  )
}
