import React from 'react'
import { Pagination } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { perPage } from '../lib/config'
import Router, { withRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'

const PAGINATION_QUERY = gql`
query PaginationQuery {
  itemsConnection {
    aggregate {
      count
    }
  }
}
`
const StyledPagination = styled.div`
display:flex;
justify-content: center;
padding: 1rem;
`

const PaginationComponent = (props) => {
  const { router } = props
  router.prefetch({
    pathname: '/',
    query: { page: props.page - 1 }
  })
  router.prefetch({
    pathname: '/',
    query: { page: props.page + 1 }
  })
  const pageChangeHandler = (e, data) => Router.push({
    pathname: '/',
    query: { page: data.activePage }
  })
  return (
    <StyledPagination>
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
    </StyledPagination>
  )
}

export default withRouter(PaginationComponent)
