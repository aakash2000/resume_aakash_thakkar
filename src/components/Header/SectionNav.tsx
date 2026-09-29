import { Briefcase, Code, GraduationCap, User, type Icon } from '@phosphor-icons/react'
import { useLayoutEffect, useRef } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { NARROW_QUERY } from '../../lib/breakpoints'
import { useLocale } from '../../state/useSettings'
import { SECTION_IDS, type SectionId } from '../sections'
import styles from './SectionNav.module.css'

const ICONS: Record<SectionId, Icon> = {
  summary: User,
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
}

/** Section links: text on wide screens, icons on narrow ones, with a sliding active indicator. */
export function SectionNav() {
  const { ui } = useLocale()
  const narrow = useMediaQuery(NARROW_QUERY)
  const active = useActiveSection(SECTION_IDS)
  const navRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    if (!nav || !indicator) return

    const place = () => {
      const link = nav.querySelector<HTMLAnchorElement>('a[aria-current="page"]')
      if (!link) {
        indicator.style.opacity = '0'
        return
      }
      // On wide screens the bar sits on the header's bottom rule; on narrow ones just under the icon.
      const header = nav.closest('header')
      const bottom =
        narrow || !header
          ? -2
          : nav.getBoundingClientRect().bottom - header.getBoundingClientRect().bottom
      indicator.style.bottom = `${bottom}px`
      indicator.style.width = `${link.offsetWidth}px`
      indicator.style.transform = `translateX(${link.offsetLeft}px)`
      indicator.style.opacity = '1'
    }

    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active, narrow, ui])

  return (
    <nav ref={navRef} aria-label={ui.sections.nav} className={styles.nav}>
      {SECTION_IDS.map((id) => {
        const label = ui.sections[id]
        const IconComponent = ICONS[id]
        return (
          <a
            key={id}
            href={`#${id}`}
            className={styles.link}
            aria-current={active === id ? 'page' : undefined}
            aria-label={narrow ? label : undefined}
            title={narrow ? label : undefined}
          >
            {narrow ? <IconComponent size={19} aria-hidden /> : label}
          </a>
        )
      })}
      <span ref={indicatorRef} aria-hidden className={styles.indicator} />
    </nav>
  )
}
