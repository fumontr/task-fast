import { MoonIcon, SettingsIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, IconButton, useColorMode } from '@chakra-ui/react'

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex w="full" h="48px" justifyContent="right" alignItems="center" px={4}>
      <IconButton aria-label={'Settings'} icon={<SettingsIcon />} mx={1} />
      <IconButton
        aria-label={'Toggle Color Mode'}
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        mx={1}
      />
    </Flex>
  )
}
