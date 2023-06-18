import { mutate } from 'swr'

import { Task } from '../../models/task'

export const startTask = async (task: Task) => {
  const result = await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  })

  if (!result.ok) {
    console.error(`[${result.status}] failed to post new task: ${result.body}`)
  }

  mutate('/api/tasks')
}

export const stopTask = async (
  id: string | null,
  start: string,
  end: string
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

  const result = await fetch('/api/tasks', {
    method: 'PATCH',
    body: JSON.stringify(task),
  })

  if (!result.ok) {
    console.error(`[${result.status}] failed to patch task: ${result}`)
  }

  mutate('/api/tasks')
}
