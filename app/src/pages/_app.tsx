import * as React from 'react'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { Header } from '../components/Header'
import { AuthProvider } from '../components/User/authProvider'
import { theme } from '../models/theme'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
