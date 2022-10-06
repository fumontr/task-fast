import { Button, Flex } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

export const FilterButtons = () => {
  const fontSize = '12px'
  const fontWeight = 'regular'
  const buttonTexts = ['実行中', '未完了', 'プロジェクト', 'タグ', 'タスク']
  return (
    <Flex
      mx="10px"
      my={2}
      borderRadius="10px"
      bg="brand.background.default"
      h={10}
      alignItems="center"
      justifyContent="space-between"
    >
      {buttonTexts.map((text) => (
        <Button fontSize={fontSize} fontWeight={fontWeight} key={uuidv4()}>
          {text}
        </Button>
      ))}
    </Flex>
  )
}
