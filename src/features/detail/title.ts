import { formatYear } from '../../lib/formatYear'
import { backdropUrl, posterUrl } from '../../lib/tmdb'
import type { MediaType, TmdbMovieDetail, TmdbTvDetail } from '../../lib/tmdb'

export type TitleDetail = {
  id: number
  mediaType: MediaType
  title: string
  tagline: string
  overview: string
  date: string
  voteAverage: number
  genres: string[]
  meta: string
  posterUrl: string | null
  backdropUrl: string | null
}

export function movieDetailToTitle(movie: TmdbMovieDetail): TitleDetail {
  const runtime = movie.runtime ? `${movie.runtime} min` : null

  return {
    id: movie.id,
    mediaType: 'movie',
    title: movie.title,
    tagline: movie.tagline,
    overview: movie.overview,
    date: movie.release_date,
    voteAverage: movie.vote_average,
    genres: movie.genres.map((genre) => genre.name),
    meta: [formatYear(movie.release_date), runtime].filter(Boolean).join(' · '),
    posterUrl: posterUrl(movie.poster_path),
    backdropUrl: backdropUrl(movie.backdrop_path),
  }
}

export function tvDetailToTitle(show: TmdbTvDetail): TitleDetail {
  const seasons =
    show.number_of_seasons > 0 ? `${show.number_of_seasons} season` : null

  return {
    id: show.id,
    mediaType: 'tv',
    title: show.name,
    tagline: show.tagline,
    overview: show.overview,
    date: show.first_air_date,
    voteAverage: show.vote_average,
    genres: show.genres.map((genre) => genre.name),
    meta: [formatYear(show.first_air_date), seasons].filter(Boolean).join(' · '),
    posterUrl: posterUrl(show.poster_path),
    backdropUrl: backdropUrl(show.backdrop_path),
  }
}
