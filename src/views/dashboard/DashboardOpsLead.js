import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate } from 'react-router-dom'
import {
    CButton,
    CCol,
    CRow,
    CFormInput,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormTextarea,
    CFormSelect,
    CCard,
    CCardBody,
    CCardTitle,
    CCardText,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilList, cilSend } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

function DashboardOpsLead({ data }) {
    const { dispatch, Global, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState([])
    const [detailWarehouse, setDetailWarehouse] = useState({})
    const [optionProject, setOptionProject] = useState([])
    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [values, setValues] = useState({})
    const [activeKey, setActiveKey] = useState(1)
    const nav = useNavigate()

    const manipulateData = (cb) => {
        try {
            const prev = { ...Dashboard }
            const newData = cb(prev)

            dispatch(
                actions.setDashboard({
                    ...prev,
                    ...newData
                })
            )
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (data) {

            let option = data.map((item, idx) => {
                return {
                    label: item.projectName,
                    value: item.projectId
                }
            })
            setOptionProject(['List Project', ...option])

        }

        if(Dashboard?.dashboardOpsLead){
            setValues((prev) => ({
                ...prev,
                projectId: Dashboard?.dashboardOpsLead?.projectId,
                whId: Dashboard?.dashboardOpsLead?.whId
            }));
        }
    }, [data]);

    useEffect(() => {
        if (values?.projectId) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, values.projectId)
            ).then(result => {
                setDetailProject(result)
                let option = result.map((item, idx) => {
                    return {
                        label: item.whName,
                        value: item.whId
                    }
                })
                setOptionWarehouse(['List Warehouse', ...option])
            })
        }

        if (values?.whId) {
            let temp = detailProject.find(e => e.whId == values.whId)
            setDetailWarehouse(temp)

            manipulateData((prev) => {
                prev.dashboardOpsLead = values
                return prev
            })
        }
      
    }, [values]);

    const handleNavigator = (type, id) => {
        const navigate = [
            {
                type: 'orderRequest',
                url: '/operation-lead/order-request/' + id
            },
            {
                type: 'pickAndPackPending',
                url: '/operation-lead/pick-pack/' + id
            },
            {
                type: 'pickAndPackProgress',
                url: '/operation-lead/pick-pack/progress/' + id
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

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>DA</span>SHBOARD
                    </h4>
                </CCol>
            </CRow>
            <br />
            <CRow>
                <CCol sm={3}>
                    <CFormSelect
                        name="projectId"
                        options={optionProject}
                        onChange={handleOnchange}
                        defaultValue={values?.projectId || optionProject[0]}
                    />
                </CCol>
                <CCol sm={3}>
                    <CFormSelect
                        name="whId"
                        options={optionWarehouse}
                        onChange={handleOnchange}
                        defaultValue={values?.whId || optionWarehouse[0]}
                    />
                </CCol>
            </CRow>
            <br />
            {detailWarehouse?.whId && (
                <>
                    <CCard>
                        <CRow className='m-3'>
                            <CCol>
                                <h5>
                                    <img src={'icon/icon_project.png'} alt="icon_project" className='px-2' />{detailWarehouse?.projectName} <span className='px-3'>|</span>
                                    <img src={'icon/icon_warehouse.png'} alt="icon_warehouse" className='px-2' /> {detailWarehouse?.whName} <span className='px-3'>|</span>
                                    <img src={'icon/icon_code.png'} alt="icon_code" className='px-2' /> {detailWarehouse?.whCode}
                                </h5>
                            </CCol>
                            <CCol className="d-none d-md-block">
                                <CButton className="float-end btn colorBtn-white px-2">
                                    <CIcon icon={cilList} className="me-2 text-warning" />
                                    Manage Order Request
                                </CButton>
                                <CButton className="float-end btn colorBtn-white px-2" >
                                    <CIcon icon={cilList} className="me-2 text-warning" />
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
                                                                // onClick={() => handleNavigator("orderRequest", values?.projectId)}
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
                                                                // onClick={() => handleNavigator("orderRequest", values?.projectId)}
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
                            <CCol>
                                <CCard>
                                    <CChart
                                        type="bar"
                                        data={{
                                            labels: ['Total Order Request', 'Order Request Canceled', 'Pick And Pack Done', 'In Transit', 'Delivery Complete'],
                                            datasets: [
                                                {
                                                    label: 'Chart',
                                                    backgroundColor: [
                                                        'rgba(255, 99, 132, 0.2)',
                                                        'rgba(255, 159, 64, 0.2)',
                                                        'rgba(255, 205, 86, 0.2)',
                                                        'rgba(75, 192, 192, 0.2)',
                                                        'rgba(54, 162, 235, 0.2)',
                                                    ],
                                                    data: [
                                                        detailWarehouse?.totalOrderReqDelivery,
                                                        detailWarehouse?.orderReqDeliveryCanceledCount,
                                                        detailWarehouse?.pickandpackDoneCount,
                                                        detailWarehouse?.pickupInTransitCount,
                                                        detailWarehouse?.deliveryCompleteCount
                                                    ],
                                                },
                                            ],
                                        }}
                                        labels="months"
                                    />
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCard>
                </>
            )}

        </>
    )
}

export default DashboardOpsLead;
