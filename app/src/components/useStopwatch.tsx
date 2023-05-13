import { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [startAt, setStartAt] = useState(dayjs())
  const [elapseTime, setElapseTime] = useState<number>(0)
  const [stoppedElapsedTime, setStoppedElapsedTime] = useState<number>(0)

  const startStopwatch = useCallback(() => {
    const now = dayjs()
    setIsRunning(true)
    setStartAt(now)
    setElapseTime(stoppedElapsedTime)
  }, [stoppedElapsedTime])

  const stopStopwatch = useCallback(() => {
    setIsRunning(false)
    setStoppedElapsedTime(elapseTime)
  }, [elapseTime])

  const resetStopwatch = useCallback(() => {
    setIsRunning(false)
    setElapseTime(0)
    setStoppedElapsedTime(0)
  }, [])

  useEffect(() => {
    const timer = setInterval(
      () => isRunning && setElapseTime(prev => prev + 1),
      1000
    )
    return () => clearInterval(timer)
  }, [startAt, isRunning])

  return {
    isRunning,
    elapseTime,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
  }
}
