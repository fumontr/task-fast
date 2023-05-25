import { Button, Flex, Text } from '@chakra-ui/react'
import { useStopwatch } from './useStopwatch'
import { useState } from 'react'
import { Task, Tasks } from './Tasks'
import { startTask, stopTask } from './Notion'

export const Stopwatch = () => {
  const {
    isRunning,
    elapseTime,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    history,
  } = useStopwatch()

  const hour = Math.floor((elapseTime / (60 * 60)) % 24)
  const minute = Math.floor((elapseTime / 60) % 60)
  const second = elapseTime % 60

  const [doingTask, setDoingTask] = useState<string>('')

  const displayWidth = '600px'

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="full"
      bg="gray.900"
      direction="column"
    >
      <DisplayTime hour={hour} minute={minute} second={second} />
      <StopwatchButtons
        doingTask={doingTask}
        setDoingTask={setDoingTask}
        startStopwatch={startStopwatch}
        stopStopwatch={stopStopwatch}
        isRunning={isRunning}
      />
      <Tasks
        history={history}
        displayWidth={displayWidth}
        doingTask={doingTask}
        setDoingTask={setDoingTask}
        resetStopwatch={resetStopwatch}
      />
    </Flex>
  )
}

type StopwatchButtonsProps = {
  doingTask: string
  setDoingTask: (doingTask: string) => void
  startStopwatch: (doingTask: string) => void
  stopStopwatch: () => void
  isRunning: boolean
}

const StopwatchButtons = ({
  startStopwatch,
  doingTask,
  setDoingTask,
  isRunning,
  stopStopwatch,
}: StopwatchButtonsProps) => {
  const [taskId, setTaskId] = useState<string>('')
  const [startAt, setStartAt] = useState<string>('')

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
        onClick={() => {
          startStopwatch(doingTask)
          setDoingTask('')
          const now = new Date()
          const start = now.toISOString()
          const task: Task = {
            start: start,
            name: doingTask,
            tag: 'task-fast',
            end: null,
            pageId: null,
          }
          startTask(task, setTaskId)
          setStartAt(start)
        }}
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
        onClick={() => {
          stopStopwatch()
          const now = new Date()
          stopTask(now.toISOString(), taskId, startAt)
        }}
        display={isRunning ? 'Flex' : 'none'}
      >
        ストップ
      </Button>
    </Flex>
  )
}

type DisplayTimeProps = {
  hour: number
  minute: number
  second: number
}

const DisplayTime = ({ hour, minute, second }: DisplayTimeProps) => {
  return (
    <Flex pt={{ base: 0, md: 10 }} direction={'row'} alignItems="center">
      <Text
        fontSize={{ base: '6xl', md: '120px' }}
        color="white"
        w={{ base: '80%', md: '180px' }}
        textAlign="center"
        fontFamily="Roboto Mono"
      >
        {hour.toString().padStart(2, '0')}
      </Text>
      <Text fontSize={{ base: '6xl', md: '120px' }} color="white">
        :
      </Text>
      <Text
        fontSize={{ base: '6xl', md: '120px' }}
        color="white"
        w={{ base: '80%', md: '180px' }}
        textAlign="center"
        fontFamily="Roboto Mono"
      >
        {minute.toString().padStart(2, '0')}
      </Text>
      <Text fontSize={{ base: '6xl', md: '120px' }} color="white">
        :
      </Text>
      <Text
        fontSize={{ base: '6xl', md: '120px' }}
        color="white"
        w={{ base: '80%', md: '180px' }}
        textAlign="center"
        fontFamily="Roboto Mono"
      >
        {second.toString().padStart(2, '0')}
      </Text>
    </Flex>
  )
}
