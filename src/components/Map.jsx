import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { Typography } from '@material-ui/core';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet';

const Map = ({ startPoint, endPoint, trigger }) => {
  const mapRef = useRef();
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    if (mapRef.current && startPoint && endPoint) {
      const parsedStartPoint = startPoint.map(parseFloat); // Parse to floats
      const parsedEndPoint = endPoint.map(parseFloat); // Parse to floats

      const midPoint = calculateMidPoint(parsedStartPoint, parsedEndPoint);
      setCenter(midPoint);
      mapRef.current.leafletElement.setView(midPoint, 13); // Set map view to midpoint
    }
  }, [startPoint, endPoint, trigger]);

  const startIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const endIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const calculateMidPoint = (startPoint, endPoint) => {
    const midLat = (startPoint[0] + endPoint[0]) / 2;
    const midLng = (startPoint[1] + endPoint[1]) / 2;
    return [midLat, midLng];
  };

  return (
    <MapContainer
      style={{ height: '60vh', width: '100%' }}
      center={center} // Set the center to the state variable
      zoom={13}
      whenCreated={(map) => (mapRef.current = map)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
      {startPoint && <Marker position={startPoint} icon={startIcon} />}
      {endPoint && <Marker position={endPoint} icon={endIcon} />}
      {startPoint && endPoint && (
        <Polyline positions={[startPoint, endPoint]} color="blue" />
      )}
    </MapContainer>
  );
};

function LocationMarker() {
  const map = useMap();
  
  useEffect(() => {
    map.locate();
    map.on('locationfound', (e) => {
      map.setView(e.latlng, map.getZoom()); // Center map to user's location
    });
  }, [map]);

  return null;
}

export default Map;
