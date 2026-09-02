import { describe, expect, it } from 'vitest'
import { backdropUrl, posterUrl, profileUrl, tmdbImageUrl } from '../../src/lib/tmdb/images'

describe('tmdb image helpers', () => {
  it('returns null when the path is missing', () => {
    expect(tmdbImageUrl(null)).toBeNull()
    expect(posterUrl(undefined)).toBeNull()
  })

  it('builds sized asset urls', () => {
    expect(posterUrl('/a.jpg', 'w185')).toBe('https://image.tmdb.org/t/p/w185/a.jpg')
    expect(backdropUrl('/b.jpg')).toBe('https://image.tmdb.org/t/p/w1280/b.jpg')
    expect(profileUrl('/c.jpg', 'h632')).toBe('https://image.tmdb.org/t/p/h632/c.jpg')
  })
})
