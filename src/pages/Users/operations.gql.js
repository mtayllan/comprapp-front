import gql from 'graphql-tag';

export const GET_USERS = gql`
  query UsersQuery {
    users {
      id
      name
      email
      roles {
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!, $role: String) {
    createUser(input: {name: $name, email: $email, password: $password, role: $role}) {
      errors
      user {
        email
        id
        name
        roles {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $name: String, $email: String, $password: String, $role: String) {
    updateUser(input: {id: $id, name: $name, email: $email, password: $password, role: $role}) {
      errors
      user {
        id
        email
        name
        roles {
          id
          name
        }
      }
    }
  }
`;
