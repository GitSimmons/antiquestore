import React from "react";
import { Pagination } from "semantic-ui-react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../lib/config";
import Router, { withRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($name: String) {
    itemsConnection(where: { collections_some: { name: $name } }) {
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

const PaginationComponent = ({ page, refetch, router, collection }) => {
  const pageChangeHandler = async (e, data) => {
    await Router.push({
      pathname: "/collection",
      query: { collection: collection, page: data.activePage },
    });
    refetch();
  };
  return (
    <StyledPagination>
      <Query query={PAGINATION_QUERY} variables={{ name: collection }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          const { count } = data.itemsConnection.aggregate;
          const pages = Math.ceil(count / perPage);
          if (count <= perPage) {
            return null;
          }
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
