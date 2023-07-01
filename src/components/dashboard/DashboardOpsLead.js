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
    CCardText
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilSend } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

function DashboardOpsLead(projectId) {
    const { dispatch, Global, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const nav = useNavigate()

    useEffect(() => {
        if (projectId && Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, projectId.projectId)
            ).then(result => setDetailProject(result[0]))
        }
    }, [Global?.user?.userID]);

    const handleNavigator = (type, id) => {
        const navigate = [
            {
                type: 'orderRequest',
                url: '/operation-lead/order-request/' + id
            },
            {
                type: 'pickAndPackPending',
                url: '/operation-lead/pick-pack/' + id
            }
        ]

        let url = navigate.find(e => e.type === type)
        if (url) {
            nav(url.url)
        }
    }

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h5>{detailProject?.projectName} | {detailProject?.whName} | {detailProject?.whCode}</h5>
                </CCol>
                <CCol className="d-none d-md-block">
                    <CButton className="float-end colorBtn-white px-1">
                        {/* <CIcon icon={cilList} className="me-2 text-warning" /> */}
                        Manage Order Request
                    </CButton>
                    <CButton className="float-end colorBtn-white px-1" >
                        {/* <CIcon icon={cilPlus} className="me-2 text-warning" /> */}
                        Manage Inventory
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CRow>
                <CCol sm={5}>
                    <h6>Delivery Request</h6>
                    <CRow>
                        <CCol sm={4}>
                            <CCard className='mb-3' >
                                <CCardBody>
                                    <CCardTitle>
                                        Order Request Delivery
                                    </CCardTitle>
                                    <CCardText className='px-3'>
                                        {detailProject?.totalOrderReqDelivery}
                                    </CCardText>
                                    <CRow>
                                        <CCol className="d-none d-md-block">
                                            <div className='text-end'>
                                                <CIcon
                                                    icon={cilSend}
                                                    className="me-2"
                                                    size="xl"
                                                    onClick={() => handleNavigator("orderRequest", projectId.projectId)}
                                                />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol sm={4}>
                            <CCard className='mb-3' >
                                <CCardBody>
                                    <CCardTitle>
                                        Pick & Pack Pending
                                    </CCardTitle>
                                    <CCardText className='px-3'>
                                        {detailProject?.pickandpackpendingCount}
                                    </CCardText>
                                    <CRow>
                                        <CCol className="d-none d-md-block">
                                            <div className='text-end'>
                                                <CIcon
                                                    icon={cilSend}
                                                    className="me-2"
                                                    size="xl"
                                                    onClick={() => handleNavigator("pickAndPackPending", projectId.projectId)}
                                                />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol sm={4}>
                            <CCard className='mb-3' >
                                <CCardBody>
                                    <CCardTitle>
                                        Pick & Pack On Progress
                                    </CCardTitle>
                                    <CCardText className='px-3'>
                                        {detailProject?.pickandpackOnProgressCount}
                                    </CCardText>
                                    <CRow>
                                        <CCol className="d-none d-md-block">
                                            <div className='text-end'>
                                                <CIcon icon={cilSend} className="me-2" size="xl" />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm={4}>
                            <CCard className='mb-3' >
                                <CCardBody>
                                    <CCardTitle>
                                        Waiting Dispatch
                                    </CCardTitle>
                                    <CCardText className='px-3'>
                                        {detailProject?.waitingDispatchCount}
                                    </CCardText>
                                    <CRow>
                                        <CCol className="d-none d-md-block">
                                            <div className='text-end'>
                                                <CIcon icon={cilSend} className="me-2" size="xl" />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol sm={4}>
                            <CCard className='mb-3' >
                                <CCardBody>
                                    <CCardTitle>
                                        Delivery In-Transit
                                    </CCardTitle>
                                    <CCardText className='px-3'>
                                        {detailProject?.deliveryInTransitCount}
                                    </CCardText>
                                    <CRow>
                                        <CCol className="d-none d-md-block">
                                            <div className='text-end'>
                                                <CIcon icon={cilSend} className="me-2" size="xl" />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol sm={4}>
                            <CCard className='mb-3' >
                                <CCardBody>
                                    <CCardTitle>
                                        Delivery Completed
                                    </CCardTitle>
                                    <CCardText className='px-3'>
                                        {detailProject?.deliveryCompleteCount}
                                    </CCardText>
                                    <CRow>
                                        <CCol className="d-none d-md-block">
                                            <div className='text-end'>
                                                <CIcon icon={cilSend} className="me-2" size="xl" />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol sm={4}>
                    <h6>Pickup Request</h6>
                    <CRow>
                        <CCol>
                            <CCard className='mb-3' >
                                <CCardBody>
                                    <CCardTitle>
                                        Order Request Pickup
                                    </CCardTitle>
                                    <CCardText className='px-3'>
                                        {detailProject?.totalOrderReqPickup}
                                    </CCardText>
                                    <CRow>
                                        <CCol className="d-none d-md-block">
                                            <div className='text-end'>
                                                <CIcon icon={cilSend} className="me-2" size="xl" />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol>
                            <CCard className='mb-3' >
                                <CCardBody>
                                    <CCardTitle>
                                        Waiting Pickup
                                    </CCardTitle>
                                    <CCardText className='px-3'>
                                        {detailProject?.waitingPickupCount}
                                    </CCardText>
                                    <CRow>
                                        <CCol className="d-none d-md-block">
                                            <div className='text-end'>
                                                <CIcon icon={cilSend} className="me-2" size="xl" />
                                            </div>
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
                                    <CCardTitle>
                                        Pickup In-Transit
                                    </CCardTitle>
                                    <CCardText className='px-3'>
                                        {detailProject?.pickupInTransitCount}
                                    </CCardText>
                                    <CRow>
                                        <CCol className="d-none d-md-block">
                                            <div className='text-end'>
                                                <CIcon icon={cilSend} className="me-2" size="xl" />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol>
                            <CCard className='mb-3' >
                                <CCardBody>
                                    <CCardTitle>
                                        HO Completed
                                    </CCardTitle>
                                    <CCardText className='px-3'>
                                        {detailProject?.hoCompleteCount}
                                    </CCardText>
                                    <CRow>
                                        <CCol className="d-none d-md-block">
                                            <div className='text-end'>
                                                <CIcon icon={cilSend} className="me-2" size="xl" />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol sm={3}>
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
                                        detailProject?.totalOrderReqDelivery,
                                        detailProject?.orderReqDeliveryCanceledCount,
                                        detailProject?.pickandpackDoneCount,
                                        detailProject?.pickupInTransitCount,
                                        detailProject?.deliveryCompleteCount
                                    ],
                                },
                            ],
                        }}
                        labels="months"
                    />
                </CCol>

            </CRow>
            <br />
        </>
    )
}

export default DashboardOpsLead;
