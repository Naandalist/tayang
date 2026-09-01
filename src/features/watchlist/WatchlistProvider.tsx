import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { MediaSummary } from '../../lib/tmdb'
import { readWatchlist, watchlistKey, writeWatchlist } from './storage'

type WatchlistContextValue = {
  items: MediaSummary[]
  has: (item: Pick<MediaSummary, 'id' | 'mediaType'>) => boolean
  toggle: (item: MediaSummary) => void
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null)

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MediaSummary[]>(() => readWatchlist())

  const value = useMemo<WatchlistContextValue>(() => {
    const keys = new Set(items.map(watchlistKey))

    return {
      items,
      has: (item) => keys.has(watchlistKey(item)),
      toggle: (item) => {
        setItems((current) => {
          const exists = current.some((entry) => watchlistKey(entry) === watchlistKey(item))
          const next = exists
            ? current.filter((entry) => watchlistKey(entry) !== watchlistKey(item))
            : [item, ...current]
          writeWatchlist(next)
          return next
        })
      },
    }
  }, [items])

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)

  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider')
  }

  return context
}
