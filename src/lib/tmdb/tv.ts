import { tmdbFetch } from './client'
import type { TmdbPaginatedResponse, TmdbTvShow } from './types'

export type TvListKind = 'popular' | 'top_rated'

export function getTvList(kind: TvListKind, page = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbTvShow>>(`/tv/${kind}`, {
    page,
    language: 'en-US',
  })
}

export function getPopularTv(page = 1) {
  return getTvList('popular', page)
}

export function getTopRatedTv(page = 1) {
  return getTvList('top_rated', page)
}
