import { Flex, IconButton, Button, Text } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { getTodayForHeader } from '../lib/util'
import { FiShare } from 'react-icons/fi'

export const TaskDetailHeader = () => {
  const today = getTodayForHeader()
  const bgDefault = 'brand.background.default'
  return (
    <Flex
      h={{ base: 12, md: '64px' }}
      justifyContent="space-between"
      alignItems="center"
      bg="brand.background.default"
      color="black"
      position="sticky"
      top={0}
      zIndex={'sticky'}
      overflow="hidden"
    >
      <Button bg={bgDefault} px={2} h={{ base: 12, md: '64px' }}>
        <ChevronLeftIcon w={4} h={4} m={0} p={0} />
        <Text p={0} m={0}>
          今日
        </Text>
      </Button>
      <Flex>{today}</Flex>
      <IconButton
        aria-label="add-task-icon"
        icon={<FiShare />}
        bg={bgDefault}
        h={{ base: 12, md: '64px' }}
        pr={4}
      />
    </Flex>
  )
}
