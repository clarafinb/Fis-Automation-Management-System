import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CFormInput,
    CButton,
    CInputGroup
} from '@coreui/react'

const GeocodingForm = ({handleSetLongLat}) => {
  const [address, setAddress] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    if (longitude && latitude) {
        handleSetLongLat(longitude, latitude)
    }
}, [longitude,latitude]);

  const handleGeocode = () => {
    axios
      .get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const { lon, lat } = response.data[0];
          setLongitude(lon);
          setLatitude(lat);
        } else {
          // Tidak ada hasil geocoding yang ditemukan
          setLongitude(null);
          setLatitude(null);
        }
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat melakukan permintaan geocoding:', error);
      });
  };

  return (
    <div>
        <CInputGroup className="mb-3">
            <CFormInput type="text" name="location" onChange={handleAddressChange} placeholder="Masukkan alamat" aria-describedby="button-addon2"/>
            <CButton type="button" color="success" variant="outline" id="button-addon2"  onClick={handleGeocode}>Generate</CButton>
        </CInputGroup>
    </div>
  );
};

export default GeocodingForm;
