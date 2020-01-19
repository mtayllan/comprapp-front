import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserTable from '../../components/User/Table';
import UserForm from '../../components/User/Form';
import AddBtn from '../../components/Buttons/AddBtn';

const UsersQuery = loader('./UsersQuery.gql');
const CreateUserMutation = loader('./CreateUserMutation.gql');

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3) },
  actions: {
    textAlign: 'right',
    marginBottom: theme.spacing(3),
  },
}));

export default () => {
  // apollo gql
  const { loading: loadingQuery, error, data } = useQuery(UsersQuery);
  const [createUser, { loading: creating, data: createData }] = useMutation(CreateUserMutation, {
    update(cache, { data: result }) {
      if (result.createUser.errors === null) {
        cache.writeQuery({
          query: UsersQuery,
          data: { users: data.users.concat(result.createUser.user) },
        });
      }
    },
  });

  // form control
  const [openForm, setOpenForm] = useState(false);
  const handleCreateUser = (user) => {
    createUser({ variables: { ...user } });
  };

  const close = useCallback(() => { setOpenForm(false); }, [setOpenForm]);

  const classes = useStyles();

  if (loadingQuery) return 'Carregando...';
  if (error) return `Erro: ${error}`;

  return (
    <div className={classes.root}>
      <Grid container justify="flex-end" className={classes.actions}>
        <Grid item xs={12} sm={8} md={6}>
          <AddBtn onClick={() => setOpenForm(true)} text="Adicionar Usuário" />
          <UserForm
            isOpen={openForm}
            close={close}
            loading={creating}
            submit={handleCreateUser}
            errors={(createData && createData.createUser.errors)}
          />
        </Grid>
      </Grid>
      <UserTable data={data.users} />
    </div>
  );
};
