import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export default function AddBtn({ onClick, text }) {
  return (
    <Button
      color="primary"
      variant="contained"
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

AddBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
