import { describe, expect, it } from 'vitest'
import { movieToSummary, tvToSummary } from '../../src/lib/tmdb/media'
import type { TmdbMovie, TmdbTvShow } from '../../src/lib/tmdb/types'

const movie: TmdbMovie = {
  id: 42,
  title: 'The Odyssey',
  overview: 'A voyage home.',
  poster_path: '/odyssey.jpg',
  backdrop_path: '/odyssey-wide.jpg',
  release_date: '2026-07-17',
  vote_average: 8.4,
  popularity: 120,
  genre_ids: [12],
  adult: false,
  original_language: 'en',
}

const show: TmdbTvShow = {
  id: 99,
  name: 'The Bear',
  overview: 'A kitchen.',
  poster_path: null,
  backdrop_path: null,
  first_air_date: '2022-06-23',
  vote_average: 8.6,
  popularity: 80,
  genre_ids: [35],
  original_language: 'en',
}

describe('movieToSummary', () => {
  it('maps movie fields and image urls', () => {
    const summary = movieToSummary(movie)

    expect(summary).toMatchObject({
      id: 42,
      mediaType: 'movie',
      title: 'The Odyssey',
      date: '2026-07-17',
      voteAverage: 8.4,
    })
    expect(summary.posterUrl).toContain('/w500/odyssey.jpg')
    expect(summary.backdropUrl).toContain('/w1280/odyssey-wide.jpg')
  })
})

describe('tvToSummary', () => {
  it('uses the show name and allows missing artwork', () => {
    const summary = tvToSummary(show)

    expect(summary.mediaType).toBe('tv')
    expect(summary.title).toBe('The Bear')
    expect(summary.date).toBe('2022-06-23')
    expect(summary.posterUrl).toBeNull()
    expect(summary.backdropUrl).toBeNull()
  })
})
