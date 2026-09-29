import { resume } from '../../content/resume'
import { useReveal } from '../../hooks/useReveal'
import { useLocale } from '../../state/useSettings'
import { Signature } from '../Signature/Signature'
import styles from './Hero.module.css'
import { Identity } from './Identity'
import { Stats } from './Stats'

export function Hero() {
  const { ui } = useLocale()
  const revealCustomers = useReveal<HTMLDivElement>()
  return (
    <section className={styles.hero}>
      <div className={styles.intro}>
        <Identity />
        <div className={styles.facts}>
          <Stats />
          <div ref={revealCustomers} className={styles.customers}>
            <span className={styles.customersLabel}>{ui.customers}</span>
            <span className={styles.customersList}>{resume.customers.join(' · ')}</span>
          </div>
        </div>
      </div>
      <Signature />
    </section>
  )
}
