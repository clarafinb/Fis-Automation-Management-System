import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate } from 'react-router-dom'
import {
    CButton,
    CCol,
    CRow,
    CFormSelect,
    CCard,
    CCardBody,
    CCardText,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane
} from '@coreui/react'
import { useCookies } from "react-cookie";
import * as actions from '../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilList, cilNotes, cilPlus } from '@coreui/icons'
import ModalProjectList from 'src/components/dashboardOpsLead/ModalProjectList';
import ChartDetailWarehouse from 'src/components/dashboardOpsLead/ChartDetailWarehouse';
import ModalCreateOrderRequest from 'src/components/dashboardOpsLead/orderRequest/ModalCreateOrderRequest';

function Dashboard() {
    const [cookies, setCookie] = useCookies(["dashboardOpsLead"]);
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [detailProject, setDetailProject] = useState([])
    const [detailWarehouses, setDetailWarehouses] = useState([])
    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [values, setValues] = useState({})
    const [activeKey, setActiveKey] = useState(1)
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
                dispatch(actions.setProject({ projectId: val })) //set redux
                getSummaryProject(val) //val: projectId
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

    const handleNavigator = (type, { projectId, whId, whCode }) => {
        const navigate = [
            {
                type: 'orderRequest',
                url: `/dashboard-ops-lead/order-request/${projectId}/${whId}`
            },
            {
                type: 'pickAndPackPending',
                url: `/dashboard-ops-lead/pick-pack/${projectId}/${whId}`
            },
            {
                type: 'pickAndPackProgress',
                url: `/dashboard-ops-lead/pick-pack/progress/${projectId}/${whId}`
            },
            {
                type: 'waitingDispatch',
                url: '/dashboard-ops-lead/waiting-dispatch/' + projectId
            },
            {
                type: 'deliveryTransit',
                url: '/dashboard-ops-lead/delivery-transit/' + projectId
            },
            {
                type: 'deliveryComplete',
                url: '/dashboard-ops-lead/delivery-complete/' + projectId
            },
            {
                type: 'masterLocation',
                url: '/dashboard-ops-lead/master-location/' + projectId
            },
            {
                type: 'manageInventory',
                url: `/dashboard-ops-lead/manage-inventory/${whId}/${whCode}`
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
                                        <CButton
                                            onClick={() => handleNavigator("masterLocation", detailWarehouse)}
                                            className="float-end colorBtn-white me-2">
                                            <CIcon
                                                icon={cilList}
                                                className="me-2 text-warning" />
                                            Master Location
                                        </CButton>
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
                                    <CNav variant="tabs">
                                        <CNavItem>
                                            <CNavLink
                                                active={activeKey === 1}
                                                onClick={() => setActiveKey(1)}
                                            >
                                                Delivery Request
                                            </CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink
                                                active={activeKey === 2}
                                                onClick={() => setActiveKey(2)}
                                            >
                                                Pickup Request
                                            </CNavLink>
                                        </CNavItem>
                                    </CNav>
                                </CRow>
                                <CRow className='m-3'>
                                    <CCol sm={8}>
                                        <CTabContent>
                                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                                <CRow>
                                                    <CCol sm={4}>
                                                        <CCard className='mb-3' >
                                                            <CCardBody>
                                                                <CCardText className='px-3 text-center'>
                                                                    <p>ORDER REQUEST DELIVERY</p>
                                                                    <hr />
                                                                    <h3>{detailWarehouse?.totalOrderReqDelivery}</h3>
                                                                </CCardText>
                                                                <CRow>
                                                                    <CCol className="d-grid gap-2">
                                                                        <CButton
                                                                            className="colorBtn-yellow"
                                                                            onClick={() => handleNavigator("orderRequest", detailWarehouse)}
                                                                        >
                                                                            DETAIL
                                                                        </CButton>

                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                    <CCol sm={4}>
                                                        <CCard className='mb-3' >
                                                            <CCardBody>
                                                                <CCardText className='px-3 text-center'>
                                                                    <p>PICK & PACK PENDING</p>
                                                                    <hr />
                                                                    <h3>{detailWarehouse?.pickandpackpendingCount}</h3>
                                                                </CCardText>
                                                                <CRow>
                                                                    <CCol className="d-grid gap-2">
                                                                        <CButton
                                                                            className="colorBtn-yellow"
                                                                            onClick={() => handleNavigator("pickAndPackPending", detailWarehouse)}
                                                                        >
                                                                            DETAIL
                                                                        </CButton>

                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                    <CCol sm={4}>
                                                        <CCard className='mb-3' >
                                                            <CCardBody>
                                                                <CCardText className='px-3 text-center'>
                                                                    <p>PICK & PACK ON PROGRESS</p>
                                                                    <hr />
                                                                    <h3>{detailWarehouse?.pickandpackOnProgressCount}</h3>
                                                                </CCardText>
                                                                <CRow>
                                                                    <CCol className="d-grid gap-2">
                                                                        <CButton
                                                                            className="colorBtn-yellow"
                                                                            onClick={() => handleNavigator("pickAndPackProgress", detailWarehouse)}
                                                                        >
                                                                            DETAIL
                                                                        </CButton>

                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol sm={4}>
                                                        <CCard className='mb-3'>
                                                            <CCardBody>
                                                                <CCardText className='px-3 text-center'>
                                                                    <p>WAITING DISPATCH</p>
                                                                    <hr />
                                                                    <h3>{detailWarehouse?.waitingDispatchCount}</h3>
                                                                </CCardText>
                                                                <CRow>
                                                                    <CCol className="d-grid gap-2">
                                                                        <CButton
                                                                            className="colorBtn-yellow"
                                                                            onClick={() => handleNavigator("waitingDispatch", detailWarehouse)}
                                                                        >
                                                                            DETAIL
                                                                        </CButton>

                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                    <CCol sm={4}>
                                                        <CCard className='mb-3' >
                                                            <CCardBody>
                                                                <CCardText className='px-3 text-center'>
                                                                    <p>DELIVERY IN TRANSIT</p>
                                                                    <hr />
                                                                    <h3>{detailWarehouse?.deliveryInTransitCount}</h3>
                                                                </CCardText>
                                                                <CRow>
                                                                    <CCol className="d-grid gap-2">
                                                                        <CButton
                                                                            className="colorBtn-yellow"
                                                                            onClick={() => handleNavigator("deliveryTransit", detailWarehouse)}
                                                                        >
                                                                            DETAIL
                                                                        </CButton>

                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                    <CCol sm={4}>
                                                        <CCard className='mb-3' >
                                                            <CCardBody>
                                                                <CCardText className='px-3 text-center'>
                                                                    <p>DELIVERY COMPLETED</p>
                                                                    <hr />
                                                                    <h3>{detailWarehouse?.deliveryCompleteCount}</h3>
                                                                </CCardText>
                                                                <CRow>
                                                                    <CCol className="d-grid gap-2">
                                                                        <CButton
                                                                            className="colorBtn-yellow"
                                                                            onClick={() => handleNavigator("deliveryComplete", detailWarehouse)}
                                                                        >
                                                                            DETAIL
                                                                        </CButton>

                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                </CRow>
                                            </CTabPane>
                                            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                                                {/* <h6>Pickup Request</h6> */}
                                                <CRow>
                                                    <CCol>
                                                        <CCard className='mb-3' >
                                                            <CCardBody>
                                                                <CCardText className='px-3 text-center'>
                                                                    <p>ORDER REQUEST PICKUP</p>
                                                                    <hr />
                                                                    <h3>{detailWarehouse?.totalOrderReqPickup}</h3>
                                                                </CCardText>
                                                                <CRow>
                                                                    <CCol className="d-grid gap-2">
                                                                        <CButton
                                                                            className="colorBtn-yellow"
                                                                        // onClick={() => handleNavigator("orderRequest", detailWarehouse)}
                                                                        >
                                                                            DETAIL
                                                                        </CButton>

                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                    <CCol>
                                                        <CCard className='mb-3' >
                                                            <CCardBody>
                                                                <CCardText className='px-3 text-center'>
                                                                    <p>WAITING PICKUP</p>
                                                                    <hr />
                                                                    <h3>{detailWarehouse?.waitingPickupCount}</h3>
                                                                </CCardText>
                                                                <CRow>
                                                                    <CCol className="d-grid gap-2">
                                                                        <CButton
                                                                            className="colorBtn-yellow"
                                                                        // onClick={() => handleNavigator("orderRequest", detailWarehouse)}
                                                                        >
                                                                            DETAIL
                                                                        </CButton>

                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol>
                                                        <CCard className='mb-3' >
                                                            <CCardBody>
                                                                <CCardText className='px-3 text-center'>
                                                                    <p>PICKUP IN TRANSIT</p>
                                                                    <hr />
                                                                    <h3>{detailWarehouse?.pickupInTransitCount}</h3>
                                                                </CCardText>
                                                                <CRow>
                                                                    <CCol className="d-grid gap-2">
                                                                        <CButton
                                                                            className="colorBtn-yellow"
                                                                        // onClick={() => handleNavigator("orderRequest", detailWarehouse)}
                                                                        >
                                                                            DETAIL
                                                                        </CButton>

                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                    <CCol>
                                                        <CCard className='mb-3' >
                                                            <CCardBody>
                                                                <CCardText className='px-3 text-center'>
                                                                    <p>HO COMPLETED</p>
                                                                    <hr />
                                                                    <h3>{detailWarehouse?.hoCompleteCount}</h3>
                                                                </CCardText>
                                                                <CRow>
                                                                    <CCol className="d-grid gap-2">
                                                                        <CButton
                                                                            className="colorBtn-yellow"
                                                                        // onClick={() => handleNavigator("orderRequest", detailWarehouse)}
                                                                        >
                                                                            DETAIL
                                                                        </CButton>

                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                </CRow>
                                            </CTabPane>
                                        </CTabContent>
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
