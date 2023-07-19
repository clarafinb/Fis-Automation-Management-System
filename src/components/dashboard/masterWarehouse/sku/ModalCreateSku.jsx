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
import { separateComma } from 'src/utils/number'

function ModalCreateSku({ open, setOpen, projectId }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [uomList, setUomList] = useState([])

    useEffect(() => {
        if (Global?.user?.token && open) {
            setValues({})
            dispatch(actions.getSelectActiveUom()).then(e => {
                setUomList(e)
            })
        }
    }, [projectId, open]);

    const handleCreateSku = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let payload = {
            mProjectId: projectId,
            materialCode: values.materialCode,
            materialDesc: values.materialDesc,
            uomId: values.uomId,
            totalVolume: values.totalVolume,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createSku(payload))
        setValues({})
    }

    const handleOnchange = useCallback(
        (e) => {
            let { value, name } = e.target;
            if (name === 'totalVolume') value = separateComma(value)
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
                                type="text"
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
