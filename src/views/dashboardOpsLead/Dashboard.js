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
import * as actions from '../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilList } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit';
import ModalProjectList from 'src/components/dashboardOpsLead/ModalProjectList';
import ChartDetailWarehouse from 'src/components/dashboardOpsLead/ChartDetailWarehouse';

function Dashboard() {
    const [cookies, setCookie, removeCookie] = useCookies(["dashboardOpsLead"]);
    const { dispatch, Global, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState([])
    const [detailWarehouses, setDetailWarehouses] = useState([])
    const [optionProject, setOptionProject] = useState([])
    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [values, setValues] = useState({})
    const [activeKey, setActiveKey] = useState(1)
    const [modalProjectList, setModalProjectList] = useState(false)
    const nav = useNavigate()

    const getSummaryProject = (projectId) => {
        setCookie('dashboardOpsLead', {projectId: projectId}, { path: '/' })
        dispatch(
            //get semua warehouse pada project
            actions.getActivitySummaryWHProject(Global?.user?.userID, projectId)
        ).then(result => {
            setDetailProject(result)
            let option = result.map((item, idx) => {
                return {
                    label: item.whName,
                    value: item.whId
                }
            })
            setOptionWarehouse([{label: 'All', value: 'all'}, ...option])

            if(cookies?.dashboardOpsLead?.whId && cookies?.dashboardOpsLead?.whId != 'all'){
                setValues({
                    projectId: cookies?.dashboardOpsLead?.projectId,
                    whId: cookies?.dashboardOpsLead?.whId
                })
            }else{
                setDetailWarehouses(result)
            }
        })
    }

    useEffect(() => {
        // if (Global?.user?.userID) {
        //     dispatch(actions.getListProjectByUser(Global?.user?.userID))
        // }

        if (!cookies?.user) {
            nav("/login")
        }

        if (cookies?.dashboardOpsLead && Global?.user?.userID) {
            console.log("in")
            setValues((prev) => ({
                ...prev,
                projectId: cookies?.dashboardOpsLead?.projectId,
                whId: cookies?.dashboardOpsLead?.whId
            }));

            getSummaryProject(cookies?.dashboardOpsLead?.projectId)
        }
    }, [Global?.user])

    const handleComponent = useCallback(
        (type, val, data) => {
            if(type == 'pilih'){
                setValues({}) //reset values
                removeCookie('dashboardOpsLead') //reset cookies 
                getSummaryProject(val) //val: projectId
                setModalProjectList(false)
            }
        }
    )

    // useEffect(() => {

    //     console.log("cookies", cookies)
    //     if (!cookies?.user) {
    //         nav("/login")
    //     }

    //     if (cookies?.dashboardOpsLead && Global?.user?.userID) {

    //         setValues((prev) => ({
    //             ...prev,
    //             projectId: cookies?.dashboardOpsLead?.projectId,
    //             whId: cookies?.dashboardOpsLead?.whId
    //         }));

    //         getSummaryProject(cookies?.dashboardOpsLead?.projectId)
    //     }
    // }, [Global?.user?.userID]);

    useEffect(() => {
        if (values?.whId) {
            let param = {
                projectId: cookies?.dashboardOpsLead?.projectId,
                whId: values?.whId
            }

            setCookie('dashboardOpsLead', param, { path: '/' })

            if(values?.whId != 'all'){
                let arr = []
                let temp = detailProject.find(e => e.whId == values.whId)
                arr.push(temp)
                setDetailWarehouses(arr)
            }else{
                setDetailWarehouses(detailProject)
            }
        }

    }, [values]);

    const handleNavigator = (type, id) => {
        const navigate = [
            {
                type: 'orderRequest',
                url: '/dashboard-ops-lead/order-request/' + id
            },
            {
                type: 'pickAndPackPending',
                url: '/dashboard-ops-lead/pick-pack/' + id
            },
            {
                type: 'pickAndPackProgress',
                url: '/dashboard-ops-lead/pick-pack/progress/' + id
            },
            {
                type: 'waitingDispatch',
                url: '/dashboard-ops-lead/waiting-dispatch/' + id
            },
            {
                type: 'deliveryTransit',
                url: '/dashboard-ops-lead/delivery-transit/' + id
            },
            {
                type: 'deliveryComplete',
                url: '/dashboard-ops-lead/delivery-complete/' + id
            },
            {
                type: 'masterLocation',
                url: '/dashboard-ops-lead/master-location/' + id
            }
        ]

        let url = navigate.find(e => e.type === type)
        if (url) {
            nav(url.url)
        }
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

    const handleOpenProjectList = () => {
        setModalProjectList(true)
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
                    {/* <CFormSelect
                        name="projectId"
                        options={optionProject}
                        onChange={handleOnchange}
                        defaultValue={3}
                    /> */}
                    <CButton 
                        className="float-end btn colorBtn-white px-1 ms-2"
                        onClick={handleOpenProjectList}
                        >
                        <CIcon
                            icon={cilList}
                            className="me-2 text-warning" />
                        PROJECT
                    </CButton>
                </CCol>
                <CCol sm={3}>
                    <CFormSelect
                        name="whId"
                        options={optionWarehouse}
                        onChange={handleOnchange}
                        value={cookies?.dashboardOpsLead?.whId || values?.whId}
                    />
                </CCol>
            </CRow>
            <br />
            {
                detailWarehouses.length > 0 && detailWarehouses?.map((detailWarehouse) => {
                    return (
                        <>
                            <CCard>
                                <CRow className='m-3'>
                                    <CCol sm={8}>
                                        <h5>
                                            <img src={'icon/icon_project.png'} alt="icon_project" className='px-2' />{detailWarehouse?.projectName} <span className='px-3'>|</span>
                                            <img src={'icon/icon_warehouse.png'} alt="icon_warehouse" className='px-2' /> {detailWarehouse?.whName} <span className='px-3'>|</span>
                                            <img src={'icon/icon_code.png'} alt="icon_code" className='px-2' /> {detailWarehouse?.whCode}
                                        </h5>
                                    </CCol>
                                    <CCol className="d-none d-md-block">
                                        <CButton
                                            onClick={() => handleNavigator("masterLocation", values?.projectId)}
                                            className="float-end btn colorBtn-white px-1 ms-2">
                                            <CIcon
                                                icon={cilList}
                                                className="me-2 text-warning" />
                                            Master Location
                                        </CButton>
                                        <CButton className="float-end btn colorBtn-white px-1 ms-2" >
                                            <CIcon
                                                icon={cilList}
                                                className="me-2 text-warning" />
                                            Manage Inventory
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
                                                {/* <h6><span className='text-underline'>DE</span>LIVERY REQUEST</h6> */}
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
                                                                            onClick={() => handleNavigator("orderRequest", values?.projectId)}
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
                                                                            onClick={() => handleNavigator("pickAndPackPending", values?.projectId)}
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
                                                                            onClick={() => handleNavigator("pickAndPackProgress", values?.projectId)}
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
                                                                            onClick={() => handleNavigator("waitingDispatch", values?.projectId)}
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
                                                                            onClick={() => handleNavigator("deliveryTransit", values?.projectId)}
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
                                                                            onClick={() => handleNavigator("deliveryComplete", values?.projectId)}
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
                                                                        // onClick={() => handleNavigator("orderRequest", values?.projectId)}
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
                                                                        // onClick={() => handleNavigator("orderRequest", values?.projectId)}
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
                                                                        // onClick={() => handleNavigator("orderRequest", values?.projectId)}
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
                                                                        // onClick={() => handleNavigator("orderRequest", values?.projectId)}
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
                                                <ChartDetailWarehouse data={detailWarehouse}/>
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
            <ModalProjectList open={modalProjectList} setOpen={setModalProjectList} handleProject={handleComponent}/>
        </>
    )
}

export default Dashboard;
