import { EducationItem, ExperienceItem, ProjectItem, Skills } from './components/Entries'
import { Header } from './components/Header'
import { Section } from './components/Section'
import { resume } from './data/resume'

function App() {
  return (
    <>
      <div className="toolbar screen-only">
        <button type="button" onClick={() => window.print()}>
          Download PDF
        </button>
      </div>
      <main className="page">
        <Header {...resume} />

        <Section title="Summary">
          <p>{resume.summary}</p>
        </Section>

        <Section title="Experience">
          {resume.experience.map((e) => (
            <ExperienceItem key={`${e.company}-${e.start}`} item={e} />
          ))}
        </Section>

        {resume.projects?.length ? (
          <Section title="Projects">
            {resume.projects.map((p) => (
              <ProjectItem key={p.name} item={p} />
            ))}
          </Section>
        ) : null}

        <Section title="Skills">
          <Skills groups={resume.skills} />
        </Section>

        <Section title="Education">
          {resume.education.map((e) => (
            <EducationItem key={`${e.school}-${e.degree}`} item={e} />
          ))}
        </Section>

        {resume.certifications?.length ? (
          <Section title="Certifications">
            <ul className="bullets">
              {resume.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Section>
        ) : null}
      </main>
    </>
  )
}

export default App
