import type { Education, Experience, Project, SkillGroup } from '../types'

function Tags({ items }: { items?: string[] }) {
  if (!items?.length) return null
  return (
    <ul className="tags">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="entry">
      <div className="entry-head">
        <h3>
          {item.role} <span className="at">· {item.company}</span>
        </h3>
        <span className="dates">
          {item.start} – {item.end}
        </span>
      </div>
      {item.location && <p className="meta">{item.location}</p>}
      <ul className="bullets">
        {item.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <Tags items={item.tech} />
    </article>
  )
}

export function ProjectItem({ item }: { item: Project }) {
  return (
    <article className="entry">
      <div className="entry-head">
        <h3>
          {item.url ? (
            <a href={item.url} target="_blank" rel="noreferrer">
              {item.name}
            </a>
          ) : (
            item.name
          )}
        </h3>
      </div>
      <p>{item.description}</p>
      <Tags items={item.tech} />
    </article>
  )
}

export function EducationItem({ item }: { item: Education }) {
  return (
    <article className="entry">
      <div className="entry-head">
        <h3>
          {item.degree} <span className="at">· {item.school}</span>
        </h3>
        <span className="dates">{item.start ? `${item.start} – ${item.end}` : item.end}</span>
      </div>
      {item.details && (
        <ul className="bullets">
          {item.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}
    </article>
  )
}

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <dl className="skills">
      {groups.map((g) => (
        <div key={g.category} className="skill-row">
          <dt>{g.category}</dt>
          <dd>{g.items.join(' · ')}</dd>
        </div>
      ))}
    </dl>
  )
}
