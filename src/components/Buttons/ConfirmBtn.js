import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

export default function ConfirmBtn(props) {
  const [open, setOpen] = useState(false);
  const {
    confirm, message, title, children,
  } = props;

  const handleConfirm = () => {
    setOpen(false);
    confirm();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>{children}</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ConfirmBtn.propTypes = {
  confirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ConfirmBtn.defaultProps = {
  title: 'Confirmação',
  message: 'Tem certeza?',
};
