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
    cilNotes,
    cilPeople
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
            size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            alignment='center'
        >
            <CModalHeader>
                <CModalTitle>MASTER WAREHOUSE</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {/* <CFormLabel className="col-sm-2 col-form-label">Project Id : {data.projectId}</CFormLabel> */}
                <CRow>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("warehouse",data.projectId) }}>
                            <CCardBody>
                                <img src={'icon/ACCOUNT-MANAGEMENT-ICON.png'} />
                                <p>Master Warehouse</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("projectSc",data.projectId) }}>
                            <CCardBody>
                                <img src={'icon/SERVICE-CHARGE-ICON.png'} />
                                <p>Service Charge List</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("sku",data.projectId) }}>
                            <CCardBody>
                                <img src={'icon/DELIVERY-MODE-ICON.png'} />
                                <p>Master SKU</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("projectMember",data.projectId) }}>
                            <CCardBody>
                                <img src={'icon/CUSTOMER-ICON.png'} />
                                <p>Project Member</p>
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
