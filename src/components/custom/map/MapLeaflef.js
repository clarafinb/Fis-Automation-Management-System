import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const MapComponent = ({latlong, id}) => {
    
  return (
    <MapContainer
      key={id}
      center={latlong}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={latlong} />
    </MapContainer>
  )
};

export default MapComponent;