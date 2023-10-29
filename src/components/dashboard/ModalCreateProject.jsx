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
    CForm
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import ButtonSubmit from '../custom/button/ButtonSubmit'
import Alert from 'src/components/custom/toast/Alert'
import Select from 'react-select'

function ModalCreateProject({ open, setOpen, dataEdit = {}, isEdit = false }) {
    const { dispatch, Global } = useRedux()

    const [values, setValues] = useState({})
    const [data, setData] = useState({})

    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)

    const [customerList, setCustomerList] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState({})

    const [logisticProcess, setLogisticProcess] = useState([])
    const [selectedProcessGroup, setSelectedProcessGroup] = useState({})

    useEffect(() => {
        setValues({})
        if (Global?.user?.token && open) {

            resetForm()
            initApi()

            if (isEdit) {
                autoFillEditForm(dataEdit)
            }
        }
    }, [Global?.user, open]);

    const resetForm = () => {
        setData({})
        setValues({})
        setSelectedCustomer({})
        setSelectedProcessGroup({})
        setErrMessage(null)
        setVisible(false)
    }

    const handleCreateProject = (event) => {

        event.preventDefault()
        event.stopPropagation()

        if (!isEdit) {
            createProject()
        } else {
            editProject()
        }
    }

    const createProject = () => {
        let payload = {
            mProjectName: values.projectName,
            mProjectDesc: values.description || '',
            mProjectCode: values?.projectCode,
            mCustomerId: selectedCustomer.value,
            logisticProcessId: selectedProcessGroup.value,
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
                .then(resp => {
                    if (resp === 'success') {
                        dispatch(actions.getListProject())
                        setOpen(false)
                    }
                })
        }
    }

    const editProject = () => {
        let payload = {
            mProjectId: data?.projectId,
            mProjectName: values?.projectName || data?.projectName,
            mProjectDesc: values?.description || data?.projectDesc,
            mCustomerId: selectedCustomer?.value,
            LMBY: Global?.user?.userID
        }

        const err = []
        if (payload.mCustomerId === undefined) err.push('Customer')

        if (err.length > 0) {
            setErrMessage(err.join(' , '))
            setVisible(true)
        } else {
            dispatch(actions.updateProject(payload))
                .then(resp => {
                    if (resp === 'success') {
                        dispatch(actions.getListProject())
                        setOpen(false)
                    }
                })
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

    const handleOnchangeCustomer = (selectedCustomer) => {
        setSelectedCustomer(selectedCustomer)
    }

    const handleOnchangeProcessGroup = (selectedProcessGroup) => {
        setSelectedProcessGroup(selectedProcessGroup)
    }

    const autoFillEditForm = (data) => {
        setData(data)
        setSelectedCustomer({
            label: data?.customerName,
            value: data?.customerId
        })
    }

    const initApi = () => {
        dispatch(actions.getSelectActiveCustomer()).then(e => {
            setCustomerList(e)
        })
        dispatch(actions.getMasterLogisticProcessActiveOnly()).then(e => {
            setLogisticProcess(e)
        })
    }

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
                    <CModalTitle>{!isEdit ? 'ADD' : 'EDIT'} PROJECT</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {
                        !isEdit ?
                            <>
                                <CRow className="mb-3">
                                    <CFormLabel >Project Code <code>*</code></CFormLabel>
                                    <CCol>
                                        <CFormInput
                                            type="text"
                                            name="projectCode"
                                            value={values?.projectCode}
                                            onChange={handleOnchange}
                                            required
                                        />
                                    </CCol>
                                </CRow>
                            </>
                            : ''
                    }
                    <CRow className="mb-3">
                        <CFormLabel >Customer <code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={customerList}
                                isSearchable={true}
                                value={selectedCustomer}
                                onChange={handleOnchangeCustomer}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel >Project Name <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="projectName"
                                value={values?.projectName || data?.projectName}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    {
                        !isEdit ?
                            <>
                                <CRow className="mb-3">
                                    <CFormLabel >Process Group <code>*</code></CFormLabel>
                                    <CCol>
                                        <Select
                                            className="input-select"
                                            options={logisticProcess}
                                            isSearchable={true}
                                            value={selectedProcessGroup}
                                            onChange={handleOnchangeProcessGroup}
                                            required
                                        />
                                    </CCol>
                                </CRow>
                            </>
                            : ''
                    }
                    <CRow className="mb-3">
                        <CFormLabel >Description</CFormLabel>
                        <CCol>
                            <CFormTextarea
                                rows={3}
                                name="description"
                                value={values?.description || data?.projectDesc}
                                onChange={handleOnchange}
                            />
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
                            <ButtonSubmit
                                type="submit"
                                label={!isEdit ? 'SAVE' : 'UPDATE'}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
            </CForm>
        </CModal>
    )
}

export default ModalCreateProject;
