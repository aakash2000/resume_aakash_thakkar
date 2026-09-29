import { useCallback, useState } from 'react'

function readParam<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  const value = new URLSearchParams(window.location.search).get(key)
  return allowed.includes(value as T) ? (value as T) : fallback
}

/**
 * State mirrored to a URL query parameter (e.g. `?profile=platform`), so each
 * version of the page has its own shareable link. Uses replaceState, so
 * switching does not add browser history entries.
 */
export function useUrlParam<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState(() => readParam(key, allowed, fallback))

  const update = useCallback(
    (next: T) => {
      setValue(next)
      const url = new URL(window.location.href)
      url.searchParams.set(key, next)
      window.history.replaceState(null, '', url)
    },
    [key],
  )

  return [value, update]
}
