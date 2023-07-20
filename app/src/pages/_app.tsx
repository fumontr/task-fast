import * as React from 'react'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { Header } from '../components/Header'
import { UserProvider } from '../components/UserProvider'
import { theme } from '../models/theme'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
