import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

const MapComponent = ({ latlong, id, isWh = true }) => {

  const iconMarkup = renderToStaticMarkup(<i className=" fa fa-truck fa-3x" />);
  const customMarkerIcon = divIcon({
    html: iconMarkup,
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
      {isWh ?
        <Marker
          position={latlong} />
        :
        <Marker
          position={latlong}
          icon={customMarkerIcon} />
      }

    </MapContainer>
  )
};

export default MapComponent;