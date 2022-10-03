import { Flex, IconButton, Text } from '@chakra-ui/react'
import { VscDebugStart } from 'react-icons/vsc'

export const Task = ({ task }: { task: string }) => {
  return (
    <Flex h={8} bg="brand.taskBackground" alignItems="center">
      <IconButton aria-label="start-task-icon" icon={<VscDebugStart />} />
      <Text fontSize="12px">{task}</Text>
    </Flex>
  )
}
