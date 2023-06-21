import React, { useState } from 'react'
import { useRedux } from 'src/utils/hooks'
import {
    CFormInput,
    CButton,
    CInputGroup
} from '@coreui/react'

import * as actions from '../../../config/redux/Global/actions'
import MapComponent from './PointingMapLeaflef'

const GeocodingForm = ({handleSetLongLat}) => {
  const { dispatch, Global } = useRedux()
  const [address, setAddress] = useState('')
  const [longLat, setLongLat] = useState()

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }

  const handleGeocode = async () => {

    const data = await dispatch(actions.actionGetGeocode(address))

    if(data?.lon && data?.lat){
      handleSetLongLat(data?.lon, data?.lat)
      let longLat = [data?.lat, data?.lon]
      setLongLat(longLat)
    }
  }

  const handleMapClick = (latlng) => {
    setLongLat([latlng.lat, latlng.lng])
    handleSetLongLat(latlng.lng, latlng.lat)
  };

  return (
    <div>
      <CInputGroup className="mb-3">
        <CFormInput type="text" name="location" placeholder="Masukkan alamat" onChange={handleAddressChange}/>
        <CButton type="button" color="success" onClick={handleGeocode}>
          Generate
        </CButton>
      </CInputGroup>
      <div>
        {longLat?.length > 0 && <MapComponent latlong={longLat} handleMapClick={handleMapClick} />}
      </div>
    </div>
  );
};

export default GeocodingForm;