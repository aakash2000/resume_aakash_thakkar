export type Lang = 'en' | 'de'
export type ProfileId = 'robotics' | 'platform'

/** A value that is either the same in every language or given per language. */
export type Localized<T = string> = T | Record<Lang, T>

export interface Link {
  label: string
  url: string
}

export interface Contact {
  location: Localized
  email: string
  /** LinkedIn, GitHub, … Rendered in the hero meta row. */
  links: Link[]
}

export interface Stat {
  value: number
  prefix?: string
  suffix?: string
  /** Smaller unit after the number, e.g. "yrs". */
  unit?: Localized
  label: Localized
}

export interface SubProject {
  title: Localized
  tech?: Localized<string[]>
  bullets: Localized<string[]>
}

export interface Entry {
  /** Stable key, also used to remember expanded/collapsed state. */
  id: string
  title: Localized
  /** Shows the "(20h/week)" note after the title. */
  partTime?: boolean
  org: string
  orgUrl?: string
  start: string
  /** Omit for an ongoing role ("Present"). */
  end?: string
  location: Localized
  bullets?: Localized<string[]>
  subProjects?: SubProject[]
}

/** Everything that changes between the Robotics / HMI and Platform / Web versions. */
export interface Profile {
  title: Localized
  summary: Localized
  stats: Stat[]
  /** Sub-projects of the current role. */
  currentRoleProjects: SubProject[]
  /** Title of the earlier part-time role at the same company. */
  partTimeTitle: Localized
}

export interface SkillGroup {
  label: Localized
  items: Localized<string[]>
}

export interface SpokenLanguage {
  language: Localized
  level: string
}

export interface Resume {
  name: string
  initials: string
  /** Path under /public, e.g. "headshot.jpg". Falls back to initials. */
  headshot?: string
  contact: Contact
  customers: string[]
  profiles: Record<ProfileId, Profile>
  /** Builds the experience list; the first entries depend on the profile. */
  experience: (profile: Profile) => Entry[]
  education: Entry[]
  skills: SkillGroup[]
  spokenLanguages: SpokenLanguage[]
}
