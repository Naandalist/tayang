import { tmdbFetch } from './client'
import { movieToSummary, tvToSummary, type MediaSummary } from './media'
import type { MediaType, TmdbMovie, TmdbPaginatedResponse, TmdbTvShow } from './types'

export async function getSimilarTitles(mediaType: MediaType, id: number): Promise<MediaSummary[]> {
  if (mediaType === 'movie') {
    const page = await tmdbFetch<TmdbPaginatedResponse<TmdbMovie>>(`/movie/${id}/similar`, {
      language: 'en-US',
      page: 1,
    })
    return page.results.map(movieToSummary)
  }

  const page = await tmdbFetch<TmdbPaginatedResponse<TmdbTvShow>>(`/tv/${id}/similar`, {
    language: 'en-US',
    page: 1,
  })
  return page.results.map(tvToSummary)
}
