import axios from 'axios'
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

export const startTask = (
  task: Task,
  setTasks: (value: Task[] | ((prevValue: Task[]) => Task[])) => void
) => {
  setTasks((prevTasks) => {
    return [...prevTasks, task]
  })

  axios
    .post('/api/tasks', task)
    .then((res) => {
      const newTask = {
        ...task,
        pageId: res.data.data.id,
      }
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks]
        const index = newTasks.findIndex(
          (task) => task.pageId === 'frontend-temp-pageId'
        )
        newTasks[index] = newTask
        return newTasks
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

export const stopTask = (id: string | null, start: string, end: string) => {
  if (id === null) {
    console.log('task id is null')
    return
  }

  const postTask: Task = {
    name: '',
    start: start,
    end: end,
    tag: '',
    pageId: id,
  }

  axios
    .patch('/api/tasks', postTask)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
}
