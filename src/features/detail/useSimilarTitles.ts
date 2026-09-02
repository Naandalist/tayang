import { useQuery } from '@tanstack/react-query'
import { getSimilarTitles, type MediaType } from '../../lib/tmdb'

export const similarKeys = {
  all: ['similar'] as const,
  list: (mediaType: MediaType, id: number) => [...similarKeys.all, mediaType, id] as const,
}

export function useSimilarTitles(mediaType: MediaType, id: number | undefined) {
  return useQuery({
    queryKey: similarKeys.list(mediaType, id ?? 0),
    queryFn: () => getSimilarTitles(mediaType, id ?? 0),
    enabled: Number.isFinite(id) && (id ?? 0) > 0,
  })
}
