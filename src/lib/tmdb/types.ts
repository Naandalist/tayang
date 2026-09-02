export type TmdbPaginatedResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type TmdbGenre = {
  id: number
  name: string
}

export type TmdbMovie = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  popularity: number
  genre_ids: number[]
  adult: boolean
  original_language: string
}

export type TmdbTvShow = {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  popularity: number
  genre_ids: number[]
  original_language: string
}

export type TmdbMovieDetail = TmdbMovie & {
  tagline: string
  runtime: number | null
  genres: TmdbGenre[]
  status: string
}

export type TmdbTvDetail = TmdbTvShow & {
  tagline: string
  genres: TmdbGenre[]
  number_of_seasons: number
  number_of_episodes: number
  episode_run_time: number[]
  status: string
}

export type TmdbKnownFor = {
  id: number
  media_type: 'movie' | 'tv'
  title?: string
  name?: string
}

export type TmdbPerson = {
  id: number
  name: string
  profile_path: string | null
  known_for_department: string
  popularity: number
  known_for: TmdbKnownFor[]
}

export type TmdbCredit = {
  id: number
  media_type: 'movie' | 'tv'
  title?: string
  name?: string
  overview?: string
  poster_path: string | null
  backdrop_path: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
  popularity?: number
  character?: string
  adult?: boolean
}

export type TmdbPersonDetail = {
  id: number
  name: string
  biography: string
  birthday: string | null
  deathday: string | null
  place_of_birth: string | null
  profile_path: string | null
  known_for_department: string
  popularity: number
  also_known_as: string[]
  combined_credits?: {
    cast: TmdbCredit[]
    crew: TmdbCredit[]
  }
}

export type TmdbMultiMovie = TmdbMovie & { media_type: 'movie' }
export type TmdbMultiTvShow = TmdbTvShow & { media_type: 'tv' }
export type TmdbMultiPerson = {
  id: number
  media_type: 'person'
  name: string
}
export type TmdbMultiResult = TmdbMultiMovie | TmdbMultiTvShow | TmdbMultiPerson

export type MediaType = 'movie' | 'tv'
