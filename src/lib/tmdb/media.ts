import { backdropUrl, posterUrl } from './images'
import type { MediaType, TmdbMovie, TmdbTvShow } from './types'

export type MediaSummary = {
  id: number
  mediaType: MediaType
  title: string
  overview: string
  date: string
  voteAverage: number
  posterUrl: string | null
  backdropUrl: string | null
}

export function movieToSummary(movie: TmdbMovie): MediaSummary {
  return {
    id: movie.id,
    mediaType: 'movie',
    title: movie.title,
    overview: movie.overview,
    date: movie.release_date,
    voteAverage: movie.vote_average,
    posterUrl: posterUrl(movie.poster_path),
    backdropUrl: backdropUrl(movie.backdrop_path),
  }
}

export function tvToSummary(show: TmdbTvShow): MediaSummary {
  return {
    id: show.id,
    mediaType: 'tv',
    title: show.name,
    overview: show.overview,
    date: show.first_air_date,
    voteAverage: show.vote_average,
    posterUrl: posterUrl(show.poster_path),
    backdropUrl: backdropUrl(show.backdrop_path),
  }
}
