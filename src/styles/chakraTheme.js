import {
  extendTheme, defineStyle, defineStyleConfig, createMultiStyleConfigHelpers
} from '@chakra-ui/react'
import { inputAnatomy } from '@chakra-ui/anatomy'

const {
  definePartsStyle, defineMultiStyleConfig
} = createMultiStyleConfigHelpers(inputAnatomy.keys)


const headingTheme = defineStyleConfig({
  defaultProps: { color: '#0A1128' }
})

const buttonTheme = defineStyleConfig({
  variants: {
    darkBg: defineStyle({
      bg: '#0A1128',
      color: '#FFFFFF',
      borderRadius: '20px',
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
      border: 'none',
      borderRadius: '10px',
      px: 8,
    }),
    mdLightBg: defineStyle({
      bg: '#034078',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
    })
  }
})

const inputTheme = defineMultiStyleConfig({
  variants: {
    custom: definePartsStyle({
      field: {
        bg: 'transparent',
        borderBottom: '1px solid',
        borderColor: '#034078',
        borderRadius: 0,
        color: '#0A1128',
        _focus: {
          borderColor: '#001F54',
          boxShadow: '0px 1px 0px 0px #001F54'
        },
        fontFamily: `'Unna', serif`,
        fontSize: '20px'
      }
    }),
  }
})

export const globalTheme = extendTheme({
  components: {
    Heading: headingTheme,
    Button: buttonTheme,
    Input: inputTheme,
  },
  fonts: {
    heading: "'Unna', serif"
  }
})