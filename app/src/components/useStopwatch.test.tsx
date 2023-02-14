import { useStopwatch } from './useStopwatch'
import { renderHook } from '@testing-library/react'

test('before starting stopwatch', () => {
  const { result } = renderHook(() => useStopwatch())
  expect(result.current.isRunning).toEqual(false)
  expect(result.current.elapseTime).toEqual(0)
})

