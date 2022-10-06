import { SectionHeader } from './SectionHeader'
import { Flex } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import { Task } from './Task'

export const Section = () => {
  const tasks: string[] = ['朝ご飯', '原神', '仕事']
  return (
    <Flex direction="column">
      <SectionHeader />
      {tasks.map((taskName) => (
        <Task task={taskName} key={uuidv4()} />
      ))}
    </Flex>
  )
}
