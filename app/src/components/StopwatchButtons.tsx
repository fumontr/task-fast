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
  setTasks: (value: Task[] | ((prevValue: Task[]) => Task[])) => void
}

export const StopwatchButtons = ({
  startStopwatch,
  doingTask,
  setDoingTask,
  isRunning,
  stopStopwatch,
  setTasks,
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
    setTasks((prevTasks) => [...prevTasks, task])
  }

  const handleStop = () => {
    stopStopwatch()
    const end = dayjs().format()
    stopTask(end, taskId, startAt)
    setDoingTask('') // Task clear
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks]
      const index = newTasks.findIndex((task) => task.start === startAt)
      newTasks[index].end = end
      return newTasks
    })
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
