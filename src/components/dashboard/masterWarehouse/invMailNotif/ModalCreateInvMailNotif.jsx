import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CRow,
    CFormLabel,
    CCol,
    CFormInput,
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateInvMailNotif({ open, setOpen, whId }) {
    const { dispatch } = useRedux()
    const [values, setValues] = useState({})

    useEffect(() => {
        if (open) setValues({})

    }, [open]);

    const handleCreate = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            whId: whId,
            fullname: values?.fullname,
            email: values?.email,
        }

        dispatch(actions.createInvMailNotif(payload))
            .then(resp => {
                if (resp === 'success') {
                    dispatch(actions.getListInvMailNotif(whId))
                    setOpen(false)
                }
            })

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
            size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
            alignment="center"
        >
            <CModalHeader>
                <CModalTitle>Add Recipient Mail</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreate}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Recipient Name <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="fullname"
                                value={values?.fullname}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Recipient Mail <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="email"
                                name="email"
                                value={values?.email}
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

export default ModalCreateInvMailNotif;
