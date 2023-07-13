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
    CFormSelect,
    CForm
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateSku({ open, setOpen, projectId }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [uomList, setUomList] = useState([])

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getSelectActiveUom()).then(e => {
                setUomList(e)
            })
        }
    }, [projectId]);

    const handleCreateSku = (event) => {
        let payload = {
            mProjectId: projectId,
            materialCode: values.materialCode,
            materialDesc: values.materialDesc,
            uomId: values.uomId,
            totalVolume: values.totalVolume,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createSku(payload))

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
                <CModalTitle>SKU Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateSku}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Material Code <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="materialCode"
                                value={values?.materialCode}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Material Desc <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="materialDesc"
                                value={values?.materialDesc}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">UOM <code>*</code></CFormLabel>
                        <CCol>
                            <CFormSelect
                                name="uomId"
                                options={uomList}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Total Volume (CBM)<code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="number"
                                name="totalVolume"
                                value={values?.totalVolume}
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

export default ModalCreateSku;
