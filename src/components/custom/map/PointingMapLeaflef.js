import React, {useEffect, useRef} from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents    } from 'react-leaflet';

const MapComponent = ({ latlong, handleMapClick }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(latlong, mapRef.current.getZoom());
    }
  }, [latlong]);

  const handleClick = (event) => {
    const { latlng } = event;
    handleMapClick(latlng);
  };

  return (
    <MapContainer
      center={latlong}
      zoom={15}
      style={{ height: '330px', width: '100%' }}
      zoomControl={false}
      whenCreated={(map) => {
        mapRef.current = map;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={latlong} />
      <MapClickHandler onClick={handleClick} />
    </MapContainer>
  );
};

const MapClickHandler = ({ onClick }) => {
  const map = useMapEvents({
    click: (event) => {
      onClick(event);
    },
  });

  return null;
};

export default MapComponent;