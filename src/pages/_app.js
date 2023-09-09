import { useState } from 'react'
import '@/styles/globals.css'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { globalTheme } from '../styles/ChakraTheme'

export default function App({ Component, pageProps }) {
  const [projectId, setProjectId] = useState(null);

  return (<ChakraProvider theme={globalTheme}>
    <Component projectId={projectId} setProjectId={setProjectId} {...pageProps} />
  </ChakraProvider>);
}