import { Button, Flex, Text, Input, Spacer } from '@chakra-ui/react'
import { StopwatchHistoryEntity, useStopwatch } from './useStopwatch'
import { useState } from 'react'

export const Stopwatch = () => {
  const {
    isRunning,
    elapseTime,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    history,
  } = useStopwatch()

  const hour = Math.floor((elapseTime / (60 * 60)) % 24)
  const minute = Math.floor((elapseTime / 60) % 60)
  const second = elapseTime % 60

  const [doingTask, setDoingTask] = useState<string>('')

  const displayWidth = '600px'

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="full"
      bg="gray.900"
      direction="column"
    >
      <Flex pt={{ base: 0, md: 10 }} direction={'row'} alignItems="center">
        <Text
          fontSize={{ base: '6xl', md: '120px' }}
          color="white"
          w={{ base: '80%', md: '180px' }}
          textAlign="center"
          fontFamily="Roboto Mono"
        >
          {hour.toString().padStart(2, '0')}
        </Text>
        <Text fontSize={{ base: '6xl', md: '120px' }} color="white">
          :
        </Text>
        <Text
          fontSize={{ base: '6xl', md: '120px' }}
          color="white"
          w={{ base: '80%', md: '180px' }}
          textAlign="center"
          fontFamily="Roboto Mono"
        >
          {minute.toString().padStart(2, '0')}
        </Text>
        <Text fontSize={{ base: '6xl', md: '120px' }} color="white">
          :
        </Text>
        <Text
          fontSize={{ base: '6xl', md: '120px' }}
          color="white"
          w={{ base: '80%', md: '180px' }}
          textAlign="center"
          fontFamily="Roboto Mono"
        >
          {second.toString().padStart(2, '0')}
        </Text>
      </Flex>
      <Flex direction="row">
        <Button
          color="white"
          size="lg"
          borderColor="white"
          border="1px"
          _hover={{ bg: 'gray.800' }}
          _active={{ bg: 'gray.700' }}
          bg="gray.900"
          onClick={() => {
            startStopwatch(doingTask)
            setDoingTask('')
          }}
          display={isRunning ? 'none' : 'Flex'}
        >
          スタート
        </Button>
        <Button
          color="white"
          size="lg"
          borderColor="white"
          border="1px"
          _hover={{ bg: 'gray.800' }}
          _active={{ bg: 'gray.700' }}
          bg="gray.900"
          onClick={() => stopStopwatch()}
          display={isRunning ? 'Flex' : 'none'}
        >
          ストップ
        </Button>
      </Flex>
      <Flex my={8}>
        <Input
          w={displayWidth}
          value={doingTask}
          placeholder={"What's next?"}
          onChange={(e) => setDoingTask(e.target.value)}
          color={'white'}
          borderColor="gray.500"
          _focusVisible={{ borderColor: 'gray.300' }}
          _hover={{ borderColor: 'gray.300' }}
        />
      </Flex>
      {/* 履歴表示 */}
      <Flex justifyContent="right" w={displayWidth} mt={10} mb={4}>
        <Button
          variant="ghost"
          color="white"
          size="md"
          borderColor="white"
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.600' }}
          bg="gray.900"
          onClick={() => resetStopwatch()}
          display={history.length > 0 ? 'Flex' : 'none'}
        >
          リセット
        </Button>
      </Flex>
      <Flex
        direction="column"
        h="500px"
        maxH="500px"
        overflow="auto"
        pr={4}
        w={displayWidth}
      >
        {history.map((h, i) => (
          <DisplayEvent key={i} {...h} />
        ))}
      </Flex>
    </Flex>
  )
}

const DisplayEvent = (event: StopwatchHistoryEntity) => {
  return (
    <Flex mt={1}>
      <Text color="white" fontSize="xl" pr={4}>
        {event.task}
      </Text>
      <Spacer />
      <Text color="white" fontSize="xl">
        {TranslateToTime(event.start)}
      </Text>
      <Text color="white" fontSize="xl">
        ~
      </Text>
      <Text color="white" fontSize="xl">
        {event.end ? TranslateToTime(event.end) : ''}
      </Text>
    </Flex>
  )
}

const TranslateToTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString()
}
