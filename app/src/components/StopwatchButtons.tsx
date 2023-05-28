import { useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import type { Task } from '../model/task'
import { startTask, stopTask } from './Notion'
import dayjs from 'dayjs'

type StopwatchButtonsProps = {
  doingTask: string
  setDoingTask: (doingTask: string) => void
  startStopwatch: (doingTask: string) => void
  stopStopwatch: () => void
  isRunning: boolean
}

export const StopwatchButtons = ({
  startStopwatch,
  doingTask,
  setDoingTask,
  isRunning,
  stopStopwatch,
}: StopwatchButtonsProps) => {
  const [taskId, setTaskId] = useState<string>('')
  const [startAt, setStartAt] = useState<string>('')

  const handleStart = () => {
    startStopwatch(doingTask)
    const start = dayjs().format()
    const task: Task = {
      start: start,
      name: doingTask,
      tag: 'task-fast',
      end: null,
      pageId: null,
    }
    startTask(task, setTaskId)
    setStartAt(start)
    setDoingTask('') // Task clear
  }

  const handleStop = () => {
    stopStopwatch()
    stopTask(dayjs().format(), taskId, startAt)
    setDoingTask('') // Task clear
  }

  return (
    <Flex direction="row">
      <Button
        color="white"
        size="lg"
        borderColor="white"
        border="1px"
        _hover={{ bg: 'gray.800' }}
        _active={{ bg: 'gray.700' }}
        bg="gray.900"
        onClick={handleStart}
        display={isRunning ? 'none' : 'Flex'}
      >
        スタート
      </Button>
      <Button
        color="white"
        size="lg"
        borderColor="white"
        border="1px"
        _hover={{ bg: 'gray.800' }}
        _active={{ bg: 'gray.700' }}
        bg="gray.900"
        onClick={handleStop}
        display={isRunning ? 'Flex' : 'none'}
      >
        ストップ
      </Button>
    </Flex>
  )
}
