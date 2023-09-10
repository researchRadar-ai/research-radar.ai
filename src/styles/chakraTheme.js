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
      borderRadius: '10px',
    }),
    mdDarkFont: defineStyle({
      bg:'transparent',
      color: '#034078',
      border: '1px solid #0A1128',
      borderRadius: '10px',
      px: 8,
    }),
    brightBg: defineStyle({
      bg: '#1282A2',
      color: '#FEFCFB',
      borderRadius: '10px',
      px: 8,
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