import { useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import type { Task } from '../../models/task'
import { startTask, stopTask } from '../Tasks/util'
import dayjs from 'dayjs'

type StopwatchButtonsProps = {
  doingTaskName: string
  setDoingTaskName: (doingTask: string) => void
  startStopwatch: (doingTask: string) => void
  stopStopwatch: () => void
  isRunning: boolean
  setTasks: (value: Task[] | ((prevValue: Task[]) => Task[])) => void
  tasks: Task[]
}

export const Buttons = ({
  doingTaskName,
  setDoingTaskName,
  startStopwatch,
  stopStopwatch,
  isRunning,
  setTasks,
  tasks,
}: StopwatchButtonsProps) => {
  const [startAt, setStartAt] = useState<string>('')

  const handleStart = () => {
    startStopwatch('')
    const start = dayjs().format()
    const task: Task = {
      start: start,
      name: doingTaskName,
      tag: 'task-fast',
      end: null,
      pageId: 'frontend-temp-pageId',
    }
    startTask(task, setTasks)
    setStartAt(start)
  }

  const handleStop = () => {
    stopStopwatch()
    const end = dayjs().format()
    setDoingTaskName('') // Task clear
    // 複数いたらバグる
    const ongoingTask = tasks.find((task) => !task.end)
    if (ongoingTask) {
      stopTask(ongoingTask.pageId ?? '', startAt, end)
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks]
        const index = newTasks.findIndex(
          (task) => task.pageId === ongoingTask.pageId
        )
        newTasks[index].end = end
        return newTasks
      })
    }
  }

  const commonButtonStyle = {
    color: 'white',
    size: 'lg',
    borderColor: 'white',
    border: '1px',
    _hover: { bg: 'gray.800' },
    _active: { bg: 'gray.700' },
    bg: 'gray.900',
  }

  return (
    <Flex direction="row">
      <Button
        {...commonButtonStyle}
        onClick={handleStart}
        display={isRunning ? 'none' : 'Flex'}
      >
        スタート
      </Button>
      <Button
        {...commonButtonStyle}
        onClick={handleStop}
        display={isRunning ? 'Flex' : 'none'}
      >
        ストップ
      </Button>
    </Flex>
  )
}
