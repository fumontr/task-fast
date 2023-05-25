import { Button, Flex, Input, Spacer, Text } from '@chakra-ui/react'
import { StopwatchHistoryEntity } from './useStopwatch'
import { Notion } from './Notion'

type TasksProps = {
  history: StopwatchHistoryEntity[]
  displayWidth: string
  doingTask: string
  setDoingTask: (task: string) => void
  resetStopwatch: () => void
}

export type Task = {
  start: string
  end: string | null
  name: string
  tag: string
  pageId: string | null
}

export const Tasks = ({
  history,
  displayWidth,
  doingTask,
  setDoingTask,
  resetStopwatch,
}: TasksProps) => {
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
      <Notion />
      <HistoryContainer
        displayWidth={displayWidth}
        history={history}
        resetStopwatch={resetStopwatch}
      />
    </>
  )
}

type HistoryContainerProps = {
  displayWidth: string
  history: StopwatchHistoryEntity[]
  resetStopwatch: () => void
}

const HistoryContainer = ({
  displayWidth,
  history,
  resetStopwatch,
}: HistoryContainerProps) => {
  return (
    <Flex
      direction="column"
      h="500px"
      maxH="500px"
      overflow="auto"
      pr={4}
      w={displayWidth}
    >
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
      {history.map((h, i) => (
        <DisplayEvent key={i} {...h} />
      ))}
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
