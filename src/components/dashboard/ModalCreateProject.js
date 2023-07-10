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
    CFormTextarea,
    CFormSelect
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import ButtonSubmit from '../custom/button/ButtonSubmit'

function ModalCreateProject({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [customerList, setCustomerList] = useState([])


    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getSelectActiveCustomer()).then(e => {
                setCustomerList(e)
            })
        }
    }, [Global?.user]);

    const handleCreateProject = () => {

        let payload = {
            mProjectName: values.projectName,
            mProjectDesc: values.description,
            mProjectCode: values.projectCode,
            mCustomerId: values.customerId,
            LMBY: Global?.user?.userID
        }

        dispatch(actions.createProject(payload))
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
            // size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            alignment="center"
        >
            <CModalHeader>
                <CModalTitle>ADD PROJECT</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel >Project Name</CFormLabel>
                    <CCol>
                        <CFormInput type="text" name="projectName" value={values?.projectName} onChange={handleOnchange} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel >Project Code</CFormLabel>
                    <CCol>
                        <CFormInput type="text" name="projectCode" value={values?.projectCode} onChange={handleOnchange} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel >Customer</CFormLabel>
                    <CCol>
                        <CFormSelect
                            name="customerId"
                            options={customerList}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel >Description</CFormLabel>
                    <CCol>
                        <CFormTextarea rows={3} name="description" value={values?.description} onChange={handleOnchange}></CFormTextarea>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol className="d-grid gap-2">
                        <ButtonSubmit handleButton={handleCreateProject} />
                    </CCol>
                </CRow>
            </CModalBody>
        </CModal>
    )
}

export default ModalCreateProject;
