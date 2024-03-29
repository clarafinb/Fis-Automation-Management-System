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
    CFormTextarea,
    CForm,
    CFormSwitch
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import Select from 'react-select'
import GeocodingForm from '../../../custom/map/OpenStreetMap'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import Alert from 'src/components/custom/toast/Alert'

function ModalCreateWarehouse({ open, setOpen, projectId, isEdit, dataEdit }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [warehouseType, setWarehouseType] = useState([])
    const [province, setProvince] = useState([])
    const [mapKey, setMapKey] = useState(Date.now())
    const [data, setData] = useState({})
    const [subDistrict, setSubDistrict] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState({});
    const [selectedSubDistrict, setSelectedSubDistrict] = useState({});
    const [selectedWhType, setSelectedWhType] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)

    useEffect(() => {
        if (Global?.user?.token && open) {

            resetForm()
            initFormSelect()

            if (isEdit) autoFillEditForm(dataEdit)

        }
    }, [Global?.user, open]);

    const resetForm = () => {
        setIsChecked(false)
        setVisible(false)
        setErrMessage(null)
        setData({})
        setValues({})
        setSelectedWhType({})
        setSelectedProvince({})
        setSelectedSubDistrict({})
    }

    const initFormSelect = () => {
        Promise.all([
            dispatch(actions.getSelectWarehouseType()).then(e => {
                setWarehouseType(e)
            }),
            dispatch(actions.getSelectWarehouseProvince()).then(e => {
                setProvince(e)
            })
        ])
    }

    const handleOnChangeProvince = (selectedProvince) => {
        setSelectedProvince(selectedProvince);
        if (selectedProvince.value) {
            dispatch(actions.getSelectSubDistrictBaseOnProvince(selectedProvince.value))
                .then(e => {
                    setSubDistrict(e)
                })
        }
    }

    const autoFillEditForm = (dataEdit) => {
        setData(dataEdit)
        setIsChecked(dataEdit?.autoNotif)
        setSelectedProvince({
            label: dataEdit?.provinceName,
            value: dataEdit?.provinceId
        })
        setSelectedSubDistrict({
            label: dataEdit?.subDistrictName,
            value: dataEdit?.subDistrictId
        })
        setSelectedWhType({
            label: dataEdit?.whType,
            value: dataEdit?.whTypeId
        })
        setMapKey(Date.now())
    }

    const handleOnChangeSubDistrict = (selectedSubDistrict) => {
        setSelectedSubDistrict(selectedSubDistrict);
    }

    const handleOnChangeWhType = (selectedWhType) => {
        setSelectedWhType(selectedWhType);
    }

    const handleCreate = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            mProjectId: projectId,
            whName: values?.warehouseName || data?.whName,
            whCode: values?.warehouseCode || data?.whCode,
            isMainWH: true,
            whTypeId: selectedWhType?.value,
            provinceId: selectedProvince?.value,
            subDistrictId: selectedSubDistrict?.value,
            whAddress: values?.address || data?.whAddress,
            whSpace: values?.warehouseSpace || data?.whSpace,
            whLongitude: values?.longitude ? values?.longitude.toString() : null,
            whLatitude: values?.latitude ? values?.latitude.toString() : null,
            LMBY: Global?.user?.userID,
            autoNotif: isChecked
        }

        const err = []
        if (payload.provinceId === undefined) err.push('Province')
        if (payload.subDistrictId === undefined) err.push('Sub District')
        if (payload.whTypeId === undefined) err.push('WH Type')

        let methode = "POST"

        if (isEdit) {
            methode = "PUT"
            payload.whId = data?.whId
        }

        if (err.length > 0) {
            setErrMessage(err.join(' , '))
            setVisible(true)
        } else {
            dispatch(actions.createWarehouse(payload, methode))
            setData({})
            setValues({})
            setOpen(false)
        }
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

    const handleToggle = () => {
        setIsChecked(!isChecked)
    };

    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
        >
            <CModalHeader>
                <CModalTitle>{isEdit ? 'EDIT' : 'ADD'} WAREHOUSE</CModalTitle>
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
                                    <Select
                                        className="input-select"
                                        options={warehouseType}
                                        isSearchable={true}
                                        value={selectedWhType}
                                        onChange={handleOnChangeWhType}
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
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Auto Notification Inventory</CFormLabel>
                                <CCol>
                                    <CFormSwitch
                                        size="lg"
                                        id="toggle-switch"
                                        checked={isChecked}
                                        onChange={handleToggle}
                                    />
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <Alert
                                message={errMessage}
                                visible={visible}
                                setVisible={setVisible}
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

export default ModalCreateWarehouse;
