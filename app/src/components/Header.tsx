import { Flex, IconButton } from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import { VscDebugStart } from 'react-icons/vsc'
import { getTodayForHeader } from '../lib/util'

export const TaskFastHeader = () => {
  const today = getTodayForHeader()
  const bgDefault = 'brand.background.default'
  return (
    <Flex
      h={{ base: 12, md: '64px' }}
      justifyContent="space-between"
      alignItems="center"
      px={{ base: '10px', md: 6 }}
      bg="brand.background.default"
      color="black"
      position="sticky"
      top={0}
      zIndex={'sticky'}
      overflow="hidden"
    >
      <IconButton
        aria-label="edit-task-list"
        icon={<EditIcon />}
        bg={bgDefault}
      />
      <Flex>{today}</Flex>
      <Flex alignItems="center">
        <IconButton
          aria-label="start-task-icon"
          icon={<VscDebugStart />}
          bg={bgDefault}
        />
        <IconButton
          aria-label="add-task-icon"
          icon={<AddIcon />}
          bg={bgDefault}
        />
      </Flex>
    </Flex>
  )
}
