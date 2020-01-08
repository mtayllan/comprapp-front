import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { authClient } from '../../services/apollo';

const AdminLoginMutation = loader('./operations.gql');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminLogin, { data }] = useMutation(AdminLoginMutation, { client: authClient });

  const handleSubmit = (e) => {
    e.preventDefault();
    adminLogin({ variables: { email, password } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input type="submit" value="Entrar" />
      </form>
    </div>
  );
}
