import { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [startAt, setStartAt] = useState(dayjs())
  const [elapseTime, setElapseTime] = useState<number>(0)
  const [stoppedElapsedTime, setStoppedElapsedTime] = useState<number>(0)
  const [history, setHistory] = useState<{ timestamp: number, action: string }[]>([])

  const startStopwatch = useCallback(() => {
    const now = dayjs()
    setIsRunning(true)
    setStartAt(now)
    setElapseTime(stoppedElapsedTime)
    setHistory(prev => [...prev, { timestamp: now.unix(), action: 'start' }])
  }, [stoppedElapsedTime])

  const stopStopwatch = useCallback(() => {
    setIsRunning(false)
    setStoppedElapsedTime(elapseTime)
    setHistory(prev => [...prev, { timestamp: dayjs().unix(), action: 'stop' }])
  }, [elapseTime])

  const resetStopwatch = useCallback(() => {
    setIsRunning(false)
    setElapseTime(0)
    setStoppedElapsedTime(0)
    setHistory(prev => [...prev, { timestamp: dayjs().unix(), action: 'reset' }])
  }, [])

  useEffect(() => {
    const timer = setInterval(
      () => isRunning && setElapseTime((prev) => prev + 1),
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
    history,
  }
}
