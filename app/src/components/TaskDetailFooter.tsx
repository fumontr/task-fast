import { Flex, IconButton, Progress, Text } from '@chakra-ui/react'
import { AiOutlinePause } from 'react-icons/ai'
import { VscDebugStart } from 'react-icons/vsc'

export const TaskDetailFooter = () => {
  let progressValue = 20
  return (
    <Flex alignItems="center" w="full" px={2} mt={10}>
      <Flex w="full" justifyContent="center">
        <Text>000:00:00 / 002:37:00</Text>
        <Progress value={progressValue} colorScheme="blue" h={1} />
      </Flex>
      <Flex w="80px">
        <IconButton
          aria-label="pause-button"
          icon={<AiOutlinePause />}
          bg="brand.background.default"
        />
        <IconButton aria-label="start-task-button" icon={<VscDebugStart />} bg="#6F6B6B"/>
      </Flex>
    </Flex>
  )
}
