import { Flex } from '@chakra-ui/react'
import { useStopwatch } from './useStopwatch'
import { useEffect, useState } from 'react'
import { Tasks } from './Tasks'
import { DisplayTime } from './DisplayTime'
import axios from 'axios'
import { Task } from '../model/task'
import { StopwatchButtons } from './StopwatchButtons'

export const Stopwatch = () => {
  const { isRunning, elapseTime, startStopwatch, stopStopwatch } =
    useStopwatch()

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const url = '/api/notion' // TODO: Pathを適切な内容に変更する
      const filter = {}
      try {
        const res = await axios.post(url, filter)
        setTasks(res.data.data)

        // すでに実行中のタスクが見つかったら、ストップウォッチを適切な経過時間で開始する
        const ongoingTask = res.data.data.find((task: Task) => !task.end)
        if (ongoingTask) {
          startStopwatch(ongoingTask.start)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchTasks()
  }, [])

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
        tasks={tasks}
      />
      <Tasks doingTask={doingTask} setDoingTask={setDoingTask} tasks={tasks} />
    </Flex>
  )
}
