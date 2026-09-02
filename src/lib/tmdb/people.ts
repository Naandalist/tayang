import { tmdbFetch } from './client'
import { backdropUrl, posterUrl, profileUrl } from './images'
import type { MediaSummary } from './media'
import type { TmdbCredit, TmdbPaginatedResponse, TmdbPerson, TmdbPersonDetail } from './types'

const MIN_CREDIT_POPULARITY = 8

export type PersonSummary = {
  id: number
  name: string
  department: string
  photoUrl: string | null
  knownFor: string
}

export type PersonDetail = {
  id: number
  name: string
  biography: string
  birthday: string | null
  deathday: string | null
  placeOfBirth: string | null
  department: string
  photoUrl: string | null
  credits: MediaSummary[]
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

function isUsableCredit(credit: TmdbCredit) {
  return !credit.adult && Boolean(credit.poster_path) && (credit.popularity ?? 0) >= MIN_CREDIT_POPULARITY
}

function creditToSummary(credit: TmdbCredit): MediaSummary | null {
  const title = credit.title ?? credit.name
  if (!title || !isUsableCredit(credit)) {
    return null
  }

  return {
    id: credit.id,
    mediaType: credit.media_type,
    title,
    overview: credit.overview ?? '',
    date: credit.release_date ?? credit.first_air_date ?? '',
    voteAverage: credit.vote_average ?? 0,
    posterUrl: posterUrl(credit.poster_path),
    backdropUrl: backdropUrl(credit.backdrop_path),
  }
}

export function personDetailToView(person: TmdbPersonDetail): PersonDetail {
  const credits = [...(person.combined_credits?.cast ?? []), ...(person.combined_credits?.crew ?? [])]
    .sort((left, right) => (right.popularity ?? 0) - (left.popularity ?? 0))
    .map(creditToSummary)
    .filter((item): item is MediaSummary => item !== null)
    .filter(
      (item, index, list) =>
        list.findIndex((entry) => `${entry.mediaType}-${entry.id}` === `${item.mediaType}-${item.id}`) ===
        index,
    )
    .slice(0, 18)

  return {
    id: person.id,
    name: person.name,
    biography: person.biography,
    birthday: person.birthday,
    deathday: person.deathday,
    placeOfBirth: person.place_of_birth,
    department: person.known_for_department,
    photoUrl: profileUrl(person.profile_path, 'h632'),
    credits,
  }
}

export function getPopularPeople(page = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbPerson>>('/person/popular', {
    page,
    language: 'en-US',
  })
}

export function getPersonDetail(id: number) {
  return tmdbFetch<TmdbPersonDetail>(`/person/${id}`, {
    language: 'en-US',
    append_to_response: 'combined_credits',
  })
}
