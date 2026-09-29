import { resume } from '../../content/resume'
import { useReveal } from '../../hooks/useReveal'
import { useLocale, useProfile } from '../../state/useSettings'
import { Avatar } from '../../ui'
import styles from './Identity.module.css'
import { ScrambleTitle } from './ScrambleTitle'

const headshotSrc = resume.headshot ? `${import.meta.env.BASE_URL}${resume.headshot}` : undefined

/** Photo, name, profile title and contact links. */
export function Identity() {
  const { t } = useLocale()
  const profile = useProfile()
  const { contact } = resume
  const reveal = useReveal<HTMLDivElement>()

  return (
    <div ref={reveal} className={styles.identity}>
      <Avatar className={styles.avatar} src={headshotSrc} alt={resume.name} initials={resume.initials} />
      <h1 className={styles.name}>{resume.name}</h1>
      <ScrambleTitle className={styles.title} text={t(profile.title)} />
      <div className={styles.meta}>
        <span>{t(contact.location)}</span>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        {contact.links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noopener">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
