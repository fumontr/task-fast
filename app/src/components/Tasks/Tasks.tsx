import { Flex, Input } from '@chakra-ui/react'
import { Notion } from './Notion'
import { Task } from '../../models/task'

type TasksProps = {
  doingTask: string
  setDoingTask: (task: string) => void
  tasks: Task[]
}

export const Tasks = ({ doingTask, setDoingTask, tasks }: TasksProps) => {
  const displayWidth = '600px'
  return (
    <>
      <Flex my={8}>
        <Input
          w={displayWidth}
          value={doingTask}
          placeholder={"What's next?"}
          onChange={(e) => {
            setDoingTask(e.target.value)
          }}
          color={'white'}
          borderColor="gray.500"
          _focusVisible={{ borderColor: 'gray.300' }}
          _hover={{ borderColor: 'gray.300' }}
        />
      </Flex>
      <Notion displayWidth={displayWidth} tasks={tasks} />
    </>
  )
}
