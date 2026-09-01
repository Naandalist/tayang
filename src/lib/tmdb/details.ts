import { tmdbFetch } from './client'
import type { TmdbMovieDetail, TmdbTvDetail } from './types'

export function getMovieDetail(id: number) {
  return tmdbFetch<TmdbMovieDetail>(`/movie/${id}`, {
    language: 'en-US',
  })
}

export function getTvDetail(id: number) {
  return tmdbFetch<TmdbTvDetail>(`/tv/${id}`, {
    language: 'en-US',
  })
}
