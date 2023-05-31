import { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [elapseTime, setElapseTime] = useState<number>(0)

  const startStopwatch = useCallback((startAt: string) => {
    const start = startAt ? dayjs(startAt) : dayjs()
    setIsRunning(true)
    // 現在時刻 - start で経過時間を計算. number型で保持
    const elapsed = dayjs().diff(start, 'second')
    setElapseTime(elapsed)
  }, [])

  const stopStopwatch = useCallback(() => {
    setIsRunning(false)
    setElapseTime(0)
  }, [])

  useEffect(() => {
    const timer = setInterval(
      () => isRunning && setElapseTime((prev) => prev + 1),
      1000
    )
    return () => clearInterval(timer)
  }, [isRunning])

  return {
    isRunning,
    elapseTime,
    startStopwatch,
    stopStopwatch,
  }
}
