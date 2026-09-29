import type { Stat } from '../../content/types'
import { useLocale, useProfile } from '../../state/useSettings'
import styles from './Stats.module.css'

function StatItem({ stat }: { stat: Stat }) {
  const { t } = useLocale()
  return (
    <div className={styles.stat}>
      <span className={styles.mark} aria-hidden />
      <span className={styles.value}>
        {stat.prefix}
        {stat.value}
        {stat.suffix}
        {stat.unit && <span className={styles.unit}>{t(stat.unit)}</span>}
      </span>
      <span className={styles.label}>{t(stat.label)}</span>
    </div>
  )
}

export function Stats() {
  const profile = useProfile()
  return (
    <div className={styles.stats}>
      {profile.stats.map((stat) => (
        <StatItem key={`${stat.value}-${stat.suffix ?? ''}-${stat.prefix ?? ''}`} stat={stat} />
      ))}
    </div>
  )
}
