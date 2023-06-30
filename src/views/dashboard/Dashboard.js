import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardTitle,
  CCardText,
  CFormInput,
  CContainer,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilSettings,
  cilSend,
  cilApplications,
  cilList,
} from '@coreui/icons'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import ModalCreateProject from 'src/components/dashboard/ModalCreateProject'
import ModalMasterWerehouse from 'src/components/dashboard/ModalMasterWerehouse'
import ModalSettingManagement from 'src/components/dashboard/ModalSettingManagement'
import * as actions from '../../config/redux/Dashboard/actions'
import debounce from "lodash.debounce"
import DashboardOpsLead from 'src/components/dashboard/DashboardOpsLead'

const Dashboard = () => {
  const { dispatch, Global, Dashboard } = useRedux()
  const [cookies, setCookie] = useCookies(["user"]);
  const nav = useNavigate();

  const [modalCreate, setModalCreate] = useState(false)
  const [masterWerehouse, setMasterWerehouse] = useState({})
  const [modalMasterWerehouse, setModalMasterWerehouse] = useState(false)
  const [modalSetManagement, setModalSetManagement] = useState(false)
  const [searchProject, setSearchProject] = useState("")
  const [filteredListProject, setFilteredProject] = useState([])

  /*
  const manipulateData = (cb) => {
    try{
      const prev = { ...Dashboard }
      const newData = cb(prev)

      dispatch(
        actions.setDashboard({
            ...prev,
            ...newData
        })
      )
    }catch (error){
      console.log(error)
    }
  }
  */

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
    (val, projectId) => {
      dispatch(actions.setStatusActiveProject(val, projectId))
    }, [dispatch]
  )

  const handleOnchange = debounce(
    (e) => {
      const { value } = e.target;
      setFilteredProject(Dashboard?.listProject)

      if(value?.length > 2){
        setSearchProject(value.toLowerCase())
      }
    },
    searchProject ? 500 : 0
  )

  const handleOpenModal = (type, id) => {

    const navigate = [
      {
        type: 'sc',
        url: '/dashboard/setting-management/service-charge'
      },
      {
        type: 'smDelivery',
        url: '/dashboard/setting-management/delivery'
      },
      {
        type: 'smTransport',
        url: '/dashboard/setting-management/transport'
      },
      {
        type: 'smTransportType',
        url: '/dashboard/setting-management/transport-type'
      },
      {
        type: 'uom',
        url: '/dashboard/setting-management/uom'
      },
      {
        type: 'customer',
        url: '/dashboard/setting-management/customer'
      },
      {
        type: 'warehouse',
        url: '/dashboard/warehouse/' + id
      },
      {
        type: 'projectSc',
        url: '/dashboard/project-service-charge/' + id
      },
      {
        type: 'sku',
        url: '/dashboard/sku/' + id
      },
      {
        type: 'projectMember',
        url: '/dashboard/project-member/' + id
      },
      {
        type:'accountManagement',
        url:'/dashboard/setting-management/account-management'
      }
    ]

    let url = navigate.find(e => e.type === type)

    if (url) {
      nav(url.url)
    }
  }

  useEffect(() => {
    if (Global?.user?.token) {
      dispatch(actions.getDashboard(Global?.user?.roleInf?.roleId))
    }
  }, [Global?.user]);

  useEffect(() => {
    if(Dashboard?.detailDashboard?.dashboardURL){
      if(Dashboard?.detailDashboard?.dashboardURL === '/usr/dashboardOpsLead'){
        dispatch(actions.getListProjectByUser(Global?.user?.userID))
      }else{
        dispatch(actions.getListProject())
      }
    }
  }, [Dashboard?.detailDashboard?.dashboardURL])

  useEffect(() => {
    if (!cookies?.user) {
      nav("/login")
    }
  }, []);

  useEffect(() => {
    if (searchProject) {
      let temp = Dashboard?.listProject.filter(row => row.projectName.toLowerCase().includes(searchProject))
      
      setFilteredProject(temp)
      /*
        manipulateData((prev) => {
          prev.listProject = temp
          return prev
        })
      */
    }else{
      setFilteredProject(Dashboard?.listProject)
    }
  }, [searchProject,Dashboard?.listProject]);

  return (
    <>
      <CContainer>
      {!['/usr/dashboardOpsLead'].includes(Dashboard?.detailDashboard?.dashboardURL) 
          ? (
            <>
              <CRow>
                <CCol sm={5}>
                  <h4 className="card-title mb-0">
                    <span className='text-underline'>PR</span>OJECT
                  </h4>
                </CCol>
                {/* <CCol sm={7} className="d-none d-md-block">
                  <CIcon icon={cilApplications} className="me-2 float-end textBlue" size="xl" onClick={() => handleModalSetting()} />
                </CCol> */}
              </CRow>
              <br />
              <CRow>
                <CCol sm={9}>
                  <CFormInput type="text" name="search" placeholder="Project Name" onChange={handleOnchange} />
                </CCol>
                <CCol className="d-none d-md-block">
                  <CButton className="float-end colorBtn-white px-1" onClick={handleModalSetting}>
                    <CIcon icon={cilList} className="me-2 text-warning" />
                    SETTINGS
                  </CButton>
                  <CButton className="float-end colorBtn-white px-1" onClick={handleModalCreate}>
                    <CIcon icon={cilPlus} className="me-2 text-warning" />
                  ADD PROJECT
                  </CButton>
                </CCol>
              </CRow>
              <br />
              <CRow>
                {filteredListProject?.map((val, index) => (
                  <CCol sm={4} key={index}>
                    <CCard className='mb-3' >
                      <CCardBody>
                        <CCardTitle>
                          <CRow>
                            <CCol>
                              {val?.projectName}
                            </CCol>
                            <CCol className='text-end'>
                              <CBadge 
                                className= {val.activeStatus === "active" && val.publishStatus === "notPublished"
                                          ? "badge-info"
                                          : (val.activeStatus === "active" && val.publishStatus === "published"
                                            ? "badge-success"
                                            : "badge-secondary")
                                        }
                                size='sm'
                              >
                                {val.activeStatus === "active" && val.publishStatus === "notPublished"
                                  ? "ACTIVE"
                                  : (val.activeStatus === "active" && val.publishStatus === "published"
                                    ? "PUBLISHED"
                                    : "INACTIVE")
                                }
                              </CBadge>
                            </CCol>
                          </CRow>
                        </CCardTitle>
                        <hr />
                        <CCardText className='px-3'>
                          {val?.projectDesc}
                        </CCardText>
                        <hr />
                        <CRow>
                          <CCol sm={5}>
                            <ToggleSwitch
                              checked={() => val.activeStatus === "active" ? true : false}
                              size="lg"
                              handleChecked={handleChecked}
                              id={val.projectId}
                            />
                          </CCol>
                          <CCol sm={7} className="d-none d-md-block">
                            <div className='text-end'>
                              <CIcon icon={cilSettings} className="me-2" size="xl" onClick={() => handleModalMasterWerehouse(val.projectId)} />
                              <CIcon icon={cilSend} className="me-2" size="xl" onClick={() => handleSend(val.projectId)} />
                            </div>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CRow>
            </>
          ) : (
            <>
              {filteredListProject?.map((val, index) => (
                <DashboardOpsLead projectId={val.projectId} key={index}/>
              ))}
            </>
          )
        }
      </CContainer>

      <ModalCreateProject open={modalCreate} setOpen={setModalCreate} />
      <ModalMasterWerehouse open={modalMasterWerehouse}
        setOpen={setModalMasterWerehouse}
        data={masterWerehouse}
        handleViewModal={handleOpenModal}
      />
      <ModalSettingManagement
        open={modalSetManagement}
        setOpen={setModalSetManagement}
        handleViewModal={handleOpenModal}
      />
    </>
  )
}

export default Dashboard
