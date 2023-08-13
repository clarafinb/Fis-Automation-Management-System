import React, { useState, useCallback } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormTextarea,
    CForm
} from '@coreui/react'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCancelOrderRequestPickup({ open, setOpen, orderReqId, detailProject }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})

    const handleOnchange = useCallback(
        (e) => {
            const { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleCancel = (event) => {

        event.preventDefault()
        event.stopPropagation()

        const payload = {
            orderReqId: orderReqId,
            LMBY: Global.user.userID,
            remarks: values.remarks,
            orderReqStatus: "cancelled"
        }
        dispatch(
            actions.cancelOrderRequestPickup(
                payload,
                detailProject.projectId,
                detailProject.whId
            )
        )
        setOpen(false)
        setValues({})

    }

    return (
        <CModal
            // size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            alignment='center'
            backdrop="static"
            keyboard={false}
        >
            <CModalHeader>
                <CModalTitle>CANCEL ORDER REQUEST PICKUP</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCancel}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Remarks <code>*</code></CFormLabel>
                        <CCol>
                            <CFormTextarea
                                rows={3}
                                name="remarks"
                                value={values?.remarks}
                                onChange={handleOnchange}
                                required
                            >
                            </CFormTextarea>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CCol className="d-grid gap-2">
                            <ButtonSubmit type="submit" />
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
        </CModal>
    )
}

export default ModalCancelOrderRequestPickup;
