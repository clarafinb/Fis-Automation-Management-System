import React from 'react';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import MapComponent from '../../custom/map/MapLeaflef'

function ModalOpenMap({ open, setOpen, data, key = Date.now() }) {

    const mapCenter = [data?.latitude, data?.longitude]

    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen}
        >
            <CModalHeader>
                <CModalTitle>Map {data?.whName}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <MapComponent latlong={mapCenter} id={key} />
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
            </CModalFooter>
        </CModal>
    )
}


export default ModalOpenMap
