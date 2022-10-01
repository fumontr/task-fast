import { Flex, IconButton } from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import { VscDebugStart } from 'react-icons/vsc'

export const TaskFastHeader = () => {
  return (
    <Flex
      h={{ base: 12, md: '64px' }}
      justifyContent="space-between"
      alignItems="center"
      px={{ base: '10px', md: 6 }}
      bg="#D9D9D9"
      color="black"
    >
      <EditIcon w={4} h={4} />
      <Flex>2022/10/01 土</Flex>
      <Flex alignItems="center">
        <IconButton aria-label="start-task-icon" icon={<VscDebugStart />} />
        <AddIcon w={4} h={4} />
      </Flex>
    </Flex>
  )
}
