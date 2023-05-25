import { Flex } from '@chakra-ui/react'
import { useStopwatch } from './useStopwatch'
import { useState } from 'react'
import { Tasks } from './Tasks'
import { DisplayTime } from './DisplayTime'
import { StopwatchButtons } from './StopwatchButtons'

export const Stopwatch = () => {
  const { isRunning, elapseTime, startStopwatch, stopStopwatch } =
    useStopwatch()

  const hour = Math.floor((elapseTime / (60 * 60)) % 24)
  const minute = Math.floor((elapseTime / 60) % 60)
  const second = elapseTime % 60

  const [doingTask, setDoingTask] = useState<string>('')

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
      <Tasks doingTask={doingTask} setDoingTask={setDoingTask} />
    </Flex>
  )
}
