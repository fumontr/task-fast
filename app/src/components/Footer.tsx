import { Flex, Text } from '@chakra-ui/react'
import {
  CalendarIcon,
  CheckIcon,
  RepeatIcon,
  SettingsIcon,
  TimeIcon,
} from '@chakra-ui/icons'

export const TaskFastFooter = () => {
  const fontSize = '8px'
  return (
    <Flex
      justifyContent="space-evenly"
      bg="black"
      color="white"
      position="sticky"
      bottom={0}
      zIndex={'sticky'}
      overflow="hidden"
      h="48px"
    >
      <Flex direction="column" justifyContent="center" alignItems="center">
        <CheckIcon w={4} h={4} />
        <Text fontSize={fontSize}>終了予定 - 02:40 </Text>
      </Flex>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <TimeIcon w={4} h={4} />
        <Text fontSize={fontSize}>過去ログ</Text>
      </Flex>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <CalendarIcon w={4} h={4} />
        <Text fontSize={fontSize}>未来</Text>
      </Flex>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <RepeatIcon w={4} h={4} />
        <Text fontSize={fontSize}>リピート</Text>
      </Flex>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <SettingsIcon w={4} h={4} />
        <Text fontSize={fontSize}>設定</Text>
      </Flex>
    </Flex>
  )
}
