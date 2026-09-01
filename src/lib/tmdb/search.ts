import { tmdbFetch } from './client'
import { movieToSummary, tvToSummary } from './media'
import type { MediaSummary, TmdbMultiResult, TmdbPaginatedResponse } from './types'

export async function searchTitles(query: string, page = 1): Promise<MediaSummary[]> {
  const trimmed = query.trim()

  if (!trimmed) {
    return []
  }

  const pageData = await tmdbFetch<TmdbPaginatedResponse<TmdbMultiResult>>('/search/multi', {
    query: trimmed,
    page,
    include_adult: false,
    language: 'en-US',
  })

  return pageData.results.flatMap((result) => {
    if (result.media_type === 'movie') {
      return [movieToSummary(result)]
    }

    if (result.media_type === 'tv') {
      return [tvToSummary(result)]
    }

    return []
  })
}
