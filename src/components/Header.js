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
      <Heading
        as="a"
        fontFamily="'Delius Swash Caps', cursive"
        fontSize="56px"
        color="#1282A2"
        cursor="pointer"
        _hover={{ opacity: 0.8 }}
        href="/"
        alt="Research Radar Logo"
      >
        Research Radar
      </Heading>
      <Avatar size="md" />
    </Flex>
  )
}