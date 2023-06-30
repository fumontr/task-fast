import { Flex, Text } from '@chakra-ui/react'
import dayjs, { Dayjs } from 'dayjs'

import { TaskContainer } from './TaskContainer'

import type { Task } from '../../models/task'

interface GroupedTasks {
  [date: string]: {
    tasks: Task[]
    totalTime: number
  }
}

const groupTasksByDate = (tasks: Task[]): GroupedTasks => {
  return tasks.reduce((acc: GroupedTasks, task: Task) => {
    const date: string = dayjs(task.start).format('YYYY-MM-DD')
    if (!acc[date]) {
      acc[date] = {
        tasks: [],
        totalTime: 0,
      }
    }
    acc[date].tasks.push(task)
    const endTime: Dayjs = task.end ? dayjs(task.end) : dayjs()
    const elapsedTime: number = endTime.diff(dayjs(task.start), 'second')
    acc[date].totalTime += elapsedTime
    return acc
  }, {})
}

export const Tasks = ({ tasks }: { tasks: Task[] | undefined }) => {
  const displayWidth = '600px'
  const groupedTasks = groupTasksByDate(tasks || [])

  return (
    <Flex
      h="500px"
      maxH="500px"
      overflow="auto"
      pr={4}
      w={displayWidth}
      alignItems="center"
      direction="column"
    >
      {Object.entries(groupedTasks).map(([date, { tasks, totalTime }]) => {
        return (
          <Flex direction="column" key={date} w="full">
            <Flex justifyContent="space-between" py={2}>
              <Text fontWeight="bold">{date}</Text>
              <Text fontWeight="bold" fontFamily="Robot Mono" >{numberToTime(totalTime)}</Text>
            </Flex>
            {tasks.map((data: Task) => {
              return <TaskContainer key={data.pageId} {...data} />
            })}
          </Flex>
        )
      })}
    </Flex>
  )
}

const numberToTime = (num: number): string => {
  const hour = Math.floor(num / 3600)
  const min = Math.floor((num % 3600) / 60)
  const sec = num % 60
  return `${padZero(hour)}:${padZero(min)}:${padZero(sec)}`
}

const padZero = (num: number): string => {
  return num.toString().padStart(2, '0')
}
