import { CButton, CCard, CCardBody, CCardText, CCol, CRow } from '@coreui/react'
import React from 'react'

function Delivery({ detailWarehouse, handleNavigator }) {
    return (
        <>
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
                                <p>DELIVERY ON SITE</p>
                                <hr />
                                <h3>{detailWarehouse?.deliveryOnsiteCount}</h3>
                            </CCardText>
                            <CRow>
                                <CCol className="d-grid gap-2">
                                    <CButton
                                        className="colorBtn-yellow"
                                        onClick={() => handleNavigator("deliveryOnSite", detailWarehouse)}
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
        </>
    )
}

export default Delivery
