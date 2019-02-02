import React from 'react'
import { Pagination } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { perPage } from '../lib/config'
import Router from 'next/router'
import Head from 'next/head'

const PAGINATION_QUERY = gql`
query PaginationQuery {
  itemsConnection {
    aggregate {
      count
    }
  }
}
`
const pageChangeHandler = (e, data) => Router.push({
  pathname: '/',
  query: { page: data.activePage }
})

const PaginationComponent = (props) => (
  <>
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        const { count } = data.itemsConnection.aggregate
        const pages = Math.ceil(count / perPage)
        return (
          <>
            <Head>
              <title>Aunt Sadie's Antiques - Page {props.page} of {pages}</title>
            </Head>
            <Pagination defaultActivePage={props.page} totalPages={pages} onPageChange={pageChangeHandler} />
          </>
        )
      }}
    </Query>
  </>
)

export default PaginationComponent
