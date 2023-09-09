import '@/styles/globals.css'
import { ChakraProvider, Flex } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  return (<ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>);
}