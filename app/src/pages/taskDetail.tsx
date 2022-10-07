import { Container, Flex } from '@chakra-ui/react'
import { TaskDetailHeader } from '../components/TaskDetailHeader'
import { TaskDetailBody } from '../components/TaskDetailBody'
import { TaskDetailFooter } from '../components/TaskDetailFooter'

const taskDetail = () => {
  return (
    <Flex justifyContent="center">
      <Container
        maxW={{
          base: 'container.sm',
          md: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl',
        }}
        bg="white"
        p={0}
        m={0}
      >
        <TaskDetailHeader />
        <TaskDetailBody />
        <TaskDetailFooter />
      </Container>
    </Flex>
  )
}

export default taskDetail
