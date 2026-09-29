import type { Resume } from '../types'

type Props = Pick<Resume, 'name' | 'title' | 'location' | 'email' | 'phone' | 'links'>

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

export function Header({ name, title, location, email, phone, links }: Props) {
  return (
    <header className="header">
      <div>
        <h1 className="name">{name}</h1>
        <p className="title">{title}</p>
      </div>
      <ul className="contact">
        {location && <li>{location}</li>}
        {email && (
          <li>
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        )}
        {phone && (
          <li>
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
          </li>
        )}
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noreferrer">
              <span className="screen-only">{link.label}</span>
              <span className="print-only">{stripProtocol(link.url)}</span>
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}
