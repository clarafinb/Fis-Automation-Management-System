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
    cilGarage
} from '@coreui/icons'
import CIcon from '@coreui/icons-react';

function ModalSettingManagement({ 
    open, 
    setOpen, 
    handleViewService,
    handleViewDelivery,
    handleViewTransport
}) {

	return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Settings Management</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className='m-5'>
                    <CCol sm={4}>
                        <CCard className='text-center border-info border-top-info border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Service Charge List"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilDescription} className="m-5 textBlue" size="7xl" onClick={handleViewService}/>
                                </CTooltip>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={4}>
                        <CCard className='text-center border-warning border-top-warning border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Delivery Mode"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilTruck} className="m-5 text-warning" size="7xl" onClick={handleViewDelivery}/>
                                </CTooltip>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={4}>
                        <CCard className='text-center border-success border-top-success border-bottom-5'>
                            <CCardBody>
                                <CTooltip
                                    content="Transport Mode"
                                    placement="bottom"
                                >
                                    <CIcon icon={cilGarage} className="m-5 text-success" size="7xl" onClick={handleViewTransport}/>
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
