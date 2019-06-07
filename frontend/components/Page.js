import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'

const theme = {
  blue: '#34b8e4',
  maxWidth: '1000px'
}

const StyledPage = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`
const Inner = styled.div`
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth};
  flex: 1;
  min-width: 50%;
`

const Page = props =>
  <>
    <GlobalStyle />
    <Head>
      <link
        rel='stylesheet'
        href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
      />
    </Head>
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Meta />
        <Header />
        <Inner>
          {props.children}
        </Inner>
        <Footer />
      </StyledPage>
    </ThemeProvider>
  </>

export default Page
