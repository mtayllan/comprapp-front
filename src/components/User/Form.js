import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import PropTypes from 'prop-types';

export default function Form(props) {
  const {
    isOpen, close, submit, errors, loading, user,
  } = props;
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');

  const handleSubmit = () => {
    submit({
      email, name, password, role,
    });
  };

  const clearForm = () => { setEmail(''); setName(''); setPassword(''); setRole('customer'); setShowError(false); };

  // clear form when close
  useEffect(() => {
    if (!isOpen) {
      clearForm();
    }
  }, [isOpen]);

  // close when save with sucess
  useEffect(() => {
    if (errors == null && !loading) {
      close();
    }
  }, [loading, close, errors]);

  useEffect(() => {
    setShowError(Boolean(errors));
  }, [errors]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setRole(user.customer);
    }
  }, [user]);

  return (
    <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Formulário de Usuário</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Preencha as informações abaixo para criar um novo usuário.
        </DialogContentText>
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Senha"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Nome"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl component="fieldset">
          <RadioGroup onChange={(e) => setRole(e.target.value)}>
            <FormControlLabel value="customer" control={<Radio />} label="Cliente" />
            <FormControlLabel value="admin" control={<Radio />} label="Administrador" />
          </RadioGroup>
        </FormControl>
        {showError && errors && errors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Ops, ocorreu um problema.</AlertTitle>
            {errors.map((err, i) => (
              <div key={i.toString()}>
                {`- ${err}`}
                <br />
              </div>
            ))}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Form.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  errors: PropTypes.array,
  user: PropTypes.object,
};

Form.defaultProps = { errors: null, user: null };
