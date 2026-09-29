import { useCallback, useContext } from 'react'
import { resume } from '../content/resume'
import type { Localized } from '../content/types'
import { uiStrings } from '../content/uiStrings'
import { localize } from '../lib/localize'
import { SettingsContext, type Settings } from './SettingsContext'

export function useSettings(): Settings {
  const settings = useContext(SettingsContext)
  if (!settings) throw new Error('useSettings must be used inside <SettingsProvider>')
  return settings
}

/** Current language helpers: UI strings and a resolver for localized content. */
export function useLocale() {
  const { lang } = useSettings()
  const t = useCallback(<T,>(value: Localized<T>): T => localize(value, lang), [lang])
  return { lang, ui: uiStrings[lang], t }
}

/** The active profile's content. */
export function useProfile() {
  const { profileId } = useSettings()
  return resume.profiles[profileId]
}
