import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane
} from '@coreui/react'

import * as actions from '../../config/redux/Dashboard/actions'
import moment from 'moment/moment'
import { useNavigate } from 'react-router-dom';
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import HoDocument from 'src/components/dashboardOpsLead/deliveryComplete/HoDocument'


function DeliveryCompleteDetail() {
    const nav = useNavigate();
    const { dispatch, Global } = useRedux()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [orderReqId, setOrderReqId] = useState()
    const [activeKey, setActiveKey] = useState(1)

    useEffect(() => {
        const splitUri = window.location.href.split("/");
        const orderRequestId = splitUri[8]
        setProjectId(splitUri[6])
        setOrderReqId(orderRequestId)

        if (Global?.user?.userID) {
            dispatch(
                actions.getOrderRequestDetail(orderRequestId)
            ).then(result => {
                setOrderReqDetail(result[0])
            })
        }
    }, [Global?.user?.userID]);

    const handleBack = () => {
        nav('/dashboard-ops-lead/delivery-complete/' + projectId);
    }

    return (
        <>
            <CRow className='py-2'>
                <CCol sm={12}>
                    <CRow className='mb-2'>
                        <CCol>
                            <h5 className="card-title mb-0">
                                <b><span className='text-underline'>DE</span>LIVERY COMPLETE DETAIL</b>
                            </h5>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm={4}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h6 className="card-title mb-2">
                                        <b><span className='text-underline'>OR</span>DER REQUEST DETAIL</b>
                                    </h6>
                                </CCol>
                            </CRow>
                            <br />
                            <CRow>
                                <CCol>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Order Request Date
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="orderRequestDate"
                                                value={moment(orderReqDetail?.orderRequestDate).format('DD-MM-YYYY HH:mm:ss')}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Cust Order Req No
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="custOrderRequest"
                                                value={orderReqDetail?.custOrderRequest}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Order Req Description
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="orderRequestDesc"
                                                value={orderReqDetail?.orderRequestDesc}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Delivery Process Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="processName"
                                                value={orderReqDetail?.processName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Route Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="routeType"
                                                value={orderReqDetail?.routeType}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Requestor Name
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="requestorName"
                                                value={orderReqDetail?.requestorName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Delivery Request Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="deliveryReqType"
                                                value={orderReqDetail?.deliveryReqType}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Transport Request Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="transportReqType"
                                                value={orderReqDetail?.transportReqType}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-0">
                                        <CFormLabel
                                            className="col-form-label">Origin
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="origin"
                                                value={orderReqDetail?.origin}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="originAddress"
                                                value={orderReqDetail?.originAddress}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-0">
                                        <CFormLabel
                                            className="col-form-label">Destination
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="destination"
                                                value={orderReqDetail?.destination}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="destinationAddress"
                                                value={orderReqDetail?.destinationAddress}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Recipient Name
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientName"
                                                value={orderReqDetail?.recipientName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Recipient Company Name
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientCompanyName"
                                                value={orderReqDetail?.recipientCompanyName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-2">
                                        <CFormLabel
                                            className="col-form-label">Pick and Pack Complete Date
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientCompanyName"
                                                value={orderReqDetail?.pickandpackCompleteDate}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={8}>
                    <CCard>
                        <CCardBody>
                            <CRow className='mb-2'>
                                <CNav variant="tabs">
                                    <CNavItem>
                                        <CNavLink
                                            active={activeKey === 1}
                                            onClick={() => setActiveKey(1)}
                                        >
                                            Delivery Arrangement
                                        </CNavLink>
                                    </CNavItem>
                                    <CNavItem>
                                        <CNavLink
                                            active={activeKey === 2}
                                            onClick={() => setActiveKey(2)}
                                        >
                                            HO Document
                                        </CNavLink>
                                    </CNavItem>
                                </CNav>
                            </CRow>
                            <br />
                            <CTabContent>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                    <CRow>
                                        <CCol>
                                            <CRow className="mb-2">
                                                <CFormLabel
                                                    className="col-form-label">Final Delivery Mode
                                                </CFormLabel>
                                                <CCol>
                                                    <CFormInput
                                                        type="text"
                                                        name="deliveryMode"
                                                        value={orderReqDetail?.deliveryMode}
                                                        readOnly
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-2">
                                                <CFormLabel
                                                    className="col-form-label">Final Transport Mode
                                                </CFormLabel>
                                                <CCol>
                                                    <CFormInput
                                                        type="text"
                                                        name="transportMode"
                                                        value={orderReqDetail?.transportMode}
                                                        readOnly
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-2">
                                                <CFormLabel
                                                    className="col-form-label">Pickup Date
                                                </CFormLabel>
                                                <CCol>
                                                    <CFormInput
                                                        type="text"
                                                        name="pickupDate"
                                                        value={orderReqDetail?.pickupDate}
                                                        readOnly
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-2">
                                                <CFormLabel
                                                    className="col-form-label">Pickup By
                                                </CFormLabel>
                                                <CCol>
                                                    <CFormInput
                                                        type="text"
                                                        name="pickupBy"
                                                        value={orderReqDetail?.pickupBy}
                                                        readOnly
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-2">
                                                <CFormLabel
                                                    className="col-form-label">Delivery Complete Date
                                                </CFormLabel>
                                                <CCol>
                                                    <CFormInput
                                                        type="text"
                                                        name="deliveryCompleteDate"
                                                        value={orderReqDetail?.deliveryCompleteDate}
                                                        readOnly
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                </CTabPane>
                            </CTabContent>
                            <CTabContent>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                                    <CRow>
                                        <CCol>
                                            <HoDocument
                                                orderReqId={orderReqId}
                                                visible={activeKey === 2}
                                            />
                                        </CCol>
                                    </CRow>
                                </CTabPane>
                            </CTabContent>
                            <br />
                            < CRow >
                                <CCol className="d-none d-md-block text-end py-3">
                                    <ButtonCancel
                                        label='BACK'
                                        handleButton={handleBack}
                                    />
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol >
            </CRow >
        </>
    )
}

export default DeliveryCompleteDetail