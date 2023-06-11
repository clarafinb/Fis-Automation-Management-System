import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from '../../utils/hooks'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardTitle,
  CCardText,
  CCardFooter,
  CFormInput,
  CFormLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilSettings,
  cilSend
} from '@coreui/icons'
import { useNavigate} from 'react-router-dom'
import * as actions from '../../config/redux/Dashboard/actions'
import ToggleSwitch from '../../components/custom/toggle/ToggleSwitch';
import { useCookies } from "react-cookie";


const Dashboard = () => {
  const { dispatch, Global, Dashboard } = useRedux()
  const [cookies, setCookie] = useCookies(["user"]);
  const nav = useNavigate();
  const [modalCreate, setModalCreate] = useState(false)
  const [modalMasterWerehouse, setModalMasterWerehouse] = useState(false)

  const [values, setValues] = useState({})
  const [masterWerehouse, setMasterWerehouse] = useState({})

  const handleCreateProject = () => {

    let payload = {
      mProjectName: values.projectName,
      mProjectDesc: values.description,
      mProjectCode: values.projectCode,
      LMBY : Global?.user?.roleInf?.lmby
    }

    dispatch(actions.createProject(payload))
  }

  const handleModalCreate = () => {
    setValues({})

    setModalCreate(true)
  }

  const handleModalMasterWerehouse = (projectId) => {
    setMasterWerehouse((prev) => ({
      ...prev,
      projectId: projectId
    }));
    setModalMasterWerehouse(true)
  }

  const handleSend = (val) => {
    dispatch(actions.setPublished(val))
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

  const handleChecked = useCallback( 
    (val,projectId) => {
      if(val){
        dispatch(actions.setActive(projectId))
      }else{
        dispatch(actions.setUnActive(projectId))
      }
        
    }, [dispatch]
  )

  useEffect(() => {
    console.log(Global)
    if(Global?.user?.token){
      dispatch(actions.getListProject())
    }
	}, [Global?.user]);

  useEffect(() => {
		if(!cookies?.user){
      nav("/login")
    }
	}, []);

  return (
    <>
      <CCard className="">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Project
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton className="float-end colorBtn-yellow" onClick={handleModalCreate}>
                <CIcon icon={cilPlus} className="me-2" />
                Add Project
              </CButton>
            </CCol>
          </CRow>
          <br />
          <CRow>
            {Dashboard?.listProject.map((val, index) => (
                <CCol sm={3} key={index}>
                <CCard
                  textColor= "white"
                  className={`mb-3 ${val.activeStatus === "active" && val.publishStatus === "notPublished" 
                    ? "bgCustom-blue" 
                    : (val.activeStatus === "active" && val.publishStatus === "published" 
                        ? "bg-success" 
                        : "bg-secondary")
                  }`}
                >
                  <CCardBody>
                    <CCardTitle>{val?.projectName}</CCardTitle>
                    {/* <CIcon icon={cilUser} className="me-2" /> */}
                    <CCardText>
                      {val?.projectDesc}
                    </CCardText>
                    
                  </CCardBody>
                  <CCardFooter>
                  <CRow>
                      <CCol sm={5}>
                        <ToggleSwitch 
                          checked={() => val.activeStatus === "active" ? true : false} 
                          size="lg" 
                          handleChecked = {handleChecked} 
                          projectId={val.projectId}
                        />
                      </CCol>
                      <CCol sm={7} className="d-none d-md-block">
                        <div className='text-end'>
                          <CIcon icon={cilSettings} className="me-2" size="xl" onClick={() => handleModalMasterWerehouse(val.projectId)}/>
                          <CIcon icon={cilSend} className="me-2" size="xl" onClick={() => handleSend(val.projectId)}/>
                        </div>
                      </CCol>
                    </CRow>
                  </CCardFooter>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
      
      <CModal
        size="xl"
        visible={modalCreate}
        // alignment="center"
        onClose={() => setModalCreate(false)}
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
          <CButton onClick={() => setModalCreate(false)} color="secondary">Close</CButton>
          <CButton color="primary" onClick={handleCreateProject}>Add</CButton>
        </CModalFooter>
      </CModal>

      <CModal
        size="xl"
        visible={modalMasterWerehouse}
        // alignment="center"
        onClose={() => setModalMasterWerehouse(false)}
      >
        <CModalHeader>
          <CModalTitle>Master Werehouse</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormLabel className="col-sm-2 col-form-label">Project Id : {masterWerehouse.projectId}</CFormLabel>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setModalMasterWerehouse(false)} color="secondary">Close</CButton>
          <CButton color="primary" onClick={handleCreateProject}>Add</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Dashboard
