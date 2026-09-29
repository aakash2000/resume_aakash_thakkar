import { Moon, Sun } from '@phosphor-icons/react'
import { useRef } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { EASE } from '../../lib/motion'
import { useLocale, useSettings } from '../../state/useSettings'
import { Button } from '../../ui'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { motion } = useSettings()
  const { ui } = useLocale()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const label = theme === 'dark' ? ui.toLightMode : ui.toDarkMode

  const onClick = async () => {
    await toggle({ origin: buttonRef.current, animate: motion })
    if (motion) {
      iconRef.current?.animate(
        [{ transform: 'rotate(-90deg) scale(.6)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: 360, easing: EASE },
      )
    }
  }

  return (
    <Button ref={buttonRef} iconOnly aria-label={label} title={label} onClick={onClick}>
      <span ref={iconRef} style={{ display: 'flex' }}>
        {theme === 'dark' ? <Sun size={17} aria-hidden /> : <Moon size={17} aria-hidden />}
      </span>
    </Button>
  )
}
