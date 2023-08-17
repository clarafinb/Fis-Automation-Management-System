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

import * as actions from '../../../config/redux/Dashboard/actions'
import moment from 'moment/moment'
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import HoDocument from 'src/components/dashboardOpsLead/deliveryComplete/HoDocument'
import OrderRequestDeliveryCompleteDetail from 'src/components/dashboardOpsLead/deliveryComplete/OrderRequestDeliveryCompleteDetail'
import DeliveryArrangementDeliveryComplete from 'src/components/dashboardOpsLead/deliveryComplete/DeliveryArrangementDeliveryComplete'

function DeliveryCompleteDetail() {
    const nav = useNavigate();
    const { dispatch, Global } = useRedux()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [whId, setWhId] = useState("")
    const [orderReqId, setOrderReqId] = useState()
    const [activeKey, setActiveKey] = useState(1)
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
            })
        }
    }, [Global?.user?.userID]);

    const handleBack = () => {
        nav('/delivery-complete/' + projectId + "/" + whId);
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
                    <OrderRequestDeliveryCompleteDetail
                        data={orderReqDetail}
                    />
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
                                    <DeliveryArrangementDeliveryComplete
                                        data={orderReqDetail}
                                    />
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