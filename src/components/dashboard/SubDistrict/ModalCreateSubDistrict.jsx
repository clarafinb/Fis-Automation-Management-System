import React, { useState, useCallback, useEffect } from 'react'
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
import * as actions from '../../../config/redux/Dashboard/actions'
import Select from 'react-select'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateSubDistrict({ open, setOpen, isEdit, dataEdit }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [province, setProvince] = useState([])
    const [data, setData] = useState({})

    useEffect(() => {
        setData({})
        if (isEdit) {
            setData(dataEdit)
            setSelectedProvince({
                label: dataEdit?.provinceName,
                value: dataEdit?.provinceId
            })
        }

        if (open) {
            dispatch(actions.getSelectWarehouseProvince()).then(e => {
                setProvince(e)
            })

        }
    }, [isEdit, open]);

    const handleOnChangeProvince = (selectedProvince) => {
        setSelectedProvince(selectedProvince);
    }

    const handleCreateSubDistrict = (event) => {
        let payload = {
            provinceId: selectedProvince?.value,
            subDistrictName: values.subDistrictName || data.subDistrictName,
            mrsCode: values.mrsCode || data.mrsCode,
            postalCode: values.postalCode || data.postalCode,
            LMBY: Global.user.userID
        }
        let methode = "POST"
        if (isEdit) {
            methode = "PUT"
            payload.subDistrictId = data?.subDistrictId
        }

        dispatch(actions.createSubDistrict(payload, methode))
        setData({})
        setValues({})
        setOpen(false)

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
            backdrop="static"
            keyboard={false}

        >
            <CModalHeader>
                <CModalTitle>ADD SUB DISTRICT</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateSubDistrict}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Province <code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={province}
                                isSearchable={true}
                                value={selectedProvince}
                                onChange={handleOnChangeProvince}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Sub district Name <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="subDistrictName"
                                value={values?.subDistrictName || data?.subDistrictName}
                                onChange={handleOnchange}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">MRS Code <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="mrsCode"
                                value={values?.mrsCode || data?.mrsCode}
                                onChange={handleOnchange}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Postal Code<code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="postalCode"
                                value={values?.postalCode || data?.postalCode}
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

export default ModalCreateSubDistrict;
