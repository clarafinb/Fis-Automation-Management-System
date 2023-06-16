import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import "leaflet/dist/leaflet.css"

const MapComponent = () => {

  const mapCenter = [-6.188316027806538, 106.87392816931737];
    
  return (
    <MapContainer
      center={[-6.188316027806538, 106.87392816931737]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[-6.188316027806538, 106.87392816931737]} />
    </MapContainer>
  )
};

export default MapComponent;