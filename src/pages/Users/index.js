import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import UserTable from '../../components/User/Table';

const UsersQuery = loader('./UsersQuery.gql');

export default () => {
  const { loading, error, data } = useQuery(UsersQuery);
  console.log({ loading, error, data });

  if (loading) return 'Loading...';
  if (error) return `Erro: ${error}`;

  console.log({ data });
  return (<UserTable data={data.users} />);
};
