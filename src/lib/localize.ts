import type { Lang, Localized } from '../content/types'

function isPerLanguage<T>(value: Localized<T>): value is Record<Lang, T> {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && 'en' in value
}

/** Resolve a value that may be given per language. */
export function localize<T>(value: Localized<T>, lang: Lang): T {
  return isPerLanguage(value) ? value[lang] : value
}
