import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang, ProfileId } from '../content/types'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { useUrlParam } from '../hooks/useUrlParam'
import { LANGS, PROFILE_IDS, SettingsContext, type Settings } from './SettingsContext'

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [profileId, setProfileParam] = useUrlParam<ProfileId>('profile', PROFILE_IDS, 'robotics')
  const [lang, setLangParam] = useUrlParam<Lang>('lang', LANGS, 'en')
  const [switchCount, setSwitchCount] = useState(0)
  const motion = !usePrefersReducedMotion()

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setProfileId = useCallback(
    (next: ProfileId) => {
      setProfileParam(next)
      setSwitchCount((n) => n + 1)
    },
    [setProfileParam],
  )

  const setLang = useCallback(
    (next: Lang) => {
      setLangParam(next)
      setSwitchCount((n) => n + 1)
    },
    [setLangParam],
  )

  const value = useMemo<Settings>(
    () => ({ profileId, lang, setProfileId, setLang, motion, switchCount }),
    [profileId, lang, setProfileId, setLang, motion, switchCount],
  )

  return <SettingsContext value={value}>{children}</SettingsContext>
}
