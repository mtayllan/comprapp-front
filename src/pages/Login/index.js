import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import validate from 'validate.js';
import {
  Grid,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useStyles } from './styles-jss';
import { authClient } from '../../services/apollo';
import { isAuthenticated } from '../../utils/storage';


const AdminLoginMutation = loader('./AdminLoginMutation.gql');

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'é obrigatório' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'é obrigatório' },
    length: {
      maximum: 128,
    },
  },
};

const SignIn = () => {
  const [adminLogin, { data }] = useMutation(AdminLoginMutation, {
    client: authClient,
    onError: ({ graphQLErrors }) => graphQLErrors.forEach((error) => toast.error(error.message)),
  });

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    const { values: { email, password } } = formState;
    adminLogin({ variables: { email, password } });
  };

  const hasError = (field) => (!!(formState.touched[field] && formState.errors[field]));

  if (data || isAuthenticated()) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        justify="center"
        container
      >
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Acessar o sistema
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Senha"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Entrar
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
