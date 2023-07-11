import { createGlobalStyle } from 'styled-components'
import { globalBackground } from '../themes/scheme'

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after {
    margin: 0;
    padding: 0;
    border: none;
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
  }
  body {
    width: 100%;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    text-rendering: optimizeLegibility;
    font-family: 'Poppins', sans-serif;
    background: ${globalBackground};

    &::-webkit-scrollbar {
      width: 0;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: transparent;
    }
  }
`
