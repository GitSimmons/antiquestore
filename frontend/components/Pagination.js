import React from "react";
import { Pagination } from "semantic-ui-react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../lib/config";
import Router, { withRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;
const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const PaginationComponent = ({ page, refetch, router }) => {
  const pageChangeHandler = async (e, data) => {
    await Router.push({
      pathname: "/",
      query: { page: data.activePage },
    });
    refetch();
  };
  return (
    <StyledPagination>
      <Query query={PAGINATION_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          const { count } = data.itemsConnection.aggregate;
          if (count <= perPage) {
            return null;
          }
          const pages = Math.ceil(count / perPage);
          return (
            <>
              <Head>
                <title>
                  Aunt Sadie's Antiques - Page {page} of {pages}
                </title>
              </Head>
              <Pagination
                activePage={page}
                totalPages={pages}
                onPageChange={pageChangeHandler}
              />
            </>
          );
        }}
      </Query>
    </StyledPagination>
  );
};

export default withRouter(PaginationComponent);
