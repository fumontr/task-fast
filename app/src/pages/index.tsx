import { NextPage } from 'next'
import { Container, Flex } from '@chakra-ui/react'
import { TaskFastHeader } from '@/components/Header'
import { SearchBox } from '@/components/SearchBox'
import { FilterButtons } from '@/components/FilterButtons'
import { Section } from '@/components/Section'

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
        bg="white"
        p={0}
        m={0}
      >
        <TaskFastHeader />
        <SearchBox />
        <Flex border="1px" h={0} borderColor="brand.background.default" />
        <FilterButtons />
        <Section />
        <Section />
        <Section />
        <Section />
        <Section />
        <Section />
        <Section />
        <Section />
      </Container>
    </Flex>
  )
}

export default Home
