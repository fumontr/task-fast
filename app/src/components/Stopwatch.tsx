import { Flex } from '@chakra-ui/react'
import { useStopwatch } from './useStopwatch'
import { useEffect, useState } from 'react'
import { Tasks } from './Tasks'
import { DisplayTime } from './DisplayTime'
import { StopwatchButtons } from './StopwatchButtons'
import axios from 'axios'
import { Task } from '../model/task'

export const Stopwatch = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const url = '/api/notion'
    const data = {}
    axios
      .post(url, data)
      .then((res) => {
        setTasks(res.data.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

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
      <DisplayTime hours={hour} minutes={minute} seconds={second} />
      <StopwatchButtons
        doingTask={doingTask}
        setDoingTask={setDoingTask}
        startStopwatch={startStopwatch}
        stopStopwatch={stopStopwatch}
        isRunning={isRunning}
        setTasks={setTasks}
      />
      <Tasks doingTask={doingTask} setDoingTask={setDoingTask} tasks={tasks} />
    </Flex>
  )
}
