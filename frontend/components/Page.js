import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import Meta from './Meta'
import Header from './Header'

const theme = {
  blue: '#34b8e4',
  maxWidth: '1000px',
  white: '#eeeeee',
  grey: '#eeeeee'
}

const StyledPage = styled.div`

`
const Inner = styled.div`
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth};
`

class Page extends Component {
  render () {
    return (
      <React.Fragment>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <StyledPage>
            <Meta />
            <Header />
            <Inner>
              {this.props.children}
            </Inner>
          </StyledPage>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default Page
