import { Flex, Text, Alert, AlertIcon } from '@chakra-ui/react'

export const Error = () => {
  return (
    <Flex
      h="500px"
      maxH="500px"
      overflow="auto"
      w="600px"
      alignItems="center"
      direction="column"
      pt={4}
    >
      <Alert status="error">
        <AlertIcon />
        Notionに接続できません。SECRET_KEYとDB_IDを設定してください。
      </Alert>

      <Flex direction="column">
        <Text  pt={10} pb={4}>
          設定方法
        </Text>
        <Text >1. app/.env.localを作成</Text>

        <Text >2. app/.env.localにSECRET_KEYとDB_IDを設定</Text>

        <Text  pt={10} pb={4}>
          設定例
        </Text>

        <Flex direction="column">
          <Text >SECRET_KEY=xxxxxxxxxxx</Text>
          <Text >DB_ID=xxxxxxxxxxx</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
