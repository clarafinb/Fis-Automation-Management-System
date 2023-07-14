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
    CFormSelect,
    CFormTextarea,
    CForm
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import Select from 'react-select'
import GeocodingForm from '../../../custom/map/OpenStreetMap'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateWarehouse({ open, setOpen, projectId, isEdit, dataEdit }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [warehouseType, setWarehouseType] = useState([])
    const [province, setProvince] = useState([])
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [mapKey, setMapKey] = useState(Date.now())
    const [data, setData] = useState({})
    const [subDistrict, setSubDistrict] = useState([]);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState(null);

    const handleOnChangeProvince = (selectedProvince) => {
        setSelectedProvince(selectedProvince);
        if (selectedProvince.value) {
            dispatch(actions.getSelectSubDistrictBaseOnProvince(selectedProvince.value))
                .then(e => {
                    setSubDistrict(e)
                })
        }
    }

    const handleOnChangeSubDistrict = (selectedSubDistrict) => {
        setSelectedSubDistrict(selectedSubDistrict);
    }

    useEffect(() => {
        if (Global?.user?.token && open) {
            dispatch(actions.getSelectWarehouseType()).then(e => {
                setWarehouseType(e)
            })

            dispatch(actions.getSelectWarehouseProvince()).then(e => {
                setProvince(e)
            })
            setData({})
        }
    }, [Global?.user,open]);

    useEffect(() => {
        setData({})
        if (isEdit) {
            setData(dataEdit)
            setSelectedProvince({
                label: dataEdit?.provinceName,
                value: dataEdit?.provinceId
            })
            setMapKey(Date.now())
        }
    }, [isEdit, open]);

    const handleCreate = (event) => {
        let payload = {
            mProjectId: projectId,
            whName: values?.warehouseName || data?.whName,
            whCode: values?.warehouseCode || data?.whCode,
            isMainWH: true,
            whTypeId: values?.warehouseType || data?.whTypeId,
            provinceId: selectedProvince?.value,
            subDistrictId: selectedSubDistrict?.value,
            whAddress: values?.address || data?.whAddress,
            whSpace: values?.warehouseSpace || data?.whSpace,
            whLongitude: values?.longitude ? values?.longitude.toString() : data?.longitude.toString(),
            whLatitude: values?.latitude ? values?.latitude.toString() : data?.latitude.toString(),
            LMBY: Global?.user?.userID
        }

        let methode = "POST"

        if (isEdit) {
            methode = "PUT"
            payload.whId = data?.whId
        }

        dispatch(actions.createWarehouse(payload, methode))
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

    const handleSetLongLat = (long, lat) => {
        setValues((prev) => ({
            ...prev,
            latitude: lat,
            longitude: long
        }));
    }

    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
        >
            <CModalHeader>
                <CModalTitle>ADD WAREHOUSE</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreate}>
                    <CRow>
                        <CCol>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Warehouse Name <code>*</code></CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="warehouseName"
                                        value={values?.warehouseName || data?.whName}
                                        onChange={handleOnchange}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Warehouse Code <code>*</code></CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="warehouseCode"
                                        value={values?.warehouseCode || data?.whCode}
                                        onChange={handleOnchange}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Warehouse Type <code>*</code></CFormLabel>
                                <CCol>
                                    <CFormSelect
                                        name="warehouseType"
                                        options={warehouseType}
                                        onChange={handleOnchange}
                                        defaultValue={isEdit ? data?.whTypeId : ""}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Province <code>*</code></CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={province}
                                        isSearchable={true}
                                        value={selectedProvince}
                                        onChange={handleOnChangeProvince}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Sub District <code>*</code></CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={subDistrict}
                                        isSearchable={true}
                                        value={selectedSubDistrict}
                                        onChange={handleOnChangeSubDistrict}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Address</CFormLabel>
                                <CCol>
                                    <CFormTextarea
                                        rows={4}
                                        name="address"
                                        value={values?.address || data?.whAddress}
                                        onChange={handleOnchange}
                                    >
                                    </CFormTextarea>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Space (m2)</CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="number"
                                        name="warehouseSpace"
                                        value={values?.warehouseSpace || data.whSpace}
                                        onChange={handleOnchange}
                                    />
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Location</CFormLabel>
                                <CCol>
                                    <GeocodingForm
                                        handleSetLongLat={handleSetLongLat}
                                        isEdit={isEdit}
                                        data={data}
                                        key={mapKey}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Longitude</CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="longitude"
                                        value={values?.longitude || data?.longitude}
                                        className='bg-light'
                                        readOnly
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Latitude</CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="latitude"
                                        value={values?.latitude || data?.latitude}
                                        readOnly
                                        className='bg-light'
                                    />
                                </CCol>
                            </CRow>
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

export default ModalCreateWarehouse;
