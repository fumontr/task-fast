import { Flex, Input } from '@chakra-ui/react'

type InboxProps = {
  taskName: string
  setTaskName: (taskName: string) => void
}

export const Inbox = ({ taskName, setTaskName }: InboxProps) => {
  const displayWidth = '600px'
  return (
    <Flex my={8}>
      <Input
        w={displayWidth}
        value={taskName}
        placeholder={"What's next?"}
        onChange={(e) => {
          setTaskName(e.target.value)
        }}
        // color={'white'}
        // borderColor="gray.500"
        // _focusVisible={{ borderColor: 'gray.300' }}
        // _hover={{ borderColor: 'gray.300' }}
      />
    </Flex>
  )
}
