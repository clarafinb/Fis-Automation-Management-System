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
    CFormSelect,
    CForm
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import ButtonSubmit from '../custom/button/ButtonSubmit'
import Alert from 'src/components/custom/toast/Alert'

function ModalCreateProject({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [customerList, setCustomerList] = useState([])
    const [logisticProcess, setLogisticProcess] = useState([])
    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)


    useEffect(() => {
        setValues({})
        if (Global?.user?.token && open) {
            dispatch(actions.getSelectActiveCustomer()).then(e => {
                setCustomerList(e)
            })

            dispatch(actions.getMasterLogisticProcessActiveOnly()).then(e => {
                setLogisticProcess(e)
            })
        }
    }, [Global?.user, open]);

    const handleCreateProject = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            mProjectName: values.projectName,
            mProjectDesc: values.description || '',
            mProjectCode: values?.projectCode,
            mCustomerId: values.customerId,
            logisticProcessId: values.logisticProcessId,
            LMBY: Global?.user?.userID
        }

        const err = []
        if (payload.mCustomerId === undefined) err.push('Customer')
        if (payload.logisticProcessId === undefined) err.push('Process Group')

        if (err.length > 0) {
            setErrMessage(err.join(' , '))
            setVisible(true)
        } else {
            dispatch(actions.createProject(payload))
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

    return (
        <CModal
            size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
            alignment="center"
        >
            <CForm onSubmit={handleCreateProject}>
                <CModalHeader>
                    <CModalTitle>ADD PROJECT</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        <CFormLabel >Project Name <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput type="text" name="projectName" value={values?.projectName} onChange={handleOnchange} required/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel >Project Code <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput type="text" name="projectCode" value={values?.projectCode} onChange={handleOnchange} required/>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel >Customer <code>*</code></CFormLabel>
                        <CCol>
                            <CFormSelect
                                name="customerId"
                                options={customerList}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel >Process Group <code>*</code></CFormLabel>
                        <CCol>
                            <CFormSelect
                                name="logisticProcessId"
                                options={logisticProcess}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel >Description</CFormLabel>
                        <CCol>
                            <CFormTextarea rows={3} name="description" value={values?.description} onChange={handleOnchange}></CFormTextarea>
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
                </CModalBody>
            </CForm>
        </CModal>
    )
}

export default ModalCreateProject;
