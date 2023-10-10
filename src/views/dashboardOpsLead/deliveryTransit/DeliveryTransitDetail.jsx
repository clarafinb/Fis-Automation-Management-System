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
    const [headerData, setHeaderData] = useState({
        url: 'delivery-transit',
        label: 'Delivery Transit Detail',
    })

    useEffect(() => {
        const url = pathname.split('/')[1]
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const orderRequestId = pathname.split('/')[5]

        if (url === 'pickup-transit') {
            setHeaderData({
                url: 'pickup-transit',
                label: 'PICKUP In Transit Detail',
            })
        }

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
        nav("/" + headerData.url + "/" + projectId + "/" + whId, { replace: true })
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
                                        {headerData.label}
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
                                    <CRow className=' mb-2'>
                                        <CCol>
                                            <h4 className="card-title">
                                                <span className='text-underline'>TR</span>ANSPORT ARRANGEMENT
                                            </h4>
                                        </CCol>
                                    </CRow>
                                    <CRow className="m-2 py-3">
                                        <CCard className='card-border'>
                                            <CRow className='m-3'>
                                                <CCol>
                                                    <CRow>
                                                        <CCol sm={1}>
                                                            <img src={'icon/transport.png'} alt="" className='py-2' />
                                                        </CCol>
                                                        <CCol>
                                                            <CRow className='px-2'>
                                                                <CCol>
                                                                    <h5>{transportArragmentData?.transportTypeArrangementId}</h5>
                                                                </CCol>
                                                            </CRow>
                                                            <CRow className='px-2'>
                                                                <CCol>
                                                                    <h5 className="card-title">
                                                                        <img src={'icon/card.png'} alt="" /> {transportArragmentData?.transportName} &nbsp;|&nbsp;
                                                                        <img src={'icon/truck.svg'} alt="" /> {transportArragmentData?.assignBy} &nbsp;|&nbsp;
                                                                        <img src={'icon/truck.svg'} alt="" /> {moment(transportArragmentData?.assignDate).format('DD-MM-YYYY HH:mm:ss')}
                                                                    </h5>
                                                                </CCol>
                                                            </CRow>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>
                                            </CRow>
                                        </CCard>
                                    </CRow>
                                    <hr />
                                    <CRow className=' mb-2 py-2'>
                                        <CCol>
                                            <h4 className="card-title">
                                                <span className='text-underline'>CU</span>RRENT LOCATION
                                            </h4>
                                        </CCol>
                                    </CRow>

                                    <CRow className="m-1 py-3">
                                        <img src={'images/map.png'} alt="" onClick={handleOpenModal} style={{ cursor: "pointer" }} />
                                    </CRow>
                                    < CRow >
                                        <CCol className="d-none d-md-block text-end py-3">
                                            <CButton
                                                type="button"
                                                onClick={handleBack}
                                                className='colorBtn-yellow'
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