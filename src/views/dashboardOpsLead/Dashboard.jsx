import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate } from 'react-router-dom'
import {
    CButton,
    CCol,
    CRow,
    CFormSelect,
    CCard,
    CBadge,
} from '@coreui/react'
import { useCookies } from "react-cookie";
import * as actions from '../../config/redux/DashboardOpsLead/actions'
import * as actions_dashbboard from '../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilEqualizer, cilNotes } from '@coreui/icons'
import ModalProjectList from 'src/components/dashboardOpsLead/ModalProjectList';
import ModalCreateOrderRequest from 'src/components/dashboardOpsLead/orderRequest/ModalCreateOrderRequest';
import Delivery from 'src/components/dashboardOpsLead/Delivery';
import PickUp from 'src/components/dashboardOpsLead/PickUp';
import PageNoneSelectedProject from './PageNoneSelectedProject';
import HeaderProject from './HeaderProject';
import { manipulateDataTableDashboard } from '../../helper/dashboardHelper';
import ChartDelivery from 'src/components/dashboardOpsLead/ChartDelivery';
import ChartPickUp from 'src/components/dashboardOpsLead/ChartPickUp';

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
    const [listTableDashboard, setListTableDashboard] = useState([])
    const nav = useNavigate()

    const getSummaryProject = (projectId) => {

        let type = cookies?.activeMenu || Dashboard?.activeMenu
        dispatch(
            actions.getActivitySummaryWHProject(Global?.user?.userID, projectId, type)
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
        if (detailWarehouses?.length > 0) {
            let listTable = []
            listTable = manipulateDataTableDashboard(detailWarehouses)

            setListTableDashboard(listTable)
        }
    }, [detailWarehouses])

    useEffect(() => {
        if (!cookies?.user) {
            nav("/login")
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

                if (!Dashboard?.activeMenu) {
                    setCookie('activeMenu', 'dashboardopsleaddelivery', { path: '/' })
                    dispatch(actions_dashbboard.actionSetReduxActiveMenu("dashboardopsleaddelivery"))
                } else {
                    getSummaryProject(val)
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

            if (values?.whId != '0') {
                console.log(values)
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
            },
            {
                type: 'waitingTransportConfirm',
                url: `/waiting-transport-confirm/${projectId}/${whId}`
            },
            {
                type: 'pickupInTransit',
                url: `/pickup-transit/${projectId}/${whId}`
            },
            {
                type: 'pickupOnsite',
                url: `/pickup-onsite/${projectId}/${whId}`
            },
            {
                type: 'hoComplete',
                url: `/ho-complete/${projectId}/${whId}`
            },
            {
                type: 'backToPool',
                url: `/back-to-pool/${projectId}/${whId}`
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

    useEffect(() => {
        if (cookies?.dashboardOpsLead && Global?.user?.userID && cookies?.activeMenu) {
            let param = {
                projectId: cookies?.dashboardOpsLead?.projectId,
                whId: cookies?.dashboardOpsLead?.whId || 0
            }

            dispatch(actions.setProject(param))

            getSummaryProject(cookies?.dashboardOpsLead?.projectId)
        }
    }, [Dashboard?.activeMenu]);

    const handleCreateFinalCost = (type = 'confirm', detailWarehouse = {}) => {
        setSelectedDetailWarehouse(detailWarehouse)
        if (type === 'confirm') {
            const url = (`/final-confirm/${detailWarehouse.projectId}/${detailWarehouse.whId}`)
            nav(url, { replace: true })
        }

        if (type === 'complete') {
            const url = (`/final-complete/${detailWarehouse.projectId}/${detailWarehouse.whId}`)
            nav(url, { replace: true })
        }
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
                listTableDashboard.length > 0 ? listTableDashboard?.map((listData, index) => {
                    return (
                        <>
                            <CRow>
                                <CCol sm={9}>
                                    <CCard>
                                        <div className='m-3'>
                                            <CRow>
                                                <CCol sm={6}>
                                                    <HeaderProject data={listData} />
                                                </CCol>
                                                <CCol className="d-none d-md-block p-2" sm={6}>
                                                    <CButton
                                                        className="float-end colorBtnIcon-blue me-2"
                                                        onClick={() => handleNavigator("manageInventory", listData)}>
                                                        <CIcon
                                                            icon={cilEqualizer}
                                                            className="me-2 textWhite rotate-icon90"
                                                        />
                                                        MANAGE INVENTORY
                                                    </CButton>
                                                    <CButton
                                                        onClick={() => handleCreateOrderRequest(listData)}
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
                                                        data={listData?.delivery}
                                                        handleNavigator={handleNavigator}
                                                    />
                                                    : <PickUp
                                                        data={listData?.pickUp}
                                                        handleNavigator={handleNavigator}
                                                    />
                                                }
                                            </CRow>
                                        </div>
                                    </CCard>
                                </CCol>
                                <CCol sm={3}>
                                    {Dashboard?.activeMenu === 'dashboardopsleaddelivery' && DashboardOpsLead?.project?.projectId
                                        ? <CCard className='card-dashboard mb-3'>
                                            <div className='m-3'>
                                                <ChartDelivery data={detailWarehouses[index]} />
                                            </div>
                                        </CCard>
                                        : <CCard className='card-dashboard mb-3'>
                                            <div className='m-3'>
                                                <ChartPickUp data={detailWarehouses[index]} />
                                            </div>
                                        </CCard>
                                    }
                                    <CCard className='card-dashboard'>
                                        <div className='m-3'>
                                            <div className="d-grid gap-2 col-12 mx-auto">
                                                <CButton
                                                    width={100}
                                                    onClick={() => handleCreateFinalCost('confirm', listData)}
                                                    className="colorBtnIcon-maroon me-2 mb-2 text-start"
                                                    shape="rounded-0"
                                                    title='Final Cost Transport Waiting Confirmation'
                                                    style={{ textAlign: 'left' }}
                                                >
                                                    Final Cost Transport Waiting Confirmation &nbsp;
                                                    <CBadge
                                                        color="secondary"
                                                        className="ms-auto"
                                                        shape="rounded-1"
                                                        style={{ textAlign: 'left' }}
                                                    >
                                                        {detailWarehouses[index]?.totalFinalCostWaitingConfirmCount || 0}
                                                    </CBadge>
                                                </CButton>
                                            </div>

                                            <div className="d-grid gap-2 col-12 mx-auto">
                                                <CButton
                                                    width={100}
                                                    onClick={() => handleCreateFinalCost('complete', listData)}
                                                    className="colorBtnIcon-blue me-2 mb-2 text-start"
                                                    title='Final Cost Transport Completed'
                                                    shape="rounded-0"
                                                >
                                                    Final Cost Transport Completed &nbsp;
                                                    <CBadge
                                                        color="secondary"
                                                        className="ms-auto"
                                                        shape="rounded-1"
                                                    >
                                                        {detailWarehouses[index]?.totalFinalCostConfirmedCount || 0}
                                                    </CBadge>
                                                </CButton>
                                            </div>
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
                getSummaryProject={getSummaryProject}
            />
        </>
    )
}

export default Dashboard;
