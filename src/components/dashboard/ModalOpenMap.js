import React from 'react'
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
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

function ModalOpenMap({ open, setOpen, data }) {
    const { Global, Dashboard } = useRedux()

    const mapCenter = [-6.188316027806538, 106.87392816931737];

    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Map {data?.detail?.whName}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {open && (
                    <MapComponent />
                )}
                
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalOpenMap;
