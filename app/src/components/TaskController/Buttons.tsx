import { useState } from 'react'

import { Button, Flex } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { useAuthContext } from '../User/authProvider'

import { startTask, stopTask } from './util'

import type { Task } from '../../models/task'

type StopwatchButtonsProps = {
  startStopwatch: (startAt: string) => void
  stopStopwatch: () => void
  isRunning: boolean
  ongoingTask: Task | undefined
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
  const authContext = useAuthContext()
  const user = authContext.user

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
    // TODO: ましなハンドリング
    const userID = user?.uid ?? ''
    await startTask(task, userID)
    setStartAt(start)
  }

  const handleStop = async () => {
    stopStopwatch()
    const end = dayjs().format()
    if (ongoingTask) {
      // TODO: ましなハンドリング
      const userID = user?.uid ?? ''
      await stopTask(ongoingTask.pageId ?? '', startAt, end, userID)
    }
    setTaskName('')
  }

  const commonButtonStyle = {
    // color: 'white',
    size: 'lg',
    // borderColor: 'white',
    // border: '1px',
    // _hover: { bg: 'gray.800' },
    // _active: { bg: 'gray.700' },
    // bg: 'gray.900',
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
