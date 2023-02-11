import { NextPage } from 'next'
import { Button, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

const Home: NextPage = () => {
  const [isRunning, setIsRunning] = useState<Boolean>(false)
  const [startAt, setStartAt] = useState(dayjs())
  const [elapceTime, setElapceTime] = useState<number>(0)
  const startTimer = () => {
    const now = dayjs()
    setIsRunning(true)
    setStartAt(now)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  useEffect(() => {
    const timer = setInterval(
      () => isRunning && setElapceTime(dayjs().diff(startAt, 'second', false)),
      1000
    )
    return () => clearInterval(timer)
  }, [startAt, isRunning])
  const hour = Math.floor((elapceTime / (60 * 60)) % 24)
  const minute = Math.floor((elapceTime / 60) % 60)
  const second = elapceTime % 60

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="full"
      bg="gray.900"
      direction="column"
    >
      <Flex p={20} direction={'row'} alignItems="center">
        <Text fontSize="120px" color="white" w="150px" textAlign="center">
          {hour.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize="120px"
          color="white"
        >
          :
        </Text>
        <Text fontSize="120px" color="white" w="150px" textAlign="center">
          {minute.toString().padStart(2, '0')}
        </Text>
        <Text fontSize="120px" color="white">
          :
        </Text>
        <Text fontSize="120px" color="white" w="150px" textAlign="center">
          {second.toString().padStart(2, '0')}
        </Text>
      </Flex>
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
      <Flex p={20} direction="column" w="720px">
        <Flex>
          <Text fontSize="4xl" color="white" w="300px" pr="40px">
            10:12 ~ 11:30
          </Text>
          <Text fontSize="4xl" color="white">
            個人開発
          </Text>
        </Flex>
        <Flex>
          <Text fontSize="4xl" color="white" w="300px" pr="100px">
            11:35 ~ 12:30
          </Text>
          <Text fontSize="4xl" color="white">
            読書
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
