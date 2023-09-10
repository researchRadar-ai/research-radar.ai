import { Circle, Flex, Heading, Avatar } from '@chakra-ui/react'

export default function Header() {
  return (
    <Flex
      justify="space-between"
      align="center"
      w="95%"
      px="3%"
      w="100%"
      py={4}
      bg="#FEFCFB"
    >
      <Heading as="h1" fontFamily="'Delius Swash Caps', cursive" fontSize="56px" color="#1282A2">
        Research Radar
      </Heading>
      <Avatar size="md" />
    </Flex>
  )
}