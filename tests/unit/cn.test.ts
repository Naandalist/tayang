import { describe, expect, it } from 'vitest'
import { cn } from '../../src/lib/cn'

describe('cn', () => {
  it('merges conflicting tailwind classes', () => {
    expect(cn('px-2', 'px-4', false && 'hidden')).toBe('px-4')
  })
})
