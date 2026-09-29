import { createContext } from 'react'
import type { Lang, ProfileId } from '../content/types'

export const PROFILE_IDS = ['robotics', 'platform'] as const satisfies readonly ProfileId[]
export const LANGS = ['en', 'de'] as const satisfies readonly Lang[]

export interface Settings {
  profileId: ProfileId
  lang: Lang
  setProfileId: (profile: ProfileId) => void
  setLang: (lang: Lang) => void
  /** False when the visitor prefers reduced motion; every animation checks this. */
  motion: boolean
  /** Increments each time the visitor switches profile or language. Used to replay animations. */
  switchCount: number
}

export const SettingsContext = createContext<Settings | null>(null)
