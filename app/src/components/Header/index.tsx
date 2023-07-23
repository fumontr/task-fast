import { MoonIcon, SettingsIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Link, useColorMode } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex w="full" h="48px" justifyContent="right" alignItems="center" px={4}>
      <Link as={NextLink} href="/settings" aria-label="settings link">
        <IconButton
          aria-label={'Settings'}
          icon={<SettingsIcon />}
          mx={1}
        />
      </Link>
      <IconButton
        aria-label={'Toggle Color Mode'}
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        mx={1}
      />
    </Flex>
  )
}
