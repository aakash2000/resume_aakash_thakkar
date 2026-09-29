import { resume } from '../../content/resume'
import type { Lang, ProfileId } from '../../content/types'
import { useLocale, useSettings } from '../../state/useSettings'
import { SegmentedControl } from '../../ui'
import { DownloadPdfButton } from './DownloadPdfButton'
import styles from './Header.module.css'
import { ScrollProgress } from './ScrollProgress'
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
        <DownloadPdfButton className={styles.pdf} />
      </div>
      <div className={styles.rule}>
        <ScrollProgress />
      </div>
    </header>
  )
}
