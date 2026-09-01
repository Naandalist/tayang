import { useQuery } from '@tanstack/react-query'
import { getMovieList, movieToSummary, type MovieListKind } from '../../lib/tmdb'

export const movieListKeys = {
  all: ['movies'] as const,
  list: (kind: MovieListKind) => [...movieListKeys.all, kind] as const,
}

export function useMovieList(kind: MovieListKind) {
  return useQuery({
    queryKey: movieListKeys.list(kind),
    queryFn: async () => {
      const page = await getMovieList(kind)
      return page.results.map(movieToSummary)
    },
  })
}
