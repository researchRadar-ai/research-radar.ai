import { Input, Heading, Flex, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'

const formStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
}
export default  function Create() {
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    router.push('/');
  }

  return (
    <main>
      <Header />
      <VStack w="100%" h="80vh" minHeight="500px" spacing={16} display="flex" alignItems="center" pt="5%" bg="#FEFCFB">
        <Heading as="h4" color="#001F54" fontSize="24px" px="25%">Embark on your next journey of discovery now</Heading>
        <form onSubmit={onSubmit} style={formStyle}>
          <Flex w="60%" flexDirection="column" alignItems="center" justifyContent="center">
            <Input size="lg" mb={6} type="text" placeholder="What is the name of your new project?" />
            <Input size="lg" mt={6} mb={6} type="text" placeholder="Start by typing in your first query" />
            <Text fontStyle="italic">Hit enter to create your new project & search!</Text>
          </Flex>
          <button type="submit" visibility="hidden" />
        </form>
      </VStack>
    </main>
  )
}