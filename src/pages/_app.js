import { useState } from 'react'
import '@/styles/globals.css'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { globalTheme } from '../styles/ChakraTheme'

export default function App({ Component, pageProps }) {
  const [project, setProject] = useState(null)

  return (<ChakraProvider theme={globalTheme}>
    <Component project={project} setProject={setProject} {...pageProps} />
  </ChakraProvider>);
}