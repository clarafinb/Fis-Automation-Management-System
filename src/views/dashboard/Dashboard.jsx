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
  CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilSettings,
  cilSend,
  cilList,
} from '@coreui/icons'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import ModalCreateProject from 'src/components/dashboard/ModalCreateProject'
import ModalMasterWerehouse from 'src/components/dashboard/ModalMasterWerehouse'
import ModalSettingManagement from 'src/components/dashboard/ModalSettingManagement'
import * as actions from '../../config/redux/Dashboard/actions'
import debounce from "lodash.debounce"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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

  // useEffect(() => {
  //   if (Global?.user?.token) {
  //     dispatch(actions.getListProject())
  //   }
  // }, [Global?.user]);

  const handleModalCreate = () => {
    setModalCreate(true)
  }

  const handleModalMasterWerehouse = (projectId) => {
    const result = Dashboard?.listProject?.find(row => row.projectId === projectId)
    setMasterWerehouse(result)
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
      console.log('projectId : ', projectId)
      dispatch(actions.setStatusActiveProject(val, projectId))
    }, [dispatch]
  )

  const handleOnchange = debounce(
    (e) => {
      const { value } = e.target;
      setFilteredProject(Dashboard?.listProject)

      if (value?.length > 2) {
        setSearchProject(value.toLowerCase())
      }
    },
    searchProject ? 500 : 0
  )

  const handleOpenModal = (type, id, projectName = "") => {

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
        type: 'evidenceChecklistProject',
        url: '/setting-project/evidence-checklist-project/' + id
      },
      {
        type: 'sku',
        url: '/dashboard/sku/' + id + '/' + encodeURIComponent(projectName)
      },
      {
        type: 'projectMember',
        url: '/dashboard/project-member/' + id
      },
      {
        type: 'accountManagement',
        url: '/dashboard/setting-management/account-management'
      },
      {
        type: 'subDistrict',
        url: '/dashboard/setting-management/sub-district'
      },
      {
        type: 'warehouseType',
        url: '/dashboard/setting-management/warehouse-type'
      },
      {
        type: 'evidenceChecklist',
        url: '/setting-management/evidence-checklist'
      },
      {
        type: 'assetTruck',
        url: '/setting-management/asset-truck'
      },
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
    if (Dashboard?.detailDashboard?.dashboardURL) {
      dispatch(actions.getListProject())
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
    } else {
      setFilteredProject(Dashboard?.listProject)
    }
  }, [searchProject, Dashboard?.listProject]);

  return (
    <>
      <CContainer>
        <CRow>
          <CCol sm={5}>
            <h4 className="card-title mb-0">
              <span className='text-underline'>PR</span>OJECT
            </h4>
          </CCol>
        </CRow>
        <br />
        <CRow>
          <CCol sm={8}>
            <CInputGroup className="mb-3">
              <CFormInput type="text" name="search" placeholder="Project Name" onChange={handleOnchange} />
              <CButton type="button" className='colorBtnIcon-white'>
                <FontAwesomeIcon icon={faSearch} size='sm' />
              </CButton>
            </CInputGroup>
          </CCol>
          <CCol className="d-none d-md-block">
            <CButton className="float-end colorBtn-white ms-3" onClick={handleModalSetting}>
              <CIcon icon={cilList} className="me-2 text-warning" />
              SETTINGS
            </CButton>
            <CButton className="float-end colorBtn-white" onClick={handleModalCreate}>
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
                          className={val.activeStatus === "active" && val.publishStatus === "notPublished"
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
                    <p>Process Group : {val?.logProcessName}</p>
                    <p>Description : {val?.projectDesc}</p>
                  </CCardText>
                  <hr />
                  <CRow>
                    <CCol sm={5}>
                      <ToggleSwitch
                        checked={val.activeStatus === "active" ? true : false}
                        size="lg"
                        handleChecked={handleChecked}
                        data={val.projectId}
                      />
                    </CCol>
                    <CCol sm={7} className="d-none d-md-block">
                      <div className='text-end'>
                        {
                          val.activeStatus === 'active' ?
                            <CIcon icon={cilSettings} className="me-2" size="xl" onClick={() => handleModalMasterWerehouse(val.projectId)} />
                            : ''
                        }
                        {val.publishStatus !== 'published' && val.activeStatus === 'active' ?
                          <CIcon icon={cilSend} className="me-2 rotate-icon" size="xl" onClick={() => handleSend(val.projectId)} />
                          : ''
                        }
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CContainer>

      <ModalCreateProject
        open={modalCreate}
        setOpen={setModalCreate}
      />

      <ModalMasterWerehouse
        open={modalMasterWerehouse}
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
