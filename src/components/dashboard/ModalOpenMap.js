import React from 'react'
import { useRedux } from 'src/utils/hooks'
import ReactDOMServer from 'react-dom/server'
import IFrameComponent from '../custom/map/IFrameMap'

import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'

function ModalOpenMap({ open, setOpen, data }) {
    const { Global, Dashboard } = useRedux()

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
                <IFrameComponent />
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalOpenMap;
