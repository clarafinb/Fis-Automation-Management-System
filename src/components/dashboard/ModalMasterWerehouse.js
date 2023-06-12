import React  from 'react'

import {
  CButton,
  CFormLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

function ModalMasterWerehouse({ open, setOpen, data}) {

	return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Master Werehouse</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormLabel className="col-sm-2 col-form-label">Project Id : {data.projectId}</CFormLabel>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary">Add</CButton>
            </CModalFooter>
      </CModal>
    )
}

export default ModalMasterWerehouse;
