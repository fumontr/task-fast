import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export const SearchBox = () => {
  return (
    <Flex
      mx={'10px'}
      my={2}
      borderRadius="10px"
      bg="brand.background.default"
      h={10}
      alignItems="center"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="black" />
        </InputLeftElement>
        <Input
          type="text"
          color="black"
          placeholder="検索"
          _placeholder={{ color: 'black' }}
        />
      </InputGroup>
    </Flex>
  )
}
