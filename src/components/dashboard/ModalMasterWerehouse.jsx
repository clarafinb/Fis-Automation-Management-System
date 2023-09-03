import React from 'react'

import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CRow,
    CCol,
    CCard,
    CCardBody
} from '@coreui/react'

function ModalMasterWerehouse({
    open,
    setOpen,
    data,
    handleViewModal
}) {
    return (
        <CModal
            // size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            alignment='center'
        >
            <CModalHeader>
                <CModalTitle>PROJECT CONFIGURATION</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("warehouse", data.projectId) }}>
                            <CCardBody>
                                <img src={'icon/MASTER-WAREHOUSE-ICON.svg'} />
                                <p>Master Warehouse</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("projectSc", data.projectId) }}>
                            <CCardBody>
                                <img src={'icon/SERVICE-CHARGE-ICON.png'} />
                                <p>Service Charge List</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("sku", data.projectId, data.projectName) }}>
                            <CCardBody>
                                <img src={'icon/DELIVERY-MODE-ICON.png'} />
                                <p>Master SKU</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("projectMember", data.projectId) }}>
                            <CCardBody>
                                <img src={'icon/CUSTOMER-ICON.png'} />
                                <p>Project Member</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("evidenceChecklistProject", data.projectId) }}>
                            <CCardBody>
                                <img src={'icon/EVIDENCE-SERVICE-ICON.svg'} />
                                <p>Evidence Checklist</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("masterMrs", data.projectId) }}>
                            <CCardBody>
                                <img src={'icon/EVIDENCE-SERVICE-ICON.svg'} />
                                <p>Master MRS</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CModalBody>
        </CModal>
    )
}

export default ModalMasterWerehouse;
