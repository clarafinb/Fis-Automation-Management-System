import React, { useState, useCallback } from 'react'
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
    CForm,
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateUom({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})

    const handleCreateUom = (event) => {
        let payload = {
            uom: values.uom,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createUom(payload))

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
                <CModalTitle>UOM Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateUom}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">UOM <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="uom"
                                value={values?.uom}
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

export default ModalCreateUom;
