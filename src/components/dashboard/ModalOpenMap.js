import React, { useEffect, useState } from 'react';
import { useRedux } from 'src/utils/hooks'
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import MapComponent from '../custom/map/MapLeaflef'

function ModalOpenMap({ open, setOpen, data, key }) {

    const mapCenter = [data?.detail?.latitude, data?.detail?.longitude]

    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen}
        >
            <CModalHeader>
                <CModalTitle>Map {data?.detail?.whName}</CModalTitle>
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
