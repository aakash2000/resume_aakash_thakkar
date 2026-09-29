import { DownloadSimple } from '@phosphor-icons/react'
import { resume } from '../../content/resume'
import type { Lang, ProfileId } from '../../content/types'
import { useLocale, useSettings } from '../../state/useSettings'
import { Button, SegmentedControl } from '../../ui'
import styles from './Header.module.css'
import { SectionNav } from './SectionNav'
import { ThemeToggle } from './ThemeToggle'

const LANG_OPTIONS = [
  { value: 'en', label: 'EN' },
  { value: 'de', label: 'DE' },
] as const satisfies readonly { value: Lang; label: string }[]

export function Header() {
  const { profileId, setProfileId, lang, setLang } = useSettings()
  const { ui } = useLocale()

  const profileOptions: { value: ProfileId; label: string }[] = [
    { value: 'robotics', label: ui.profileRobotics },
    { value: 'platform', label: ui.profilePlatform },
  ]

  return (
    <header className={styles.header} data-noprint>
      <div className={styles.row}>
        <a href="#top" className={styles.mark} aria-label={resume.name}>
          {resume.initials}
        </a>
        <SectionNav />
        <SegmentedControl
          className={styles.profile}
          label={ui.profileGroup}
          options={profileOptions}
          value={profileId}
          onChange={setProfileId}
        />
        <SegmentedControl label={ui.languageGroup} options={LANG_OPTIONS} value={lang} onChange={setLang} />
        <ThemeToggle />
        <Button
          iconOnly
          className={styles.pdf}
          aria-label={ui.savePdf}
          title={ui.savePdf}
          onClick={() => window.print()}
        >
          <DownloadSimple size={17} aria-hidden />
        </Button>
      </div>
      <div className={styles.rule} />
    </header>
  )
}
