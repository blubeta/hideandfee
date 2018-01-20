import React from 'react';
import TextField from 'material-ui/TextField';

const StyledInput = ({ onChange, label }) => (
  <TextField
    className="text-field"
    floatingLabelText={ label }
    onChange={ onChange }
  />
)

export default StyledInput;