import { Flex, Input } from '@chakra-ui/react'

type InboxProps = {
  doingTaskName: string
  setDoingTaskName: (task: string) => void
}

export const Inbox = ({ doingTaskName, setDoingTaskName }: InboxProps) => {
  const displayWidth = '600px'
  return (
    <Flex my={8}>
      <Input
        w={displayWidth}
        value={doingTaskName}
        placeholder={"What's next?"}
        onChange={(e) => {
          setDoingTaskName(e.target.value)
        }}
        color={'white'}
        borderColor="gray.500"
        _focusVisible={{ borderColor: 'gray.300' }}
        _hover={{ borderColor: 'gray.300' }}
      />
    </Flex>
  )
}
