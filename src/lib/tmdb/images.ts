import { TMDB_IMAGE_BASE } from './env'

export type PosterSize = 'w185' | 'w342' | 'w500' | 'original'
export type BackdropSize = 'w780' | 'w1280' | 'original'
export type ProfileSize = 'w185' | 'h632' | 'original'

export function tmdbImageUrl(
  path: string | null | undefined,
  size: PosterSize | BackdropSize | ProfileSize = 'w500',
): string | null {
  if (!path) {
    return null
  }

  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

export function posterUrl(path: string | null | undefined, size: PosterSize = 'w500') {
  return tmdbImageUrl(path, size)
}

export function backdropUrl(path: string | null | undefined, size: BackdropSize = 'w1280') {
  return tmdbImageUrl(path, size)
}

export function profileUrl(path: string | null | undefined, size: ProfileSize = 'w185') {
  return tmdbImageUrl(path, size)
}
