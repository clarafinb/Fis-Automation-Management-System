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
    CForm
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import { separateComma } from 'src/utils/number'

function ModalCreateMrs({ open, setOpen, projectId }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})

    const handleCreateMrs = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let payload = {
            projectId: projectId,
            mrsName: values.mrsName,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createMrs(payload))
        setValues({})
    }

    const handleOnchange = useCallback(
        (e) => {
            let { value, name } = e.target;
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
                <CModalTitle>Add New MRS</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateMrs}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">MRS Name <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="mrsName"
                                value={values?.mrsName}
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

export default ModalCreateMrs;
