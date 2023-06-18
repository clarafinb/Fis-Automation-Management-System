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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

function ModalMasterWerehouse({ 
    open, 
    setOpen, 
    data,
    handleViewModal
}) {
    return (
        <CModal
            // size="xl"
            visible={open}
            onClose={() => setOpen(false)}
            alignment='center'
        >
            <CModalHeader>
                <CModalTitle>Master Warehouse</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {/* <CFormLabel className="col-sm-2 col-form-label">Project Id : {data.projectId}</CFormLabel> */}
                <CRow>
                    <CCol sm={3}>
                        <CCard className='text-center border-default border-top-default border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Master Warehouse per Project"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilHouse} className="text-default" size="3xl" onClick={() => { handleViewModal("warehouse",data.projectId) }} />
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
                                    <CIcon icon={cilNewspaper} className="text-default" size="3xl" onClick={() => { handleViewModal("projectSc",data.projectId) }} />
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
                                    <CIcon icon={cilNotes} className="text-default" size="3xl" onClick={() => { handleViewModal("sku",data.projectId) }} />
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
