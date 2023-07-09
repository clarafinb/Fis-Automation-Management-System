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
import Select from 'react-select'

function ModalCreateSubDistrict({ open, setOpen, isEdit, dataEdit }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    // const [uomList, setUomList] = useState([])
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [province, setProvince] = useState([])
    const [data, setData] = useState({})


    useEffect(() => {
        if (Global?.user?.token) {
            // dispatch(actions.getSelectActiveUom()).then(e => {
            //     setUomList(e)
            // })

            // dispatch(actions.getSelectWarehouseProvince()).then(e => {
            //     setProvince(e)
            // })

            // setData({})
        }
    }, [Global?.user?.token]);

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

    const handleCreateSubDistrict = () => {
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
            <CModalHeader>
                <CModalTitle>Sub District Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Province <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
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
                    <CFormLabel className="col-sm-2 col-form-label">Sub district Name <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="subDistrictName"
                            value={values?.subDistrictName || data?.subDistrictName}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">MRS Code <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="mrsCode"
                            value={values?.mrsCode || data?.mrsCode}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Postal Code<code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="postalCode"
                            value={values?.postalCode || data?.postalCode}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreateSubDistrict}>Add</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateSubDistrict;
