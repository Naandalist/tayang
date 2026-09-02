import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useDebouncedValue } from '../../src/hooks/useDebouncedValue'

describe('useDebouncedValue', () => {
  it('waits for the delay before exposing the latest value', () => {
    vi.useFakeTimers()
    const hook = renderHook(({ value }) => useDebouncedValue(value, 400), {
      initialProps: { value: 'sp' },
    })

    hook.rerender({ value: 'spid' })
    expect(hook.result.current).toBe('sp')

    act(() => {
      vi.advanceTimersByTime(400)
    })

    expect(hook.result.current).toBe('spid')
    vi.useRealTimers()
  })
})
