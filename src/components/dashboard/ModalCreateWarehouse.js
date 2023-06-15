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
import * as actions from '../../config/redux/Dashboard/actions'

function ModalCreateWarehouse({ open, setOpen, projectId }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [warehouseType, setWarehouseType] = useState([])
    const [province, setProvince] = useState([])

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
        console.log(values)
        let payload = {
            mProjectId: projectId,
            whName: values?.warehouseName,
            whCode: values?.warehouseCode,
            isMainWH: true,
            whTypeId: values?.warehouseType,
            provinceId: values?.province,
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
                        <CFormSelect
                            name="province"
                            options={province}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Address</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="address" value={values?.address} onChange={handleOnchange} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Longitude</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="longitude" value={values?.longitude} onChange={handleOnchange} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Latitude</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="latitude" value={values?.latitude} onChange={handleOnchange} />
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
