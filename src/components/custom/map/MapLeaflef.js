import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const MapComponent = () => {
  const mapCenter = [-6.188316027806538, 106.87397108465868];

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={mapCenter} />
    </MapContainer>
  );
};

export default MapComponent;
