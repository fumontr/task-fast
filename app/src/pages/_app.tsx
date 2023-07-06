import * as React from 'react'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { Header } from '../components/Header'
import { theme } from '../models/theme'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
