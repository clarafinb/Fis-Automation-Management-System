import React, { useState, useEffect} from 'react'
import { useRedux } from 'src/utils/hooks'
import {
    CFormInput,
    CButton,
    CInputGroup
} from '@coreui/react'
import * as actions from '../../../config/redux/Global/actions'
import MapComponent from './PointingMapLeaflef'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const GeocodingForm = ({handleSetLongLat, isEdit, data, key}) => {
  const { dispatch } = useRedux()
  const [address, setAddress] = useState('')
  const [longLat, setLongLat] = useState()

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }

  useEffect(() => {
    if (isEdit) {
      let longLat = [data?.latitude, data?.longitude]
      setLongLat(longLat)
    }
}, [isEdit]);

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
        <CButton type="button" className='colorBtnIcon-white' onClick={handleGeocode}>
          <FontAwesomeIcon icon={faSearch}  size='sm' />
        </CButton>
      </CInputGroup>
      <div>
        {(longLat?.length > 0 || key) && 
          <MapComponent 
            latlong={longLat ? longLat : [data?.detail?.latitude, data?.detail?.longitude]} 
            handleMapClick={handleMapClick} 
          />
        }
      </div>
    </div>
  );
};

export default GeocodingForm;
