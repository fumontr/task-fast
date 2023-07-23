import { ChangeEvent, useState } from 'react'

import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  VStack,
  HStack,
  IconButton,
  Text,
  Link,
  Input,
  Button,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { loginWithGoogle, logout } from '../../components/User/auth'
import { useAuthContext } from '../../components/User/authProvider'

const Settings = () => {
  const authContext = useAuthContext()
  const router = useRouter()
  const toast = useToast()

  const checkBgColor = useColorModeValue('green.200', 'green.500')
  const closeBgColor = useColorModeValue('gray.200', 'gray.500')

  const [apiKey, setAPIKey] = useState<string>('')
  const handleChangeAPIKey = (e: ChangeEvent<HTMLInputElement>) => {
    setAPIKey(e.target.value)
  }

  const [dbID, setDBID] = useState<string>('')
  const handleChangeDBID = (e: ChangeEvent<HTMLInputElement>) => {
    setDBID(e.target.value)
  }

  const handleOnClick = async () => {
    const uid = authContext.user?.uid ?? ''
    const result = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        userID: uid,
        apiKey: apiKey,
        dbID: dbID,
      }),
    })

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
      <VStack w="600px">
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
          <Input
            pr={'4.5rem'}
            type="text"
            onChange={(e) => handleChangeAPIKey(e)}
          />
        </HStack>
        <HStack w="full">
          <Text w="100px" fontSize="xl">
            DB ID
          </Text>
          <Input
            pr={'4.5rem'}
            type="text"
            onChange={(e) => handleChangeDBID(e)}
          />
        </HStack>

        <HStack direction="row">
          <IconButton
            aria-label={'done'}
            icon={<CheckIcon />}
            background={checkBgColor}
            onClick={handleOnClick}
          />
          <Link as={NextLink} href="/" aria-label="go back home">
            <IconButton
              aria-label={'done'}
              icon={<CloseIcon />}
              background={closeBgColor}
            />
          </Link>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default Settings
