import React from 'react'

import {
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
} from '@coreui/react'
import TableListItemInventory from './TableListItemInventory'

function ModalListItem({ open, setOpen, data, custOrderRequest }) {

    return (
        <CModal
            size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            alignment='center'
        >
            <CModalHeader>
                <CModalTitle>ITEM LIST {custOrderRequest}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol className="d-none d-md-block text-end">
                        <TableListItemInventory data={data} />
                    </CCol>
                </CRow>
            </CModalBody>
        </CModal>
    )
}

export default ModalListItem;
