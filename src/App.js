import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Routes from './routes';
import { normalClient } from './services/apollo';

function App() {
  return (
    <ApolloProvider client={normalClient}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
