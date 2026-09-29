import { resume } from '../../content/resume'
import { useLocale, useSettings } from '../../state/useSettings'
import styles from './Footer.module.css'

export function Footer() {
  const { profileId, lang } = useSettings()
  const { ui } = useLocale()
  const shareHref = `?profile=${profileId}${lang === 'de' ? '&lang=de' : ''}`

  return (
    <footer className={styles.footer}>
      <span>{resume.name}</span>
      <a href={`mailto:${resume.contact.email}`}>{resume.contact.email}</a>
      <span data-noprint>
        {ui.shareLink} <a href={shareHref}>{shareHref}</a>
      </span>
    </footer>
  )
}
