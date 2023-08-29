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
import { cilList, cilNotes, cilPlus } from '@coreui/icons'
import ModalProjectList from 'src/components/dashboardOpsLead/ModalProjectList';
import ChartDetailWarehouse from 'src/components/dashboardOpsLead/ChartDetailWarehouse';
import ModalCreateOrderRequest from 'src/components/dashboardOpsLead/orderRequest/ModalCreateOrderRequest';
import Delivery from 'src/components/dashboardOpsLead/Delivery';
import PickUp from 'src/components/dashboardOpsLead/PickUp';

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

                if(!Dashboard?.activeMenu){
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
                url:  `/waiting-transport-assignment/${projectId}/${whId}`
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
                <CCol sm={2} className="d-grid gap-2" >
                    <CButton
                        className="float-end btn colorBtn-white px-1 ms-2"
                        onClick={handleOpenProjectList}
                    >
                        <CIcon
                            icon={cilNotes}
                            className="me-2 text-warning" />
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
                detailWarehouses.length > 0 && detailWarehouses?.map((detailWarehouse) => {
                    return (
                        <>
                            <CCard key={detailWarehouse?.whId}>
                                <CRow className='m-3'>
                                    <CCol sm={6}>
                                        <h5>
                                            <img src={'icon/icon_project.png'} alt="icon_project" className='px-2' />{detailWarehouse?.projectName} <span className='px-3'>|</span>
                                            <img src={'icon/icon_warehouse.png'} alt="icon_warehouse" className='px-2' /> {detailWarehouse?.whName} <span className='px-3'>|</span>
                                            <img src={'icon/icon_code.png'} alt="icon_code" className='px-2' /> {detailWarehouse?.whCode}
                                        </h5>
                                    </CCol>
                                    <CCol className="d-none d-md-block" sm={6}>
                                        {/* <CButton
                                            onClick={() => handleNavigator("masterLocation", detailWarehouse)}
                                            className="float-end colorBtn-white me-2">
                                            <CIcon
                                                icon={cilList}
                                                className="me-2 text-warning" />
                                            Master Location
                                        </CButton> */}
                                        <CButton
                                            className="float-end colorBtn-white me-2"
                                            onClick={() => handleNavigator("manageInventory", detailWarehouse)}>
                                            <CIcon
                                                icon={cilList}
                                                className="me-2 text-warning" />
                                            Manage Inventory
                                        </CButton>
                                        <CButton
                                            onClick={() => handleCreateOrderRequest(detailWarehouse)}
                                            className="float-end colorBtn-white me-2">
                                            <CIcon icon={cilPlus} className="me-2 text-warning" />
                                            ADD ORDER REQUEST
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CCard>
                            <br />
                            <CCard>
                                <CRow className='m-3'>
                                    <CCol sm={5}>
                                        {Dashboard?.activeMenu === 'dashboardopsleaddelivery' && DashboardOpsLead?.project?.projectId
                                            ? <h5 className="card-title mb-0">
                                                <span className='text-underline'>DE</span>LIVERY
                                            </h5>
                                            : <h5 className="card-title mb-0">
                                                <span className='text-underline'>PI</span>CKUP
                                            </h5>
                                        }
                                    </CCol>
                                </CRow>
                                <CRow className='m-3'>
                                    <CCol sm={8}>
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
                                    </CCol>
                                    <CCol sm={4}>
                                        <CCard>
                                            <div className='m-2'>
                                                <ChartDetailWarehouse data={detailWarehouse} />
                                            </div>
                                        </CCard>
                                    </CCol>
                                </CRow>
                            </CCard>
                            <br />
                        </>
                    )
                })
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
