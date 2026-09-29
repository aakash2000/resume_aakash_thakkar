import { useRef } from 'react'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { scrollMetrics } from '../../lib/scrollFrame'
import { useSettings } from '../../state/useSettings'
import { BrowserIllustration } from './BrowserIllustration'
import { PalletIllustration } from './PalletIllustration'
import styles from './Signature.module.css'

/** The illustration drifts down at this fraction of the scroll distance… */
const PARALLAX_SPEED = 0.22
/** …and has faded out completely after this many pixels. */
const FADE_DISTANCE = 520

/** Decorative illustration next to the hero. Changes with the profile and replays on every switch. */
export function Signature() {
  const { profileId, motion } = useSettings()
  const stageRef = useRef<HTMLDivElement>(null)
  const Illustration = profileId === 'robotics' ? PalletIllustration : BrowserIllustration

  useScrollFrame(() => {
    const stage = stageRef.current
    if (!stage || !motion) return
    const y = Math.max(0, scrollMetrics().top)
    stage.style.transform = `translateY(${(y * PARALLAX_SPEED).toFixed(1)}px)`
    stage.style.opacity = Math.max(0, 1 - y / FADE_DISTANCE).toFixed(3)
  })

  return (
    <div className={styles.wrapper} aria-hidden data-noprint>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.dots} />
        <div className={styles.glow} />
        <div className={styles.art}>
          <Illustration key={profileId} animate={motion} />
        </div>
      </div>
    </div>
  )
}
