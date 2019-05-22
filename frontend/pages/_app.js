import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import App, { Container } from 'next/app'
import Page from '../components/Page'
import withApollo from '../lib/withApollo'

class myApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    pageProps.query = ctx.query
    // this exposes the query to the user
    return { pageProps }
  }
  render () {
    const { Component, apolloClient, pageProps } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider client={apolloClient}>

            <Page>
              <Component {...pageProps} />
            </Page>
          </ApolloHooksProvider>

        </ApolloProvider>
      </Container>
    )
  }
}
export default withApollo(myApp)
