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
    CFormSelect
} from '@coreui/react'
import * as actions from '../../../config/redux/Dashboard/actions'

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

    const handleCreateSku = () => {
        let payload = {
            mProjectId: projectId,
            materialCode: values.materialCode,
            materialDesc: values.materialDesc,
            uomId: values.uomId,
            totalVolume: values.totalVolume,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createSku(payload))
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
                <CModalTitle>SKU Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Material Code <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="materialCode"
                            value={values?.materialCode}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Material Desc <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="materialDesc"
                            value={values?.materialDesc}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">UOM <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormSelect
                            name="uomId"
                            options={uomList}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Total Volume (CBM)<code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="number"
                            name="totalVolume"
                            value={values?.totalVolume}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreateSku}>Add</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateSku;
