import React  from 'react'

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
    cilUser
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
        >
            <CModalHeader>
                <CModalTitle>Settings Management</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol sm={3}>
                        <CCard className='text-center border-default border-top-default border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Service Charge List"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilDescription} className="text-default" size="3xl" onClick={() => {handleViewModal("sc")}}/>
                                </CTooltip>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center border-default border-top-default border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Delivery Mode"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilTruck} className="text-default" size="3xl" onClick={() => {handleViewModal("smDelivery")}}/>
                                </CTooltip>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center border-default border-top-default border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Transport Mode"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilGarage} className="text-default" size="3xl" onClick={() => {handleViewModal("smTransport")}}/>
                                </CTooltip>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center border-default border-top-default border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Transport Type"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilAirplaneMode} className="text-default" size="3xl" onClick={() => {handleViewModal("smTransportType")}}/>
                                </CTooltip>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol sm={3}>
                        <CCard className='text-center border-default border-top-default border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Unit of Measurement"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilEqualizer} className="text-default" size="3xl" onClick={() => {handleViewModal("uom")}}/>
                                </CTooltip>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={3}>
                        <CCard className='text-center border-default border-top-default border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Customer"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilUser} className="text-default" size="3xl" onClick={() => {handleViewModal("customer")}}/>
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

export default ModalSettingManagement;
