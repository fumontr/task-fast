import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const convertToTimeString = (
  time: dayjs.Dayjs | null
): string | null => {
  if (time === null) return null
  return time.format('HH:mm')
}

export const calcElapseTime = (
  start: dayjs.Dayjs,
  end: dayjs.Dayjs | null
): string | null => {
  if (end === null) return null
  const elapseTime = dayjs.duration(end.diff(start))
  const hours = elapseTime.hours().toString().padStart(2, '0')
  const minutes = elapseTime.minutes().toString().padStart(2, '0')
  const seconds = elapseTime.seconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
