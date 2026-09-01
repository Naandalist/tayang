import { tmdbFetch } from './client'
import { profileUrl } from './images'
import type { TmdbPaginatedResponse, TmdbPerson } from './types'

export type PersonSummary = {
  id: number
  name: string
  department: string
  photoUrl: string | null
  knownFor: string
}

export function personToSummary(person: TmdbPerson): PersonSummary {
  const knownFor =
    person.known_for
      .map((item) => item.title ?? item.name)
      .filter((title): title is string => Boolean(title))
      .slice(0, 1)[0] ?? person.known_for_department

  return {
    id: person.id,
    name: person.name,
    department: person.known_for_department,
    photoUrl: profileUrl(person.profile_path),
    knownFor,
  }
}

export function getPopularPeople(page = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbPerson>>('/person/popular', {
    page,
    language: 'en-US',
  })
}
