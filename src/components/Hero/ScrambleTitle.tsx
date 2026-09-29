import { useTween } from '../../hooks/useTween'
import { useSettings } from '../../state/useSettings'
import styles from './ScrambleTitle.module.css'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_'
/** Characters that never scramble, so the title keeps its shape while resolving. */
const STABLE = ' |&,/'

function scramble(text: string, progress: number) {
  const resolved = Math.floor(text.length * progress)
  return Array.from(text, (ch, i) =>
    i < resolved || STABLE.includes(ch) ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  ).join('')
}

/**
 * Text that resolves left to right from random glyphs, followed by a blinking
 * caret. Replays whenever the visitor switches profile or language.
 */
export function ScrambleTitle({ text, className }: { text: string; className?: string }) {
  const { motion, switchCount } = useSettings()
  const progress = useTween({ duration: 650, enabled: motion, replayKey: `${switchCount}:${text}` })
  const display = progress < 1 ? scramble(text, progress) : text

  return (
    <p className={className}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden>
        {display}
        {motion && <span key={`${switchCount}:${text}`} className={styles.caret} />}
      </span>
    </p>
  )
}
