import { Flex, Text } from '@chakra-ui/react'
import {
  CalendarIcon,
  CheckIcon,
  RepeatIcon,
  SettingsIcon,
  TimeIcon,
} from '@chakra-ui/icons'

export const TaskFastFooter = () => {
  const fontSize = 'xs'
  const customWidth = '78px'
  return (
    <Flex
      justifyContent="left"
      bg="black"
      color="white"
      position="sticky"
      bottom={0}
      zIndex={'sticky'}
      overflow="hidden"
      h="48px"
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w={customWidth}
      >
        <CheckIcon w={4} h={4} />
        <Text fontSize={fontSize}>02:40</Text>
      </Flex>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w={customWidth}
      >
        <TimeIcon w={4} h={4} />
        <Text fontSize={fontSize}>過去ログ</Text>
      </Flex>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w={customWidth}
      >
        <CalendarIcon w={4} h={4} />
        <Text fontSize={fontSize}>未来</Text>
      </Flex>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w={customWidth}
      >
        <RepeatIcon w={4} h={4} />
        <Text fontSize={fontSize}>リピート</Text>
      </Flex>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w={customWidth}
      >
        <SettingsIcon w={4} h={4} />
        <Text fontSize={fontSize}>設定</Text>
      </Flex>
    </Flex>
  )
}
