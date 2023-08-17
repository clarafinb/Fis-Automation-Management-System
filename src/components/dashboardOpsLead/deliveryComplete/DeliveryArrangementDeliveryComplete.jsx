import React from 'react'
import {
    CCol,
    CFormInput,
    CFormLabel,
    CRow,
} from '@coreui/react'
import { formatStandartDate } from 'src/helper/globalHelper';

function DeliveryArrangementDeliveryComplete({
    data
}) {
    return (
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
                            value={data?.deliveryMode}
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
                            value={data?.transportMode}
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
                            value={formatStandartDate(data?.pickupDate)}
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
                            value={data?.pickupBy}
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
                            value={data?.deliveryCompleteDate}
                            readOnly
                            disabled
                        />
                    </CCol>
                </CRow>
            </CCol>
        </CRow>
    )
}

export default DeliveryArrangementDeliveryComplete
