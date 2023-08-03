import React, { useState, useCallback } from 'react'
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
    CFormSelect,
} from '@coreui/react'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateMasterLocation({ 
    open, 
    setOpen, 
    routeCategoryList, 
    projectId 
}) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [selectedRouteCategory, setSelectedRouteCategory] = useState(null)

    const handleOnchangeRouteCategory = (selectedRouteCategory) => {
        setSelectedRouteCategory(selectedRouteCategory);
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

    const handleCreate = () => {
        const payload = {
            projectId: projectId,
            pointCode: values.pointCode,
            address: values.address,
            longitude: values.longitude,
            latitude: values.latitude,
            LMBY: Global.user.userID,
            routeTypeCode: values.address,
        }
        dispatch(actions.createMasterLocation(payload))
    }

    return (
        <CModal
            size="lg"
            visible={open}
            onClose={() => {
                setValues({})
                setOpen(false)
            }}
            alignment='center'
        >
            <CModalHeader>
                <CModalTitle>Add Master Location</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Point Code  <code>*</code></CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="pointCode"
                                    value={values?.pointCode}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Address <code>*</code></CFormLabel>
                            <CCol>
                                <CFormTextarea
                                    rows={4}
                                    name="address"
                                    value={values?.address}
                                    onChange={handleOnchange}
                                >
                                </CFormTextarea>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Longitude  <code>*</code></CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="longitude"
                                    value={values?.longitude}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Latitude <code>*</code></CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="latitude"
                                    value={values?.latitude}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Route Category <code>*</code></CFormLabel>
                            <CCol>
                                <CFormSelect
                                    name="routeTypeCode"
                                    options={routeCategoryList}
                                    value={selectedRouteCategory}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                        <CCol className="d-grid gap-2">
                            <ButtonSubmit handleButton={handleCreate} />
                        </CCol>
                    </CRow>
            </CModalBody>
        </CModal>
    )
}

export default ModalCreateMasterLocation;
