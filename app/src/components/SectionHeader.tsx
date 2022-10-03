import { Flex, Text } from '@chakra-ui/react'

export const SectionHeader = () => {
  const fontSize = '12px'
  return (
    <Flex bg="brand.background.default" h={6} alignItems="center" px="12px">
      <Text fontSize={fontSize}>7 - 9</Text>
      <Text fontSize={fontSize} ml={2}>
        002:00
      </Text>
    </Flex>
  )
}
