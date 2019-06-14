import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Lato|Open+Sans|Oswald&display=swap');
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    background-color: #eee;
  }
  p {
    font-family: 'Helvetica Neue', Lato,Arial,Helvetica,sans-serif;, sans-serif;
    line-height: 1.5
  }

`

export default GlobalStyle
