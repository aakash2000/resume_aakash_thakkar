import styles from './App.module.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Skills } from './components/Skills/Skills'
import { Summary } from './components/Summary/Summary'
import { TimelineSection } from './components/Timeline/TimelineSection'
import { resume } from './content/resume'
import { useLocale, useProfile } from './state/useSettings'

export default function App() {
  const { ui } = useLocale()
  const profile = useProfile()

  return (
    <div id="top">
      <Header />
      <main className={styles.main}>
        <Hero />
        <Summary />
        <TimelineSection
          id="experience"
          label={ui.sections.experience}
          entries={resume.experience(profile)}
          numberedProjects
        />
        <TimelineSection id="education" label={ui.sections.education} entries={resume.education} />
        <Skills />
        <Footer />
      </main>
    </div>
  )
}
