import type { Stat } from '../../content/types'
import { useReveal } from '../../hooks/useReveal'
import { easeOutCubic, useTween } from '../../hooks/useTween'
import { useLocale, useProfile, useSettings } from '../../state/useSettings'
import styles from './Stats.module.css'

function StatItem({ stat, progress }: { stat: Stat; progress: number }) {
  const { t } = useLocale()
  const reveal = useReveal<HTMLDivElement>()
  return (
    <div ref={reveal} className={styles.stat}>
      <span className={styles.mark} aria-hidden />
      <span className={styles.value}>
        {stat.prefix}
        {Math.round(stat.value * progress)}
        {stat.suffix}
        {stat.unit && <span className={styles.unit}>{t(stat.unit)}</span>}
      </span>
      <span className={styles.label}>{t(stat.label)}</span>
    </div>
  )
}

export function Stats() {
  const profile = useProfile()
  const { motion } = useSettings()
  // Numbers count up once, on page load.
  const progress = easeOutCubic(useTween({ duration: 1200, delay: 250, enabled: motion }))

  return (
    <div className={styles.stats}>
      {profile.stats.map((stat, i) => (
        <StatItem key={i} stat={stat} progress={progress} />
      ))}
    </div>
  )
}
