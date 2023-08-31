import { CButton, CCard, CCardBody, CCardText, CCol, CRow } from '@coreui/react'
import React from 'react'

function PickUp({ detailWarehouse, handleNavigator}) {
    return (
        <>
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
                                        onClick={() => handleNavigator("orderRequestPickup", detailWarehouse)}
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
                                <p>PICKUP PREPARATION</p>
                                <hr />
                                <h3>{detailWarehouse?.pickupPrepCount}</h3>
                            </CCardText>
                            <CRow>
                                <CCol className="d-grid gap-2">
                                    <CButton
                                        className="colorBtn-yellow"
                                        onClick={() => handleNavigator("pickupPreparation", detailWarehouse)}
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
                                <p>WAITING TRANSPORT ASSIGNMENT</p>
                                <hr />
                                <h3>{detailWarehouse?.waitingTransportAssignmentCount}</h3>
                            </CCardText>
                            <CRow>
                                <CCol className="d-grid gap-2">
                                    <CButton
                                        className="colorBtn-yellow"
                                        onClick={() => handleNavigator("waitingTransportAssignment", detailWarehouse)}
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
                                <p>ON SITE</p>
                                <hr />
                                <h3>{detailWarehouse?.pickupOnsiteCount}</h3>
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
        </>
    )
}

export default PickUp
