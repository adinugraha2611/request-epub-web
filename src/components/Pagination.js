import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { pageState } from '../appState';
import Pagination from '@material-ui/lab/Pagination';
import { useLazyQuery } from '@apollo/client';
import { REQUESTS_FEED } from '../gql/query';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  pagination: {
    marginBottom: theme.spacing(5),
  },
}));

export const BasicPagination = ({ totalItems, refetch }) => {
  const classes = useStyles();
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
    <Grid className={classes.pagination} container justify="center">
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

export const SearchResultPagination = ({
  totalItems,
  queryPage,
  keywordsChanged,
}) => {
  const classes = useStyles();
  const totalPage = Math.ceil(totalItems / 10);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    const startIndex = value * 10;
    queryPage(startIndex);
  };

  // don't show pagination if totalItems < 10
  if (totalItems < 10) return <React.Fragment></React.Fragment>;

  return (
    <Grid className={classes.pagination} container justify="center">
      <Pagination
        count={totalPage}
        boundaryCount={3}
        page={keywordsChanged ? 1 : page}
        color="secondary"
        size="large"
        onChange={handleChange}
      />
    </Grid>
  );
};
