import { useSettings } from '../../state/useSettings'
import { BrowserIllustration } from './BrowserIllustration'
import { PalletIllustration } from './PalletIllustration'
import styles from './Signature.module.css'

/** Decorative illustration next to the hero. Changes with the profile and replays on every switch. */
export function Signature() {
  const { profileId, motion } = useSettings()
  const Illustration = profileId === 'robotics' ? PalletIllustration : BrowserIllustration

  return (
    <div className={styles.wrapper} aria-hidden data-noprint>
      <div className={styles.stage}>
        <div className={styles.dots} />
        <div className={styles.glow} />
        <div className={styles.art}>
          <Illustration key={profileId} animate={motion} />
        </div>
      </div>
    </div>
  )
}
