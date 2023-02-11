import { Button, Flex } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useState } from 'react'

export const StartButton = () => {
  const [isRunning, setIsRunning] = useState<Boolean>(false)
  const [startAt, setStartAt] = useState(dayjs())
  const startTimer = () => {
    const now = dayjs()
    console.log(now.format())
    setIsRunning(true)
    setStartAt(now)
  }

  const stopTimer = () => {
    const now = dayjs()
    const spendTime = now.diff(startAt, 'second')
    setIsRunning(false)
    console.log(spendTime)
  }

  return (
    <Flex>
      <Button
        color="white"
        size="lg"
        borderColor="white"
        border="1px"
        _hover={{ bg: 'gray.800' }}
        _active={{ bg: 'gray.700' }}
        bg="gray.900"
        onClick={() => startTimer()}
        display={isRunning ? 'none' : 'Flex'}
      >
        開始
      </Button>
      <Button
        color="white"
        size="lg"
        borderColor="white"
        border="1px"
        _hover={{ bg: 'gray.800' }}
        _active={{ bg: 'gray.700' }}
        bg="gray.900"
        onClick={() => stopTimer()}
        display={isRunning ? 'Flex' : 'none'}
      >
        終了
      </Button>
    </Flex>
  )
}
