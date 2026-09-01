import { useQuery } from '@tanstack/react-query'
import { getPopularPeople, personToSummary } from '../../lib/tmdb'

export const peopleKeys = {
  popular: ['people', 'popular'] as const,
}

export function usePopularPeople() {
  return useQuery({
    queryKey: peopleKeys.popular,
    queryFn: async () => {
      const page = await getPopularPeople()
      return page.results.map(personToSummary)
    },
  })
}
