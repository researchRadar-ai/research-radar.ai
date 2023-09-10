import {
  extendTheme, defineStyle, defineStyleConfig
} from '@chakra-ui/react'

const headingTheme = defineStyleConfig({
  defaultProps: { color: '#0A1128' }
})

const buttonTheme = defineStyleConfig({
  variants: {
    darkBg: defineStyle({
      bg: '#0A1128',
      color: '#FFFFFF',
      px: 8,
      borderRadius: '5%',
    }),
    mdDarkFont: defineStyle({
      bg:'transparent',
      color: '#034078',
      border: '1px solid #0A1128',
      px: 8,
      borderRadius: '5%',
    }),
    brightBg: defineStyle({
      bg: '#1282A2',
      color: '#FEFCFB',
      px: 8,
      borderRadius: '5%',
    })
  }
})

export const globalTheme = extendTheme({
  components: {
    Heading: headingTheme,
    Button: buttonTheme,
  },
  fonts: {
    heading: "'Unna', serif"
  }
})