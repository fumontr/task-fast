import { Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import useSWR from 'swr'

import { Error } from '../components/Error'
import { TaskController } from '../components/TaskController'
import { TaskManager } from '../components/TaskManager'
import { useAuthContext } from '../components/User/authProvider'
import { Task } from '../models/task'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type GetTasksResponse = {
  data: Task[]
  message: string
}

const Failed = 'Failed'

const Home: NextPage = () => {
  const authContext = useAuthContext()
  const user = authContext.user
  const uid = user?.uid ?? ''

  const { data, error, isLoading } = useSWR<GetTasksResponse>(
    `/api/tasks?userID=${uid}`,
    fetcher
  )

  if (isLoading) return <Flex height="100vh" width="full" />
  if (error) return <Flex>{error}</Flex>

  const responseMessage = data?.message

  if (responseMessage === Failed) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        width="full"
        direction="column"
      >
        <TaskController ongoingTask={undefined} />
        <Error />
      </Flex>
    )
  }

  const task = data?.data.find((task: Task) => task.end === null)

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="full"
      direction="column"
    >
      <TaskController ongoingTask={task} />
      <TaskManager tasks={data?.data} />
    </Flex>
  )
}

export default Home
