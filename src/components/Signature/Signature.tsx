import { useRef } from 'react'
import { useReplayLoop } from '../../hooks/useReplayLoop'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { scrollMetrics } from '../../lib/scrollFrame'
import { useSettings } from '../../state/useSettings'
import { BROWSER_RUN_MS, BrowserIllustration } from './BrowserIllustration'
import { PALLET_RUN_MS, PalletIllustration } from './PalletIllustration'
import styles from './Signature.module.css'

/** The illustration drifts down at this fraction of the scroll distance… */
const PARALLAX_SPEED = 0.22
/** …and has faded out completely after this many pixels. */
const FADE_DISTANCE = 520
/** The finished illustration stays this long before it replays. */
const LOOP_HOLD_MS = 3000

/** Decorative illustration next to the hero. Changes with the profile and plays on a loop. */
export function Signature() {
  const { profileId, motion } = useSettings()
  const stageRef = useRef<HTMLDivElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const robotics = profileId === 'robotics'
  const Illustration = robotics ? PalletIllustration : BrowserIllustration
  const cycle = useReplayLoop({
    runMs: robotics ? PALLET_RUN_MS : BROWSER_RUN_MS,
    holdMs: LOOP_HOLD_MS,
    enabled: motion,
    targetRef: artRef,
    restartKey: profileId,
  })

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
        <div ref={artRef} className={styles.art}>
          <Illustration key={`${profileId}:${cycle}`} animate={motion} />
        </div>
      </div>
    </div>
  )
}
