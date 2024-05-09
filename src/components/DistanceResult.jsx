import React from 'react';
import { Typography } from '@material-ui/core';

const DistanceResult = ({ distance }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>Distance: {distance} km</Typography>
    </div>
  );
};

export default DistanceResult;