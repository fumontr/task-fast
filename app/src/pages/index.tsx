import { Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import useSWR from 'swr'

import { TaskController } from '../components/TaskController'
import { TaskManager } from '../components/TaskManager'
import { Task } from '../models/task'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type GetTasksResponse = {
  data: Task[]
  message: string
}

const Home: NextPage = () => {
  const { data, error, isLoading } = useSWR<GetTasksResponse>(
    '/api/tasks',
    fetcher
  )

  if (isLoading) return <Flex height="100vh" width="full" bg="gray.900" />
  if (error) return <Flex>{error}</Flex>

  console.log(data)

  const task = data?.data.find((task: Task) => task.end === null)
  console.log(task)
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="full"
      bg="gray.900"
      direction="column"
    >
      <TaskController ongoingTask={task} />
      <TaskManager tasks={data?.data} />
    </Flex>
  )
}

export default Home
