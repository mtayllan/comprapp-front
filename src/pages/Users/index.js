import React, { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserTable from '../../components/User/Table';
import UserForm from '../../components/User/Form';
import AddBtn from '../../components/Buttons/AddBtn';
import { ADD_USER, GET_USERS, UPDATE_USER } from './operations.gql';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3) },
  actions: {
    textAlign: 'right',
    marginBottom: theme.spacing(3),
  },
}));

export default () => {
  // apollo gql
  const { loading: loadingQuery, error, data } = useQuery(GET_USERS);
  const [createUser, { loading: creating, data: createData }] = useMutation(ADD_USER, {
    update(cache, { data: result }) {
      if (result.createUser.errors === null) {
        cache.writeQuery({
          query: GET_USERS,
          data: { users: data.users.concat(result.createUser.user) },
        });
      }
    },
  });
  const [updateUser, { loading: updating, data: updateData }] = useMutation(UPDATE_USER, {
    update(cache, { data: result }) {
      if (result.updateUser.errors === null) {
        const updated = result.updateUser.user;
        const users = data.users.map((user) => (user.id === updated.id ? updated : user));
        cache.writeQuery({
          query: GET_USERS,
          data: { users },
        });
      }
    },
  });

  // form control
  const [openForm, setOpenForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [user, setUser] = useState(null);

  const submit = useCallback((values) => {
    if (selectedId === null) {
      createUser({ variables: values });
    } else {
      updateUser({ variables: { id: selectedId, ...values } });
    }
  }, [createUser, updateUser, selectedId]);

  const errors = (createData && createData.createUser.errors) || (updateData && updateData.updateUser.errors);
  const close = useCallback(() => { setOpenForm(false); }, [setOpenForm]);

  useEffect(() => {
    if (selectedId !== null) {
      setOpenForm(true);
      setUser(data.users.find((u) => u.id === selectedId));
    }
  }, [selectedId, data]);

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
            loading={creating || updating}
            submit={submit}
            errors={errors}
            user={user}
          />
        </Grid>
      </Grid>
      <UserTable data={data.users} edit={setSelectedId} />
    </div>
  );
};
