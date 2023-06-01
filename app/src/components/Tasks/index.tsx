import { Flex } from '@chakra-ui/react'
import type { Task } from '../../models/task'
import { TaskContainer } from './TaskContainer'

export const Tasks = ({ tasks }: { tasks: Task[] }) => {
  const displayWidth = '600px'
  return (
    <Flex
      h="500px"
      maxH="500px"
      overflow="auto"
      pr={4}
      w={displayWidth}
      alignItems="center"
      direction="column"
    >
      {tasks.map((data) => {
        return <TaskContainer key={data.pageId} {...data} />
      })}
    </Flex>
  )
}
