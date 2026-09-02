import { beforeEach, describe, expect, it } from 'vitest'
import {
  readWatchlist,
  WATCHLIST_KEY,
  watchlistKey,
  writeWatchlist,
} from '../../src/features/watchlist/storage'
import type { MediaSummary } from '../../src/lib/tmdb'

const item: MediaSummary = {
  id: 7,
  mediaType: 'movie',
  title: 'Heat',
  overview: '',
  date: '1995-12-15',
  voteAverage: 8.2,
  posterUrl: null,
  backdropUrl: null,
}

beforeEach(() => {
  window.localStorage.clear()
})

describe('watchlist storage', () => {
  it('writes and reads valid titles', () => {
    writeWatchlist([item])
    expect(readWatchlist()).toEqual([item])
    expect(window.localStorage.getItem(WATCHLIST_KEY)).toContain('Heat')
  })

  it('drops malformed payloads', () => {
    window.localStorage.setItem(WATCHLIST_KEY, '{"oops":true}')
    expect(readWatchlist()).toEqual([])
  })

  it('builds a stable item key', () => {
    expect(watchlistKey(item)).toBe('movie-7')
  })
})
