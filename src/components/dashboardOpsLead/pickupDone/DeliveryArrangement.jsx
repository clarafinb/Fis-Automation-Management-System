
import React from 'react'
import {
    CCol,
    CFormInput,
    CFormLabel,
    CRow,
} from '@coreui/react'
import { formatStandartDate } from 'src/helper/globalHelper';

function DeliveryArrangement({
    data
}) {
    return (
        <CRow>
            <CCol md={12}>
                <CRow className="mb-4">
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
                <CRow className="mb-4">
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
                <CRow className="mb-4">
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
                <CRow className="mb-4">
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
            </CCol>
        </CRow>
    )
}

export default DeliveryArrangement