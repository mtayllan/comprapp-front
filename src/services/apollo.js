// client
import { ApolloClient } from 'apollo-client';
// cache
import { InMemoryCache } from 'apollo-cache-inmemory';
// links
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';

// others
import {
  getAuthHeader, setAuthHeader, authHasChanged,
} from '../utils/storage';

const createCache = () => {
  const cache = new InMemoryCache();
  if (process.env.NODE_ENV === 'development') {
    window.secretVariableToStoreCache = cache;
  }
  return cache;
};

const setTokenForOperation = async (operation) => operation.setContext({
  headers: {
    ...getAuthHeader(),
  },
});

// link with token
const createLinkWithToken = () => new ApolloLink(
  (operation, forward) => new Observable((observer) => {
    let handle;
    Promise.resolve(operation)
      .then(setTokenForOperation)
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));
    return () => {
      if (handle) handle.unsubscribe();
    };
  }),
);

const logError = (error) => console.error(error);
// create error link
const createErrorLink = () => onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    logError({
      type: 'GraphQL - Error',
      errors: graphQLErrors,
      operationName: operation.operationName,
      variables: operation.variables,
    });
  }
  if (networkError) {
    logError('GraphQL - NetworkError', networkError);
  }
});

const createHttpLink = () => new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const afterwareLink = () => new ApolloLink(
  (operation, forward) => forward(operation).map((response) => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    // console works only this way
    // console.log(context.response.headers.get('access-token'));

    if (headers) {
      const accessToken = headers.get('access-token');

      if (authHasChanged(accessToken)) {
        const client = headers.get('client');
        const uid = headers.get('uid');
        setAuthHeader({ accessToken, client, uid });
      }
    }
    return response;
  }),
);


export const normalClient = new ApolloClient({
  link: ApolloLink.from([
    createErrorLink(),
    createLinkWithToken(),
    afterwareLink(),
    createHttpLink(),
  ]),
  cache: createCache(),
});

// for authentication
const createAuthHttpLink = () => new HttpLink({
  uri: 'http://localhost:4000/graphql_auth',
});

export const authClient = new ApolloClient({
  link: ApolloLink.from([
    createErrorLink(),
    afterwareLink(),
    createAuthHttpLink(),
  ]),
  cache: createCache(),
});
