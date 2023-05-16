import { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'

export type StopwatchHistoryEntity = {
  start: number
  end: number | null
}

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [startAt, setStartAt] = useState(dayjs())
  const [elapseTime, setElapseTime] = useState<number>(0)
  const [stoppedElapsedTime, setStoppedElapsedTime] = useState<number>(0)
  const [history, setHistory] = useState<StopwatchHistoryEntity[]>([])

  const startStopwatch = useCallback(() => {
    const now = dayjs()
    setIsRunning(true)
    setStartAt(now)
    setElapseTime(stoppedElapsedTime)
    setHistory((prev) => [
      ...prev,
      {
        start: now.unix(),
        end: null,
      },
    ])
  }, [])

  const stopStopwatch = useCallback(() => {
    setIsRunning(false)
    setStoppedElapsedTime(elapseTime)
    const now = dayjs()
    setHistory((prev) => {
      const lastEntity = prev[prev.length - 1]
      return [
        ...prev.slice(0, -1),
        {
          ...lastEntity,
          end: now.unix(),
        },
      ]
    })
  }, [])

  const resetStopwatch = useCallback(() => {
    setIsRunning(false)
    setElapseTime(0)
    setStoppedElapsedTime(0)
    setHistory([])
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
