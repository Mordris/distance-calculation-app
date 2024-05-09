import React from 'react';
import { Button, styled } from '@material-ui/core';

const StyledButton = styled(Button)({
  marginBottom: '1rem',
  backgroundColor: '#4caf50', // Green color
  color: 'white',
  '&:hover': {
    backgroundColor: '#388e3c', // Darker green color on hover
  },
});

const CalculateButton = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>Calculate Distance</StyledButton>
  );
}

export default CalculateButton;
