import { Flex, Spacer, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { Task } from '../../models/task'

import { calcElapseTime, convertToTimeString } from './util'

export const TaskContainer = (task: Task) => {
  const start = dayjs(task.start)
  const end = task.end !== null ? dayjs(task.end) : null

  const startStr = convertToTimeString(start)
  const endStr = convertToTimeString(end)
  const elapseTime = calcElapseTime(start, end)

  return (
    <Flex w="full">
      <Flex w="200px">
        <Text color="white">{task.name}</Text>
      </Flex>
      <Spacer />
      <Flex px={2} w="60px">
        <Text color="white" fontFamily="Roboto Mono">
          {startStr}
        </Text>
      </Flex>
      <Text color="white">~</Text>
      <Flex px={2} w="60px">
        <Text color="white" fontFamily="Roboto Mono">
          {endStr}
        </Text>
      </Flex>
      <Flex px={2} w="100px" justifyContent="right">
        <Text color="white" fontFamily="Roboto Mono">
          {elapseTime}
        </Text>
      </Flex>
    </Flex>
  )
}
