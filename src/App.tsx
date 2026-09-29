import { useRef } from 'react'
import styles from './App.module.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Skills } from './components/Skills/Skills'
import { Summary } from './components/Summary/Summary'
import { TimelineSection } from './components/Timeline/TimelineSection'
import { resume } from './content/resume'
import { useFinishAnimationsOnPrint } from './hooks/useFinishAnimationsOnPrint'
import { useSwitchAnimation } from './hooks/useSwitchAnimation'
import { useLocale, useProfile } from './state/useSettings'

export default function App() {
  const { ui } = useLocale()
  const profile = useProfile()
  const mainRef = useRef<HTMLElement>(null)
  useSwitchAnimation(mainRef)
  useFinishAnimationsOnPrint()

  return (
    <div id="top">
      <Header />
      <main ref={mainRef} className={styles.main}>
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
