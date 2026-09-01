import { tmdbFetch } from './client'
import type { TmdbMovie, TmdbPaginatedResponse } from './types'

export type MovieListKind = 'popular' | 'top_rated' | 'upcoming' | 'now_playing'

export function getMovieList(kind: MovieListKind, page = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMovie>>(`/movie/${kind}`, {
    page,
    language: 'en-US',
  })
}

export function getPopularMovies(page = 1) {
  return getMovieList('popular', page)
}

export function getTopRatedMovies(page = 1) {
  return getMovieList('top_rated', page)
}

export function getUpcomingMovies(page = 1) {
  return getMovieList('upcoming', page)
}

export function getNowPlayingMovies(page = 1) {
  return getMovieList('now_playing', page)
}
