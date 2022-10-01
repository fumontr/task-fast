import { NextPage } from 'next'
import { Container, Flex } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    // 640以下だとsm, 640より大きいとmd, 1024より大きいとlg, 1280より大きいとxl。ただし、marginが考慮されない
    <Container
      maxW={{
        base: 'container.sm',
        md: 'container.md',
        lg: 'container.lg',
        xl: 'container.xl',
      }}
      bg="brand.900"
      p={0}
    >
      <Flex color="brand.900" bg="brand.100">
        Hello World!
      </Flex>
    </Container>
  )
}

export default Home
