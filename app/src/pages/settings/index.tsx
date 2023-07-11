import { useState } from 'react'

import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  VStack,
  HStack,
  IconButton,
  Text,
  Link,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'

const Settings = () => {
  const [showAPIKey, setShowAPIKey] = useState<boolean>(false)
  const handleClickAPIKey = () => {
    setShowAPIKey(!showAPIKey)
  }

  const [showDBID, setShowDBID] = useState<boolean>(false)
  const handleClickDBID = () => {
    setShowDBID(!showDBID)
  }

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      width="full"
      direction="column"
    >
      <Text fontSize="3xl">Setting</Text>

      <HStack direction="row">
        <IconButton
          aria-label={'done'}
          icon={<CheckIcon />}
          background="green"
        />
        <Link as={NextLink} href="/" aria-label="go back home">
          <IconButton
            aria-label={'done'}
            icon={<CloseIcon />}
            background="gray"
          />
        </Link>
      </HStack>

      <VStack w="600px">
        <HStack w="full">
          <Text w="100px" fontSize="xl">
            API KEY
          </Text>
          <InputGroup>
            <Input pr={'4.5rem'} type={showAPIKey ? 'text' : 'password'} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size={'sm'} onClick={handleClickAPIKey}>
                {showAPIKey ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </HStack>
        <HStack w="full">
          <Text w="100px" fontSize="xl">
            DB ID
          </Text>
          <InputGroup>
            <Input pr={'4.5rem'} type={showDBID ? 'text' : 'password'} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size={'sm'} onClick={handleClickDBID}>
                {showDBID ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default Settings
