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
      <Alert color="white" status="error">
        <AlertIcon />
        Notionに接続できません。SECRET_KEYとDB_IDを設定してください。
      </Alert>

      <Flex direction="column">
        <Text color="white" pt={10} pb={4}>
          設定方法
        </Text>
        <Text color="white">1. app/.env.localを作成</Text>

        <Text color="white">2. app/.env.localにSECRET_KEYとDB_IDを設定</Text>

        <Text color="white" pt={10} pb={4}>
          設定例
        </Text>

        <Flex background="gray.700" direction="column">
          <Text color="white">SECRET_KEY=xxxxxxxxxxx</Text>
          <Text color="white">DB_ID=xxxxxxxxxxx</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
