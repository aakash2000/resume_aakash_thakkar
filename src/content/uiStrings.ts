import type { Lang } from './types'

export interface UiStrings {
  profileGroup: string
  languageGroup: string
  profileRobotics: string
  profilePlatform: string
  savePdf: string
  customers: string
  sections: {
    nav: string
    summary: string
    experience: string
    education: string
    skills: string
  }
  spokenLanguages: string
  shareLink: string
  present: string
  partTime: string
  showFewer: string
  showMore: (count: number) => string
  toLightMode: string
  toDarkMode: string
}

export const uiStrings: Record<Lang, UiStrings> = {
  en: {
    profileGroup: 'Resume profile',
    languageGroup: 'Language',
    profileRobotics: 'Robotics / HMI',
    profilePlatform: 'Platform / Web',
    savePdf: 'Save as PDF',
    customers: 'Customers',
    sections: {
      nav: 'Sections',
      summary: 'Summary',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
    },
    spokenLanguages: 'Languages',
    shareLink: 'Link to this version:',
    present: 'Present',
    partTime: '(20h/week)',
    showFewer: 'Show fewer',
    showMore: (n) => `Show ${n} more`,
    toLightMode: 'Switch to light mode',
    toDarkMode: 'Switch to dark mode',
  },
  de: {
    profileGroup: 'Lebenslauf-Profil',
    languageGroup: 'Sprache',
    profileRobotics: 'Robotik / HMI',
    profilePlatform: 'Plattform / Web',
    savePdf: 'Als PDF speichern',
    customers: 'Kunden',
    sections: {
      nav: 'Abschnitte',
      summary: 'Kurzprofil',
      experience: 'Berufserfahrung',
      education: 'Ausbildung',
      skills: 'Kenntnisse',
    },
    spokenLanguages: 'Sprachen',
    shareLink: 'Link zu dieser Version:',
    present: 'heute',
    partTime: '(20 Std./Woche)',
    showFewer: 'Weniger anzeigen',
    showMore: (n) => `${n} weitere anzeigen`,
    toLightMode: 'Zum hellen Modus wechseln',
    toDarkMode: 'Zum dunklen Modus wechseln',
  },
}
