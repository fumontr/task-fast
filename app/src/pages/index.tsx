import { NextPage } from 'next'
import { Container, Flex } from '@chakra-ui/react'
import { TaskFastHeader } from '@/components/header'

const Home: NextPage = () => {
  return (
    // 640以下だとsm, 640より大きいとmd, 1024より大きいとlg, 1280より大きいとxl。ただし、marginが考慮されない
    <Flex justifyContent="center">
      <Container
        maxW={{
          base: 'container.sm',
          md: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl',
        }}
        bg="brand.900"
        p={0}
        m={0}
      >
        <TaskFastHeader />
      </Container>
    </Flex>
  )
}

export default Home
