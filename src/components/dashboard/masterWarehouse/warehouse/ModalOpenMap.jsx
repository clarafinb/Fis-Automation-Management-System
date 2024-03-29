import React from 'react';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CRow,
    CCol,
} from '@coreui/react'
import MapComponent from '../../../custom/map/MapLeaflef'
import ButtonCancel from 'src/components/custom/button/ButtonCancel';

function ModalOpenMap({ open, setOpen, data, key = Date.now(), title }) {
    const mapCenter = [data?.latitude, data?.longitude]

    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen}
        >
            <CModalHeader>
                <CModalTitle>{data?.whName ? 'Warehouse - ' : 'Current Location -'} {title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <MapComponent latlong={mapCenter} id={key} isWh={data?.whName ? true : false} />
            </CModalBody>
            <CModalFooter>
                < CRow >
                    <CCol className="d-none d-md-block text-end py-3">
                        <ButtonCancel
                            label='CLOSE'
                            handleButton={() => setOpen(false)}
                        />
                    </CCol>
                </CRow>
            </CModalFooter>
        </CModal>
    )
}


export default ModalOpenMap
