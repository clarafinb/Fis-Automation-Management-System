import React, { useState, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CRow
} from '@coreui/react'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/moment'
import ModalOpenMap from 'src/components/dashboard/masterWarehouse/warehouse/ModalOpenMap'
import { useLocation, useNavigate } from 'react-router-dom';
import OrderRequestDetailDeliveryTransit from 'src/components/dashboardOpsLead/deliveryTransit/OrderRequestDetailDeliveryTransit'


function DeliveryTransitDetail() {
    const nav = useNavigate();
    const { dispatch, Global } = useRedux()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [whId, setWhId] = useState("")
    const [orderReqId, setOrderReqId] = useState()
    const [transportArragmentData, setTransportArragmentData] = useState({})
    const [modalMap, setModalMap] = useState(false)
    const [mapKey, setMapKey] = useState(Date.now())
    const { pathname } = useLocation();

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const orderRequestId = pathname.split('/')[5]

        setProjectId(pId)
        setWhId(wId)
        setOrderReqId(orderRequestId)

        if (Global?.user?.userID) {
            dispatch(
                actions.getOrderRequestDetail(orderRequestId)
            ).then(result => {
                setOrderReqDetail(result[0])
                getLastLocation(orderRequestId)
            })

        }
    }, [Global?.user?.userID]);

    const handleOpenModal = () => {
        getLastLocation(orderReqId)
        setMapKey(Date.now())
        setModalMap(true)
    }

    const handleBack = () => {
        nav("/delivery-transit/" + projectId + "/" + whId, { replace: true })
    }

    const getLastLocation = (orderReqId) => {
        dispatch(
            actions.getTransportArragementLocation(orderReqId)
        ).then(resp => {
            if (resp.length > 0) {
                setTransportArragmentData({
                    ...resp[0]
                })
            }
        })
    }

    return (
        <>
            <CRow className='py-2'>
                <CCol sm={12}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Delivery Transit Detail
                                    </h4>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm={6}>
                    <OrderRequestDetailDeliveryTransit
                        data={orderReqDetail}
                    />
                </CCol>
                <CCol sm={6}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Delivery Arrangement
                                    </h4>
                                </CCol>
                            </CRow>
                            <br />
                            <CRow>
                                <CCol>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Final Delivery Mode
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
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Final Transport Mode
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
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Pickup Date
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
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Pickup By
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
                                    <br />
                                    <CRow>
                                        <CCol>
                                            <h4 className="card-title mb-4">
                                                Transport Arrangement
                                            </h4>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <h5 className="card-title mb-4">
                                            {transportArragmentData?.transportTypeArrangementId}&nbsp;|&nbsp;
                                            {transportArragmentData?.transportName}&nbsp;|&nbsp;
                                            {transportArragmentData?.assignBy}&nbsp;|&nbsp;
                                            {moment(transportArragmentData?.assignDate).format('DD-MM-YYYY HH:mm:ss')}
                                        </h5>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <h5 className="card-title mb-4">
                                            Popup MAP
                                            <CButton
                                                type="button"
                                                className='colorBtn-white px-1'
                                                color="success"
                                                title='Show Last Location'
                                                onClick={handleOpenModal}
                                            >
                                                <FontAwesomeIcon icon={faMap} />
                                            </CButton>
                                        </h5>
                                    </CRow>
                                    < CRow >
                                        <CCol className="d-none d-md-block text-end py-3">
                                            <CButton
                                                type="button"
                                                onClick={handleBack}
                                                className='colorBtn-white px-1'
                                                color="success"
                                                title='Back'
                                            >Close</CButton>
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol >
            </CRow >

            <ModalOpenMap
                open={modalMap}
                setOpen={setModalMap}
                data={transportArragmentData}
                key={mapKey}
                title={orderReqDetail.custOrderRequest}
            />
        </>
    )
}

export default DeliveryTransitDetail