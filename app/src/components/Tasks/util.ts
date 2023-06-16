import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { Task } from '../../models/task'

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

export const startTask = async (task: Task) => {
  const result = await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  })

  console.log(task)

  if (!result.ok) {
    console.error(`[${result.status}] failed to post new task: ${result.body}`)
  }
}

export const stopTask = async (
  id: string | null,
  start: string,
  end: string
) => {
  if (id === null) {
    console.log('task id is null')
    return
  }

  const task: Task = {
    name: '',
    start: start,
    end: end,
    tag: '',
    pageId: id,
  }

  const result = await fetch('/api/tasks', {
    method: 'PATCH',
    body: JSON.stringify(task),
  })

  if (!result.ok) {
    console.error(`[${result.status}] failed to patch task: ${result}`)
  }
}
