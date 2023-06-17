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

function ModalCreateCustomer({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})

    const handleCreateCustomer = () => {
        let payload = {
            customerName: values.customerName,
            customerAliasName: values.customerAliasName,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createCustomer(payload))
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
                <CModalTitle>Customer Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Customer Name <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="customerName" value={values?.customerName} onChange={handleOnchange} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Customer Alias Name <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="customerAliasName" value={values?.customerAliasName} onChange={handleOnchange} />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreateCustomer}>Add</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateCustomer;
