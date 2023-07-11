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
import * as actions from '../../../config/redux/Dashboard/actions'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateWarehouseType({ open, setOpen, isEdit = false, dataEdit }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [data, setData] = useState({})

    useEffect(() => {
        setData({})
        setValues({})
        if (isEdit) {
            setData(dataEdit)
        }
    }, [isEdit, open,dataEdit]);

    const handleCreateWarehouseType = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            whType: values.whType || data.whType,
            whTypeDescription: values.whTypeDescription || data.whTypeDescription,
            LMBY: Global.user.userID
        }
        let methode = "POST"
        if (isEdit) {
            methode = "PUT"
            payload.whTypeId = data?.whTypeId
        }

        dispatch(actions.createMasterWarehouseType(payload, methode))
        setData({})
        setValues({})
        setOpen(false)
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
            backdrop="static"
            keyboard={false}
        >
            <CForm onSubmit={handleCreateWarehouseType}>
                <CModalHeader>
                    <CModalTitle>{isEdit ? 'Edit' : 'Add'} Warehouse Type</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        <CFormLabel className="col-sm-3 col-form-label">Warehouse Type <code>(*)</code></CFormLabel>
                        <CCol sm={8}>
                            <CFormInput
                                type="text"
                                name="whType"
                                value={values?.whType || data?.whType}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-sm-3 col-form-label">Description<code>(*)</code></CFormLabel>
                        <CCol sm={8}>
                            <CFormInput
                                type="text"
                                name="whTypeDescription"
                                value={values?.whTypeDescription || data?.whTypeDescription}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <ButtonCancel
                        label='CANCEL'
                        handleButton={() => setOpen(false)}
                    />
                    <ButtonSubmit
                        label={isEdit ? 'UPDATE' : 'ADD'}
                        type='submit'
                    />
                </CModalFooter>
            </CForm>
        </CModal>
    )
}

export default ModalCreateWarehouseType;
