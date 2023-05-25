import { useEffect, useState } from 'react'
import { NotionDataType } from '../model/notion'
import axios from 'axios'
import { Flex, Spacer, Text } from '@chakra-ui/react'
import { Task } from './Tasks'

export const Notion = () => {
  const [notionData, setNotionData] = useState<NotionDataType[]>([])
  useEffect(() => {
    const url = '/api/notion'
    const data = {}
    axios
      .post(url, data)
      .then((res) => {
        setNotionData(res.data.data.results)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <Flex
      w="720px"
      h="500px"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      {/*  display notionData */}
      {notionData.map((data) => {
        return <NotionTaskContainer key={data.id} {...data} />
      })}
    </Flex>
  )
}

const NotionTaskContainer = (task: NotionDataType) => {
  const start = convertToTime(task.properties.Time.date.start)
  const end = convertToTime(task.properties.Time.date.end)
  const elapseTime = calcElapseTime(
    task.properties.Time.date.start,
    task.properties.Time.date.end
  )
  return (
    <Flex w={'600px'}>
      <Flex px={2}>
        <Text color="white">{task.properties.Name.title[0].plain_text}</Text>
      </Flex>
      <Spacer />
      <Flex px={2}>
        <Text color="white">{start}</Text>
      </Flex>
      <Text color="white">~</Text>
      <Flex px={2}>
        <Text color="white">{end}</Text>
      </Flex>
      <Flex px={2}>
        <Text color="white">{elapseTime}</Text>
      </Flex>
    </Flex>
  )
}

const convertToTime = (time: string) => {
  const date = new Date(time)
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${hour}:${minute}`
}

const calcElapseTime = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const elapseTime = endDate.getTime() - startDate.getTime()
  const hour = Math.floor((elapseTime / (60 * 60)) % 24).toString()
  const minute = Math.floor((elapseTime / 60) % 60)
    .toString()
    .padStart(2, '0')
  const second = (elapseTime % 60).toString().padStart(2, '0')
  return `${hour}:${minute}:${second}`
}

export const startTask = (task: Task, setTaskId: (id: string) => void) => {
  const postTask: Task = {
    name: task.name,
    start: task.start,
    end: task.end,
    tag: 'Create Task Test',
    pageId: null,
  }

  console.log('postTask:', postTask)
  axios
    .post('/api/task', postTask)
    .then((res) => {
      console.log(res)
      setTaskId(res.data.data.id)
    })
    .catch((err) => {
      console.error(err)
    })
}

export const stopTask = (end: string, id: string, start: string) => {
  const postTask: Task = {
    name: '',
    start: start,
    end: end,
    tag: 'Create Task Test',
    pageId: id,
  }

  console.log('postTask:', postTask)
  axios
    .patch('/api/task', postTask)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
}
