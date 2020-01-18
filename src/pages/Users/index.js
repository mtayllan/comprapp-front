import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import UserTable from '../../components/User/Table';

const UsersQuery = loader('./UsersQuery.gql');


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  actions: {
    textAlign: 'right',
    marginBottom: theme.spacing(3),
  },
}));

export default () => {
  const { loading, error, data } = useQuery(UsersQuery);
  const classes = useStyles();

  if (loading) return 'Loading...';
  if (error) return `Erro: ${error}`;

  return (
    <div className={classes.root}>
      <Grid container justify="flex-end" className={classes.actions}>
        <Grid item xs={12} sm={8} md={6}>
          <Button
            color="primary"
            variant="contained"
          >
            Adicionar Usuário
          </Button>
        </Grid>
      </Grid>
      <UserTable data={data.users} />
    </div>
  );
};
