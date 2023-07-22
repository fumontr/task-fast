import { mutate } from 'swr'

import { Task } from '../../models/task'

export const startTask = async (task: Task, userID: string) => {
  const request = {
    ...task,
    userID: userID,
  }
  const result = await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  if (!result.ok) {
    console.error(`[${result.status}] failed to post new task: ${result.body}`)
  }

  mutate('/api/tasks')
}

export const stopTask = async (
  id: string | null,
  start: string,
  end: string,
  userID: string
) => {
  if (id === null) {
    return
  }

  const task: Task = {
    name: '',
    start: start,
    end: end,
    tag: '',
    pageId: id,
  }

  const request = {
    ...task,
    userID: userID,
  }

  const result = await fetch('/api/tasks', {
    method: 'PATCH',
    body: JSON.stringify(request),
  })

  if (!result.ok) {
    console.error(`[${result.status}] failed to patch task: ${result}`)
  }

  mutate('/api/tasks')
}
