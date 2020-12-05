import React, { useState } from 'react';
import { pageState } from '../appState';
import Pagination from '@material-ui/lab/Pagination';
import { useLazyQuery } from '@apollo/client';
import { REQUESTS_FEED } from '../gql/query';
import Grid from '@material-ui/core/Grid';

export const BasicPagination = ({ totalItems, refetch }) => {
  const totalPage = Math.ceil(totalItems / 10);
  const [feed, { loading, data, error }] = useLazyQuery(REQUESTS_FEED);
  const handleChange = (event, value) => {
    pageState({
      pageNumber: value,
      orderBy: pageState().orderBy,
      orderDirection: 'desc',
    });
    refetch();
  };
  return (
    <Grid container justify="center">
      <Pagination
        size="large"
        count={totalPage}
        color="primary"
        page={pageState().pageNumber}
        onChange={handleChange}
      />
    </Grid>
  );
};

export const SearchResultPagination = ({ totalItems, queryPage }) => {
  const totalPage = Math.ceil(totalItems / 10);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    queryPage(value);
  };
  return (
    <Grid container justify="center">
      <Pagination
        count={10}
        page={page}
        color="secondary"
        size="large"
        onChange={handleChange}
      />
    </Grid>
  );
};
