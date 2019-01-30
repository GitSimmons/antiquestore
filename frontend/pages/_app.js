import React from 'react'
import { ApolloProvider } from 'react-apollo'
import App, { Container } from 'next/app'
import Page from '../components/Page'
import withApollo from '../lib/withApollo'

class myApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // this exposes the query to the user
    return { pageProps }
  }
  render () {
    const { Component, apollo, pageProps } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}
export default withApollo(myApp)
