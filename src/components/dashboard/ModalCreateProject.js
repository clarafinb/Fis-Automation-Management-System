import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
  CButton,
  CCol,
  CRow,
  CFormInput,
  CFormLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormTextarea
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'

function ModalCreateProject({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})

    const handleCreateProject = () => {

        let payload = {
          mProjectName: values.projectName,
          mProjectDesc: values.description,
          mProjectCode: values.projectCode,
          LMBY : Global?.user?.userID
        }
    
        dispatch(actions.createProject(payload))
    }

    const handleOnchange = useCallback( 
        (e) => {
    
          const { value, name } = e.target;
    
          setValues((prev) => ({
            ...prev,
            [name]: value
          }));
    
        }, [setValues]
      )

	return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Project Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Project Name</CFormLabel>
                    <CCol sm={10}>
                    <CFormInput type="text" name="projectName" value={values?.projectName} onChange={handleOnchange}/>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Project Code</CFormLabel>
                    <CCol sm={10}>
                    <CFormInput type="text" name="projectCode" value={values?.projectCode} onChange={handleOnchange} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Description</CFormLabel>
                    <CCol sm={10}>
                    <CFormTextarea rows={3} name="description" value={values?.description} onChange={handleOnchange}></CFormTextarea>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreateProject}>Add</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateProject;
