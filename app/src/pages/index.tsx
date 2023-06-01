import { useEffect, useState } from 'react'

import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import { NextPage } from 'next'

import { Stopwatch } from '../components/Stopwatch'
import { TaskManager } from '../components/TaskManager'
import { useStopwatch } from '../hooks/useStopwatch/useStopwatch'
import { Task } from '../models/task'


const Home: NextPage = () => {
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
          setDoingTaskName(ongoingTask.name)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchTasks()
  })

  const [doingTaskName, setDoingTaskName] = useState<string>('')

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="full"
      bg="gray.900"
      direction="column"
    >
      <Stopwatch
        isRunning={isRunning}
        elapseTime={elapseTime}
        startStopwatch={startStopwatch}
        stopStopwatch={stopStopwatch}
        doingTaskName={doingTaskName}
        setDoingTaskName={setDoingTaskName}
        tasks={tasks}
        setTasks={setTasks}
      />
      <TaskManager
        doingTaskName={doingTaskName}
        setDoingTaskName={setDoingTaskName}
        tasks={tasks}
      />
    </Flex>
  )
}

export default Home
