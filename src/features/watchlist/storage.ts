import type { MediaSummary } from '../../lib/tmdb'

export const WATCHLIST_KEY = 'tayang:watchlist'

function isMediaSummary(value: unknown): value is MediaSummary {
  if (!value || typeof value !== 'object') {
    return false
  }

  const item = value as MediaSummary
  return (
    typeof item.id === 'number' &&
    (item.mediaType === 'movie' || item.mediaType === 'tv') &&
    typeof item.title === 'string'
  )
}

export function readWatchlist(): MediaSummary[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(WATCHLIST_KEY)
    if (!raw) {
      return []
    }

    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isMediaSummary) : []
  } catch {
    return []
  }
}

export function writeWatchlist(items: MediaSummary[]) {
  window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items))
}

export function watchlistKey(item: Pick<MediaSummary, 'id' | 'mediaType'>) {
  return `${item.mediaType}-${item.id}`
}
