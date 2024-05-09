import React, { useState } from 'react';
import Map from './components/Map';
import AddressInput from './components/AddressInput';
import CalculateButton from './components/CalculateButton';
import DistanceResult from './components/DistanceResult';
import GeocodingService from './services/GeocodingService';
import DistanceCalculator from './utils/DistanceCalculator';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appContainer: {
    margin: '0 auto',
    padding: theme.spacing(2),
    maxWidth: '90%', // Set app width to 60% of device width
    width: '100%', // Ensure full width within the container
  },
}));

const App = () => {
  const classes = useStyles();
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [distance, setDistance] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [error, setError] = useState('');

  const calculateDistance = async () => {
    if (!startAddress || !endAddress) {
      setError('Please enter both start and end addresses.');
      return;
    }

    const startData = await GeocodingService(startAddress);
    const endData = await GeocodingService(endAddress);

    if (startData && endData) {
      const { lat: startLat, lon: startLon } = startData[0];
      const { lat: endLat, lon: endLon } = endData[0];
      const calculatedDistance = DistanceCalculator(
        startLat,
        startLon,
        endLat,
        endLon
      );
      setDistance(calculatedDistance.toFixed(2));
      setStartPoint([startLat, startLon]);
      setEndPoint([endLat, endLon]);
      setError('');
    } else {
      setError('Error fetching geocoding data.');
      setDistance(null);
      setStartPoint(null);
      setEndPoint(null);
    }
  };

  return (
    <div className={classes.appContainer}>
      <Typography variant="h3" gutterBottom>
        Distance Calculator
      </Typography>
      <AddressInput
        label="Start Address"
        value={startAddress}
        onChange={setStartAddress}
      />
      <AddressInput
        label="End Address"
        value={endAddress}
        onChange={setEndAddress}
      />
      <CalculateButton onClick={calculateDistance} />
      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      {distance && <DistanceResult distance={distance} />}
      <Map startPoint={startPoint} endPoint={endPoint} />
    </div>
  );
};

export default App;
