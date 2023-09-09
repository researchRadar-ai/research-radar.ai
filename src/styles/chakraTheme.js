import {
  extendTheme, defineStyleConfig, createMultiStyleConfigHelpers,
} from '@chakra-ui/react'

const headingTheme = defineStyleConfig({
  defaultProps: { color: '#0A1128' }
})

export const globalTheme = extendTheme({
  components: {
    Heading: headingTheme
  },
  fonts: {
    heading: "'Unna', serif"
  }
})