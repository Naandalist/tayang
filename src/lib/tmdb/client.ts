import { getTmdbToken, TMDB_API_BASE } from './env'

export class TmdbError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'TmdbError'
    this.status = status
  }
}

type QueryValue = string | number | boolean | undefined

export async function tmdbFetch<T>(path: string, query?: Record<string, QueryValue>): Promise<T> {
  const url = new URL(`${TMDB_API_BASE}${path}`)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    }
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getTmdbToken()}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new TmdbError(`TMDB request failed (${response.status}) for ${path}`, response.status)
  }

  return response.json() as Promise<T>
}
