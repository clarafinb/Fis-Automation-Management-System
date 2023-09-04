import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate } from 'react-router-dom'
import {
    CButton,
    CCol,
    CRow,
    CFormSelect,
    CCard,
} from '@coreui/react'
import { useCookies } from "react-cookie";
import * as actions from '../../config/redux/DashboardOpsLead/actions'
import * as actions_dashbboard from '../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilEqualizer, cilNotes } from '@coreui/icons'
import ModalProjectList from 'src/components/dashboardOpsLead/ModalProjectList';
import ChartDetailWarehouse from 'src/components/dashboardOpsLead/ChartDetailWarehouse';
import ModalCreateOrderRequest from 'src/components/dashboardOpsLead/orderRequest/ModalCreateOrderRequest';
import Delivery from 'src/components/dashboardOpsLead/Delivery';
import PickUp from 'src/components/dashboardOpsLead/PickUp';
import PageNoneSelectedProject from './PageNoneSelectedProject';
import HeaderProject from './HeaderProject';

function Dashboard() {
    const [cookies, setCookie] = useCookies(["dashboardOpsLead"]);
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState([])
    const [detailWarehouses, setDetailWarehouses] = useState([])
    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [values, setValues] = useState({})
    const [modalProjectList, setModalProjectList] = useState(false)
    const [openModalOrderRequest, setOpenModalOrderRequest] = useState(false)
    const [selectedDetailWarehouse, setSelectedDetailWarehouse] = useState({})
    const nav = useNavigate()

    const getSummaryProject = (projectId) => {
        dispatch(
            actions.getActivitySummaryWHProject(Global?.user?.userID, projectId)
        ).then(result => {
            setDetailProject(result)

            let option = result.map((item, idx) => {
                return {
                    label: item.whName,
                    value: item.whId
                }
            })

            setOptionWarehouse([{ label: 'All', value: 0 }, ...option])

            setDetailWarehouses(result)
        })
    }

    useEffect(() => {
        if (!cookies?.user) {
            nav("/login")
        }

        if (cookies?.dashboardOpsLead && Global?.user?.userID) {
            let param = {
                projectId: cookies?.dashboardOpsLead?.projectId,
                whId: cookies?.dashboardOpsLead?.whId || 0
            }

            dispatch(actions.setProject(param))

            getSummaryProject(cookies?.dashboardOpsLead?.projectId)
        }
    }, [Global?.user])

    useEffect(() => {
        if (DashboardOpsLead?.project?.whId) {
            setValues({
                whId: DashboardOpsLead?.project?.whId
            })
        }
    }, [DashboardOpsLead?.project])

    const handleComponent = useCallback(
        (type, val, data) => {
            if (type == 'pilih') {
                setValues({})
                setCookie('dashboardOpsLead', { projectId: val }, { path: '/' })
                dispatch(actions.setProject({ projectId: val }))
                getSummaryProject(val)

                if (!Dashboard?.activeMenu) {
                    setCookie('activeMenu', 'dashboardopsleaddelivery', { path: '/' })
                    dispatch(actions_dashbboard.actionSetReduxActiveMenu("dashboardopsleaddelivery"))
                }
                setModalProjectList(false)
            }
        }
    )

    useEffect(() => {
        if (values?.whId && detailProject) {
            let param = {
                projectId: DashboardOpsLead?.project?.projectId,
                whId: values?.whId
            }
            setCookie('dashboardOpsLead', param, { path: '/' })
            dispatch(actions.setProject(param))

            if (values?.whId != 'All') {
                let arr = []
                let temp = detailProject.find(e => e.whId == values.whId)
                arr.push(temp)
                setDetailWarehouses(arr)
            } else {
                setDetailWarehouses(detailProject)
            }
        }
    }, [values?.whId, detailProject]);

    const handleNavigator = (type, { projectId, whId, whCode, whName }) => {
        const navigate = [
            {
                type: 'orderRequest',
                url: `/order-request/${projectId}/${whId}`
            },
            {
                type: 'pickAndPackPending',
                url: `/pick-pack-pending/${projectId}/${whId}`
            },
            {
                type: 'pickAndPackProgress',
                url: `/pick-pack-progress/${projectId}/${whId}`
            },
            {
                type: 'waitingDispatch',
                url: `/waiting-dispatch/${projectId}/${whId}`
            },
            {
                type: 'deliveryTransit',
                url: `/delivery-transit/${projectId}/${whId}`
            },
            {
                type: 'deliveryOnSite',
                url: `/delivery-onsite/${projectId}/${whId}`
            },
            {
                type: 'deliveryComplete',
                url: `/delivery-complete/${projectId}/${whId}`
            },
            {
                type: 'masterLocation',
                url: `/master-location/${projectId}/${whId}`
            },
            {
                type: 'manageInventory',
                url: `/manage-inventory/${whId}/${whCode}/${whName}`
            },
            {
                type: 'orderRequestPickup',
                url: `/order-request-pickup/${projectId}/${whId}`
            },
            {
                type: 'pickupPreparation',
                url: `/pickup-preparation/${projectId}/${whId}`
            },
            {
                type: 'waitingTransportAssignment',
                url: `/waiting-transport-assignment/${projectId}/${whId}`
            }
        ]

        let url = navigate.find(e => e.type === type)
        if (url) {
            nav(url.url, { replace: true })
        }
    }

    const handleOnchange = useCallback(
        (e) => {
            const { value, name } = e.target

            setValues((prev) => ({
                ...prev,
                [name]: value
            }));
        }, [setValues]
    )

    const handleOpenProjectList = () => {
        setModalProjectList(true)
    }

    const handleCreateOrderRequest = (detailWarehouse) => {
        setSelectedDetailWarehouse(detailWarehouse)
        setOpenModalOrderRequest(true)
    }

    return (
        <>
            <CRow>
                <CCol sm={5} >
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>DA</span>SHBOARD
                    </h4>
                </CCol>
            </CRow>
            <br />
            <CRow>
                <CCol sm={2} className="d-grid" >
                    <CButton
                        className="float-end btn colorBtn-white px-1 ms-2"
                        onClick={handleOpenProjectList}
                    >
                        <CIcon
                            icon={cilNotes}
                            className="me-2 text-warning"
                        />
                        LIST PROJECT
                    </CButton>
                </CCol>
                <CCol sm={3}>
                    <CFormSelect
                        name="whId"
                        options={optionWarehouse}
                        onChange={handleOnchange}
                        value={values?.whId || 0}
                    />
                </CCol>
            </CRow>
            <br />
            {
                detailWarehouses.length > 0 ? detailWarehouses?.map((detailWarehouse) => {
                    return (
                        <>
                            <CRow>
                                <CCol sm={9}>
                                    <CCard className='card-dashboard'>
                                        <div className='m-3'>
                                            <CRow>
                                                <CCol sm={6}>
                                                    <HeaderProject data={detailWarehouse} />
                                                </CCol>
                                                <CCol className="d-none d-md-block p-2" sm={6}>
                                                    <CButton
                                                        className="float-end colorBtnIcon-blue me-2"
                                                        onClick={() => handleNavigator("manageInventory", detailWarehouse)}>
                                                        <CIcon
                                                            icon={cilEqualizer}
                                                            className="me-2 textWhite rotate-icon90"
                                                        />
                                                        MANAGE INVENTORY
                                                    </CButton>
                                                    <CButton
                                                        onClick={() => handleCreateOrderRequest(detailWarehouse)}
                                                        className="float-end colorBtnIcon-blue me-2">
                                                        <CIcon
                                                            icon={cilEqualizer}
                                                            className="me-2 textWhite rotate-icon90"
                                                        />
                                                        ADD ORDER REQUEST
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                            <br />
                                            <CRow>
                                                {Dashboard?.activeMenu === 'dashboardopsleaddelivery' && DashboardOpsLead?.project?.projectId
                                                    ? <Delivery
                                                        detailWarehouse={detailWarehouse}
                                                        handleNavigator={handleNavigator}
                                                    />
                                                    : <PickUp
                                                        detailWarehouse={detailWarehouse}
                                                        handleNavigator={handleNavigator}
                                                    />
                                                }
                                            </CRow>
                                        </div>
                                    </CCard>
                                </CCol>
                                <CCol sm={3}>
                                    <CCard className='card-dashboard'>
                                        <div className='m-3'>
                                            <ChartDetailWarehouse data={detailWarehouse} />
                                        </div>
                                    </CCard>
                                </CCol>
                            </CRow>
                            <br />
                        </>
                    )
                })
                    : <PageNoneSelectedProject />
            }
            <ModalProjectList
                open={modalProjectList}
                setOpen={setModalProjectList}
                handleProject={handleComponent}
            />
            <ModalCreateOrderRequest
                open={openModalOrderRequest}
                setOpen={setOpenModalOrderRequest}
                projectId={selectedDetailWarehouse.projectId}
                detailProject={selectedDetailWarehouse}
            />
        </>
    )
}

export default Dashboard;
