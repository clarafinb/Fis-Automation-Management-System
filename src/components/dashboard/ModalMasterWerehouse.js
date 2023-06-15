import React from 'react'

import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CTooltip,
} from '@coreui/react'
import {
    cilHouse,
    cilNewspaper,
    cilNotes
} from '@coreui/icons'
import CIcon from '@coreui/icons-react';

function ModalMasterWerehouse({ open, setOpen, handleViewWarehouse, handleViewServiceCharge, handleViewSku, data }) {
    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Master Warehouse</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {/* <CFormLabel className="col-sm-2 col-form-label">Project Id : {data.projectId}</CFormLabel> */}
                <CRow className='m-5'>
                    <CCol sm={3}>
                        <CCard className='text-center border-default border-top-default border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Master Warehouse per Project"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilHouse} className="m-5 textGray" size="7xl" onClick={() => { handleViewWarehouse(data.projectId) }} />
                                </CTooltip>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center border-default border-top-default border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Service Charge"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilNewspaper} className="m-5 textGray" size="7xl" onClick={() => { handleViewServiceCharge(data.projectId) }} />
                                </CTooltip>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center border-default border-top-default border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Master SKU"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilNotes} className="m-5 textGray" size="7xl" onClick={() => { handleViewSku(data.projectId) }} />
                                </CTooltip>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalMasterWerehouse;
