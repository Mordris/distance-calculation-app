import React from 'react';
import { TextField } from '@material-ui/core';

const AddressInput = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      margin="normal"
    />
  );
};

export default AddressInput;
