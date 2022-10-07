import { Flex, IconButton, Input, Text } from '@chakra-ui/react'
import { FcTodoList } from 'react-icons/fc'
import { AiOutlineHistory } from 'react-icons/ai'
import { FiMapPin } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'

export const TaskDetailBody = () => {
  const elementKeys = [
    '実行日',
    '見積時間',
    'プロジェクト',
    'リピート',
    'タグ',
    '開始予定',
    '開始時刻',
    ' 終了時刻',
    'セクション',
    '評価',
  ]
  return (
    <Flex direction="column">
      <TaskTitle title={'伊豆急下田から東京まで移動'} />
      {elementKeys.map((element) => (
        <TaskDetailElement title={element} key={uuidv4()} />
      ))}
      <TaskMemo />
    </Flex>
  )
}

const TaskTitle = ({ title }: { title: string }) => {
  return (
    <Flex
      w="full"
      h={{ base: 10, md: 16 }}
      borderBottom="1px"
      borderColor="brand.background.default"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex alignItems="center">
        <IconButton aria-label="add-task-icon" icon={<FcTodoList />} />
        <Input
          type="text"
          color="black"
          placeholder={title}
          _placeholder={{ color: 'black' }}
          p={0}
        />
      </Flex>
      <Flex>
        <IconButton
          aria-label="task-history-button"
          icon={<AiOutlineHistory />}
          size="sm"
        />
        <IconButton aria-label="map-button" icon={<FiMapPin />} size="sm" />
      </Flex>
    </Flex>
  )
}

const TaskDetailElement = ({ title }: { title: string }) => {
  return (
    <Flex
      alignItems="center"
      px={2}
      h={{ base: 8, md: 16 }}
      borderBottom="1px"
      borderColor="brand.background.default"
    >
      <Flex w={{ base: '100px', md: '200px' }}>
        <Text
          color="text.900"
          fontSize={{ base: '12px', md: '24px' }}
          fontWeight="bold"
        >
          {title}:
        </Text>
      </Flex>
      <Flex w="full">
        <Input
          type="text"
          fontSize={{ base: '12px', md: '24px' }}
          h={{ base: 8, md: 16 }}
          p={0}
        />
      </Flex>
    </Flex>
  )
}

const TaskMemo = () => {
  return (
    <Flex px={2} pt={1} h={{ base: "350px", md: '150px' }}>
      <Text
        fontSize={{ base: '12px', md: '24px' }}
        color="text.900"
        fontWeight="bold"
      >
        メモ:
      </Text>
    </Flex>
  )
}
