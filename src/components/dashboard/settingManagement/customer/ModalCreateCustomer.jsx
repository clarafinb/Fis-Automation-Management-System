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
    CForm,
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateCustomer({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})

    const handleCreateCustomer = (event) => {
        let payload = {
            customerName: values.customerName,
            customerAliasName: values.customerAliasName,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createCustomer(payload))

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
                <CModalTitle>ADD CUSTOMER</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateCustomer}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Customer Name <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput 
                            type="text" 
                            name="customerName" 
                            value={values?.customerName} 
                            onChange={handleOnchange} 
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Customer Alias Name <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput 
                                type="text" 
                                name="customerAliasName" 
                                value={values?.customerAliasName} 
                                onChange={handleOnchange} 
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

export default ModalCreateCustomer;
