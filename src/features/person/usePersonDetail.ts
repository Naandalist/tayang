import { useQuery } from '@tanstack/react-query'
import { getPersonDetail, personDetailToView } from '../../lib/tmdb'

export const personKeys = {
  all: ['person'] as const,
  detail: (id: number) => [...personKeys.all, id] as const,
}

export function usePersonDetail(id: number | undefined) {
  return useQuery({
    queryKey: personKeys.detail(id ?? 0),
    queryFn: async () => {
      if (!id) {
        throw new Error('Missing person id')
      }

      return personDetailToView(await getPersonDetail(id))
    },
    enabled: Number.isFinite(id) && (id ?? 0) > 0,
  })
}
