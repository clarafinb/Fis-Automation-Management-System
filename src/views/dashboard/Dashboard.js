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
    (val, projectId) => {
      dispatch(actions.setStatusActiveProject(val, projectId))
    }, [dispatch]
  )

  const handleOpenModal = (type,id) => {

    const navigate =[
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
    ]

    let url = navigate.find(e => e.type === type)

    if(url){
      nav(url.url)
    }
  }

  useEffect(() => {
    if (Global?.user?.token) {
      dispatch(actions.getListProject())
    }
  }, [Global?.user]);

  useEffect(() => {
    if (!cookies?.user) {
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
              <CIcon icon={cilApplications} className="me-2 float-end textBlue" size="xl" onClick={() => handleModalSetting()} />
            </CCol>
          </CRow>
          <br />
          <CRow>
            <CCol className="d-none d-md-block">
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
                  textColor="white"
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
                          {(val.publishStatus === "notPublished" && val.activeStatus != "inactive") && (
                            <CIcon icon={cilSend} className="me-2" size="xl" onClick={() => handleSend(val.projectId)} />
                          )}
                        </div>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>

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
