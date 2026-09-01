import { useQuery } from '@tanstack/react-query'
import { getMovieDetail, getTvDetail, type MediaType } from '../../lib/tmdb'
import { movieDetailToTitle, tvDetailToTitle } from './title'

export const titleKeys = {
  all: ['title'] as const,
  detail: (mediaType: MediaType, id: number) => [...titleKeys.all, mediaType, id] as const,
}

export function useTitleDetail(mediaType: MediaType, id: number | undefined) {
  return useQuery({
    queryKey: titleKeys.detail(mediaType, id ?? 0),
    enabled: Number.isFinite(id) && (id ?? 0) > 0,
    queryFn: async () => {
      if (!id) {
        throw new Error('Missing title id')
      }

      if (mediaType === 'movie') {
        return movieDetailToTitle(await getMovieDetail(id))
      }

      return tvDetailToTitle(await getTvDetail(id))
    },
  })
}
