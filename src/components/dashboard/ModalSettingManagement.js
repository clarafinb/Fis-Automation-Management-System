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
    CTooltip
} from '@coreui/react'
import {
    cilDescription,
    cilTruck,
    cilGarage,
    cilEqualizer,
    cilAirplaneMode,
    cilUser,
    cilUserFollow
} from '@coreui/icons'
import CIcon from '@coreui/icons-react';

function ModalSettingManagement({
    open,
    setOpen,
    handleViewModal
}) {

    return (
        <CModal
            // size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            alignment='center'
            style={{ minWidth: "600px" }}
        >
            <CModalHeader>
                <CModalTitle>SETTINGS MANAGEMENT</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("accountManagement") }}>
                            <CCardBody>
                                <img src={'icon/ACCOUNT-MANAGEMENT-ICON.png'} />
                                <p>Account Management</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("smDelivery") }}>
                            <CCardBody>
                                <img src={'icon/DELIVERY-MODE-ICON.png'} />
                                <p>Delivery Mode</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("smTransport") }}>
                            <CCardBody>
                                <img src={'icon/TRANSPORT-MODE-ICON.png'} />
                                <p>Transport Mode</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("smTransportType") }}>
                            <CCardBody>
                                <img src={'icon/TRANSPORT-TYPE-ICON.png'} />
                                <p>Transport Type</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("uom") }}>
                            <CCardBody>
                                <img src={'icon/UOM-ICON.png'} />
                                <p>Unit Of Measurement</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("customer") }}>
                            <CCardBody>
                                <img src={'icon/CUSTOMER-ICON.png'} />
                                <p>Customer</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("sc") }}>
                            <CCardBody>
                                <img src={'icon/SERVICE-CHARGE-ICON.png'} />
                                <p>Service Charge List</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center no-background' onClick={() => { handleViewModal("subDistrict") }}>
                            <CCardBody>
                                <img src={'icon/SERVICE-CHARGE-ICON.png'} />
                                <p>Sub District Management</p>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CModalBody>
            {/* <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
            </CModalFooter> */}
        </CModal>
    )
}

export default ModalSettingManagement;
