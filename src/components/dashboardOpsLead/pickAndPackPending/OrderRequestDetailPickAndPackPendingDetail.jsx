
import React from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CRow,
} from '@coreui/react'
import { formatStandartDate } from 'src/helper/globalHelper';

function OrderRequestDetailPickAndPackPendingDetail({
    data
}) {
    return (
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol>
                        <h4 className="card-title mb-0">
                            Order Request Detail
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Order Request Date
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="orderRequestDate"
                                    value={formatStandartDate(data?.orderRequestDate)}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Cust Order Req No
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="custOrderRequest"
                                    value={data?.custOrderRequest}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Order Req Description
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="orderRequestDesc"
                                    value={data?.orderRequestDesc}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Delivery Process Type
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="processName"
                                    value={data?.processName}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Stock Inbound Type
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="inboundType"
                                    value={data?.inboundType}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Route Type
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="routeType"
                                    value={data?.routeType}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Requestor Name
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="requestorName"
                                    value={data?.requestorName}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Delivery Request Type
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="deliveryReqType"
                                    value={data?.deliveryReqType}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Transport Request Type
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="transportReqType"
                                    value={data?.transportReqType}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Origin
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="origin"
                                    value={data?.origin}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="originAddress"
                                    value={data?.originAddress}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Recipient Name
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="recipientName"
                                    value={data?.recipientName}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Recipient Company Name
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="recipientCompanyName"
                                    value={data?.recipientCompanyName}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-form-label">Create By / Create Date
                            </CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="recipientCompanyName"
                                    value={data?.createBy + ' / ' + data?.createDate}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default OrderRequestDetailPickAndPackPendingDetail