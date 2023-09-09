import { Circle, Flex, Heading } from '@chakra-ui/react'

export default function Header() {
  return (
    <Flex
      justify="space-between"
      align="center"
      w="95%"
      px="3%"
      w="100%"
      py={4}
      borderBottomWidth="1px"
      borderColor="gray.200"
    >
      <Heading as="h1" fontFamily="'Delius Swash Caps', cursive" fontSize="56px" color="#0D47A1">
        Research Radar
      </Heading>
      <Circle size="50px" bg="gray.400" />
    </Flex>
  )
}