import { ChangeEvent, useState } from 'react'

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
  useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { loginWithGoogle, logout } from '../../components/User/auth'
import { useAuthContext } from '../../components/User/authProvider'

const Settings = () => {
  const router = useRouter()
  const toast = useToast()

  const authContext = useAuthContext()

  const [showAPIKey, setShowAPIKey] = useState<boolean>(false)
  const handleClickAPIKey = () => {
    setShowAPIKey(!showAPIKey)
  }

  const [showDBID, setShowDBID] = useState<boolean>(false)
  const handleClickDBID = () => {
    setShowDBID(!showDBID)
  }

  const [apiKey, setAPIKey] = useState<string>('')
  const handleChangeAPIKey = (e: ChangeEvent<HTMLInputElement>) => {
    setAPIKey(e.target.value)
  }

  const [dbID, setDBID] = useState<string>('')
  const handleChangeDBID = (e: ChangeEvent<HTMLInputElement>) => {
    setDBID(e.target.value)
  }

  const handleOnClick = async () => {
    // TODO: Save API Key and DB ID
    // login(userId)
    const uid = authContext.user?.uid ?? ''
    const result = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        userID: uid,
        apiKey: apiKey,
        dbID: dbID,
      }),
    })

    console.log(await result.json())
    if (result.ok) {
      toast({
        title: 'Success',
        description: 'API Key and DB ID are saved successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
      await router.push('/')
    } else if (!result.ok) {
      toast({
        title: 'Error',
        description: 'API Key and DB ID could not saved successfully.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const handleGoogleLogin = async () => {
    await loginWithGoogle()
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
          onClick={handleOnClick}
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
        <Text fontSize="xl" w="full">
          UserID: {authContext.user?.uid ?? 'No User is selected.'}
        </Text>
        <Text fontSize="xl" w="full">
          User Name: {authContext?.user?.displayName ?? 'No User is selected.'}
        </Text>
        <HStack w="full">
          <Button onClick={handleGoogleLogin}>Googleでログイン</Button>
          {authContext?.user && <Button onClick={logout}>Logout</Button>}
          </HStack>
        <HStack w="full">
          <Text w="100px" fontSize="xl">
            API KEY
          </Text>
          <InputGroup w="400px">
            <Input
              pr={'4.5rem'}
              type={showAPIKey ? 'text' : 'password'}
              onChange={(e) => handleChangeAPIKey(e)}
            />
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
          <InputGroup w="400px">
            <Input
              pr={'4.5rem'}
              type={showDBID ? 'text' : 'password'}
              onChange={(e) => handleChangeDBID(e)}
            />
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
