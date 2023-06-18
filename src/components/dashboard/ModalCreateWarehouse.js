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
    CFormTextarea
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import Select from 'react-select'
import GeocodingForm from '../custom/map/OpenStreetMap'

function ModalCreateWarehouse({ open, setOpen, projectId }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [warehouseType, setWarehouseType] = useState([])
    const [province, setProvince] = useState([])
    const [selectedProvince, setSelectedProvince] = useState(null);

    const handleOnChangeProvince = (selectedProvince) => {
        setSelectedProvince(selectedProvince);
    }

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getSelectWarehouseType()).then(e => {
                setWarehouseType(e)
            })

            dispatch(actions.getSelectWarehouseProvince()).then(e => {
                setProvince(e)
            })
        }
    }, [Global?.user]);

    const handleCreate = () => {
        let payload = {
            mProjectId: projectId,
            whName: values?.warehouseName,
            whCode: values?.warehouseCode,
            isMainWH: true,
            whTypeId: values?.warehouseType,
            provinceId: selectedProvince?.value,
            whAddress: values?.address,
            whLongitude: values?.longitude,
            whLatitude: values?.latitude,
            LMBY: Global?.user?.userID
        }

        dispatch(actions.createWarehouse(payload))
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
        >
            <CModalHeader>
                <CModalTitle>Warehouse Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Warehouse Name <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="warehouseName" value={values?.warehouseName} onChange={handleOnchange} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Warehouse Code <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="warehouseCode" value={values?.warehouseCode} onChange={handleOnchange} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Warehouse Type <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormSelect
                            name="warehouseType"
                            options={warehouseType}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
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
                    <CFormLabel className="col-sm-2 col-form-label">Address</CFormLabel>
                    <CCol sm={10}>
                        <CFormTextarea rows={3} name="address" value={values?.address} onChange={handleOnchange}></CFormTextarea>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Location</CFormLabel>
                    <CCol sm={10}>
                        <GeocodingForm handleSetLongLat={handleSetLongLat} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Longitude</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="longitude" value={values?.longitude} className='bg-light' readOnly />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Latitude</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="latitude" value={values?.latitude} readOnly className='bg-light' />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreate}>Add</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateWarehouse;
