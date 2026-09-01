import { useQuery } from '@tanstack/react-query'
import { searchTitles } from '../../lib/tmdb'

export const searchKeys = {
  all: ['search'] as const,
  query: (value: string) => [...searchKeys.all, value] as const,
}

export function useTitleSearch(query: string) {
  const normalized = query.trim()

  return useQuery({
    queryKey: searchKeys.query(normalized),
    queryFn: () => searchTitles(normalized),
    enabled: normalized.length >= 2,
  })
}
