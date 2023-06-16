import { useState } from 'react'

import { Button, Flex } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { startTask, stopTask } from '../Tasks/util'

import type { Task } from '../../models/task'

type StopwatchButtonsProps = {
  startStopwatch: (startAt: string) => void
  stopStopwatch: () => void
  isRunning: boolean
  ongoingTask: Task | null
  taskName: string
  setTaskName: (taskName: string) => void
}

export const Buttons = ({
  startStopwatch,
  stopStopwatch,
  isRunning,
  ongoingTask,
  taskName,
  setTaskName,
}: StopwatchButtonsProps) => {
  const [startAt, setStartAt] = useState<string>('')

  const handleStart = async () => {
    startStopwatch(ongoingTask?.start ?? '')
    const start = dayjs().format()
    const task: Task = {
      start: start,
      name: taskName,
      tag: 'task-fast',
      end: null,
      pageId: 'frontend-temp-pageId',
    }
    await startTask(task)
    setStartAt(start)
  }

  const handleStop = async () => {
    stopStopwatch()
    const end = dayjs().format()
    if (ongoingTask) {
      await stopTask(ongoingTask.pageId ?? '', startAt, end)
    }
    setTaskName('')
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
