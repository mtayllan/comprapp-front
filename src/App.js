import React from 'react';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import Routes from './Routes';
import { normalClient } from './services/apollo';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={normalClient}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
