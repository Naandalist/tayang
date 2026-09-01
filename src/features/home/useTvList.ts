import { useQuery } from '@tanstack/react-query'
import { getTvList, tvToSummary, type TvListKind } from '../../lib/tmdb'

export const tvListKeys = {
  all: ['tv'] as const,
  list: (kind: TvListKind) => [...tvListKeys.all, kind] as const,
}

export function useTvList(kind: TvListKind) {
  return useQuery({
    queryKey: tvListKeys.list(kind),
    queryFn: async () => {
      const page = await getTvList(kind)
      return page.results.map(tvToSummary)
    },
  })
}
