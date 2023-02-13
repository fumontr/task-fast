import { NextPage } from 'next'
import { Button, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

const Home: NextPage = () => {
  const [isRunning, setIsRunning] = useState<Boolean>(false)
  const [startAt, setStartAt] = useState(dayjs())
  const [elapseTime, setElapseTime] = useState<number>(0)
  const startTimer = () => {
    const now = dayjs()
    setIsRunning(true)
    setStartAt(now)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setElapseTime(0)
  }

  useEffect(() => {
    const timer = setInterval(
      () => isRunning && setElapseTime(dayjs().diff(startAt, 'second', false)),
      1000
    )
    return () => clearInterval(timer)
  }, [startAt, isRunning])
  const hour = Math.floor((elapseTime / (60 * 60)) % 24)
  const minute = Math.floor((elapseTime / 60) % 60)
  const second = elapseTime % 60

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="full"
      bg="gray.900"
      direction="column"
    >
      <Flex p={{ base: 0, md: 20 }} direction={'row'} alignItems="center">
        <Text fontSize={{ base: '6xl', md: '120px'}} color="white" w={{ base: '80%', md: '180px'}} textAlign="center" fontFamily="Roboto Mono">
          {hour.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={{ base: '6xl', md: '120px'}}
          color="white"
        >
          :
        </Text>
        <Text fontSize={{ base: '6xl', md: '120px'}} color="white" w={{ base: '80%', md: '180px'}} textAlign="center" fontFamily="Roboto Mono">
          {minute.toString().padStart(2, '0')}
        </Text>
        <Text fontSize={{ base: '6xl', md: '120px'}} color="white">
          :
        </Text>
        <Text fontSize={{ base: '6xl', md: '120px'}} color="white" w={{ base: '80%', md: '180px'}} textAlign="center" fontFamily="Roboto Mono">
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
          onClick={() => startTimer()}
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
          onClick={() => stopTimer()}
          display={isRunning ? 'Flex' : 'none'}
        >
          ストップ
        </Button>
        <Button
          color="white"
          size="lg"
          borderColor="white"
          border="1px"
          _hover={{ bg: 'gray.800' }}
          _active={{ bg: 'gray.700' }}
          bg="gray.900"
          onClick={() => resetTimer()}
        >
          リセット
        </Button>
      </Flex>
    </Flex >
  )
}

export default Home
