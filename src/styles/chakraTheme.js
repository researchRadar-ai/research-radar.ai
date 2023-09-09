import {
  extendTheme, defineStyleConfig, createMultiStyleConfigHelpers,
} from '@chakra-ui/react'

const headingTheme = defineStyleConfig({
  defaultProps: { color: '#001F54' }
})

export const globalTheme = extendTheme({
  components: {
    Heading: headingTheme
  },
  fonts: {
    heading: "'Unna', serif"
  }
})