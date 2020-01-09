import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import AdminTable from '../../components/Admin/Table';

const AdminsQuery = loader('./AdminsQuery.gql');

export default () => {
  const { loading, error, data } = useQuery(AdminsQuery);
  console.log({ loading, error, data });

  if (loading) return 'Loading...';
  if (error) return `Erro: ${error}`;

  console.log({ data });
  return (<AdminTable data={data.admins} />);
};
