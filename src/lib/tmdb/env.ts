export const TMDB_API_BASE = 'https://api.themoviedb.org/3'
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

export function getTmdbToken(): string {
  const token = import.meta.env.VITE_TMDB_TOKEN

  if (!token) {
    throw new Error('VITE_TMDB_TOKEN is missing. Copy .env.example to .env and add a TMDB Read Access Token.')
  }

  return token
}
