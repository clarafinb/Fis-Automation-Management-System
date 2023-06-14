import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCol,
    CRow,
    CFormInput,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'

function ModalCreateUom({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})

    const handleCreateUom = () => {
        let payload = {
            uom: values.uom,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createUom(payload))
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
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>UOM Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">UOM <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="uom" value={values?.uom} onChange={handleOnchange} />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreateUom}>Add</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateUom;
