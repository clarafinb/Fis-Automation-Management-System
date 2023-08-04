import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

const MapComponent = ({ latlong, id }) => {

  const iconPerson = new L.Icon({
    iconUrl: 'icon/maps-icon-2.svg',
    iconRetinaUrl: 'icon/maps-icon-2.svg',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
  });

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
      <Marker
        position={latlong}
        icon={iconPerson} />
    </MapContainer>
  )
};

export default MapComponent;