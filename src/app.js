import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Pages from './pages';
import { cache } from './appState';
import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
// check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: true,
});
// write the cache data after cache is reset
// client.onResetStore(() => cache.writeData({ data }));

// theme settings
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Pages />
      </ThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
