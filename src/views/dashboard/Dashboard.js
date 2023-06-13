import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useCookies } from 'react-cookie'
import { useNavigate} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardTitle,
  CCardText,
  CCardFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilSettings,
  cilSend,
  cilApplications
} from '@coreui/icons'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import ModalCreateProject from 'src/components/dashboard/ModalCreateProject'
import ModalMasterWerehouse from 'src/components/dashboard/ModalMasterWerehouse'
import ModalSettingManagement from 'src/components/dashboard/ModalSettingManagement'
import * as actions from '../../config/redux/Dashboard/actions'


const Dashboard = () => {
  const { dispatch, Global, Dashboard } = useRedux()
  const [cookies, setCookie] = useCookies(["user"]);
  const nav = useNavigate();

  const [modalCreate, setModalCreate] = useState(false)
  const [masterWerehouse, setMasterWerehouse] = useState({})
  const [modalMasterWerehouse, setModalMasterWerehouse] = useState(false)
  const [modalSetManagement, setModalSetManagement] = useState(false)

  const handleModalCreate = () => {
    setModalCreate(true)
  }

  const handleModalMasterWerehouse = (projectId) => {
    setMasterWerehouse((prev) => ({
      ...prev,
      projectId: projectId
    }));
    setModalMasterWerehouse(true)
  }

  const handleModalSetting = () => {
    setModalSetManagement(true)
  }

  const handleSend = (val) => {
    dispatch(actions.setPublishedProject(val))
  }

  const handleChecked = useCallback( 
    (val,projectId) => {
      dispatch(actions.setStatusActiveProject(val,projectId))
    }, [dispatch]
  )

  const handleViewService = () => {
    nav("/dashboard/setting-management/service-charge")
  }

  const handleViewDelivery = () => {
    nav("/dashboard/setting-management/delivery")
  }

  const handleViewTransport = () => {
    nav("/dashboard/setting-management/transport")
  }

  useEffect(() => {
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
              <h4 className="card-title mb-0">
                Project
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
                <CIcon icon={cilApplications} className="me-2 float-end textBlue" size="xl" onClick={() => handleModalSetting()}/>
            </CCol>
          </CRow>
          <br />
          <CRow>
            <CCol className="d-none d-md-block">
              <CButton className="float-end colorBtn-yellow" onClick={handleModalCreate}>
                <CIcon icon={cilPlus} className="me-2"/>
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
                          {val.publishStatus === "notPublished" && (
                            <CIcon icon={cilSend} className="me-2" size="xl" onClick={() => handleSend(val.projectId)}/>
                          )}
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

      <ModalCreateProject open={modalCreate} setOpen={setModalCreate} />
      <ModalMasterWerehouse open={modalMasterWerehouse} setOpen={setModalMasterWerehouse} data={masterWerehouse}/>
      <ModalSettingManagement 
        open={modalSetManagement} 
        setOpen={setModalSetManagement} 
        handleViewService={handleViewService}
        handleViewDelivery={handleViewDelivery} 
        handleViewTransport={handleViewTransport}
      />
    </>
  )
}

export default Dashboard
