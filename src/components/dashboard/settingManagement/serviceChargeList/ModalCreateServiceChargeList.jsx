import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
    CFormInput,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormSelect,
    CForm
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateServiceChargeList({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [uomList, setUomList] = useState([])

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getSelectActiveUom()).then(e => {
                setUomList(e)
            })
        }
    }, [Global?.user]);

    const handleCreateSc = (event) => {

        let payload = {
            serviceCharge: values.serviceCharge,
            serviceChargeCode: values.serviceChargeCode,
            uomId: values.uom,
            LMBY: Global?.user?.userID
        }

        dispatch(actions.createServiceCharge(payload))

        event.preventDefault()
        event.stopPropagation()
    }

    const handleOnchange = useCallback(
        (e) => {

            const { value, name } = e.target;

            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    return (
        <CModal
            // size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Service Charge Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateSc}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Service Charge Code<code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput type="text" name="serviceChargeCode" value={values?.serviceChargeCode} onChange={handleOnchange} required />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Service Charge<code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput type="text" name="serviceCharge" value={values?.serviceCharge} onChange={handleOnchange} required />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">UOM <code>*</code></CFormLabel>
                        <CCol>
                            <CFormSelect
                                name="uom"
                                options={uomList}
                                onChange={handleOnchange}
                                required
                            />
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

export default ModalCreateServiceChargeList
