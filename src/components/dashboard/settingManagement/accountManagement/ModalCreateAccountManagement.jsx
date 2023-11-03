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
    CInputGroup,
    CForm
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";
import Select from 'react-select'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateAccountManagement({ open, setOpen, isEdit, dataEdit }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [role, setRole] = useState([])
    const [data, setData] = useState({})
    const [selectedRole, setSelectedRole] = useState(null)

    const handleOnChangeRole = (selectedRole) => {
        setSelectedRole(selectedRole);
    }

    useEffect(() => {
        if (Global?.user?.token && open) {

            resetForm()
            initFormSelect()

            if (isEdit) autoFillEditForm(dataEdit)
        }
    }, [Global?.user?.token, open]);

    const initFormSelect = () => {
        Promise.all([
            dispatch(actions.getSelectRolesByRoleId(Global?.user?.roleInf?.roleId)).then(e => {
                setRole(e)
            })
        ])
    }

    const autoFillEditForm = (dataEdit) => {
        setData(dataEdit)
        setSelectedRole({
            label: dataEdit?.roleName,
            value: dataEdit?.roleId
        })
    }

    const resetForm = () => {
        setData({})
        setValues({})
        setSelectedRole({})
    }

    const handleCreateAccountManagement = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            Fullname: values.Fullname ? values.Fullname : data.fullname,
            userTitle: values.userTitle ? values.userTitle : data.userTitle,
            email: values.email ? values.email : data.email,
            userLogin: values.userLogin ? values.userLogin : data?.userLogin,
            userPassword: values.userPassword,
            phoneNo: values.phoneNo ? values.phoneNo : data.phoneNo,
            employeeId: values.employeeId ? values.employeeId : data.employeeId,
            LMBY: Global?.user?.userID,
            roleId: selectedRole?.value,
        }

        if (isEdit) {
            payload.userId = data?.userId
            delete payload.userPassword
            dispatch(actions.updateAccountManagement(payload))
        } else {
            handleCheckUserExist(values.userLogin)
            dispatch(actions.createAccountManagement(payload))
        }

        setData({})
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

    const handleCheckUserExist = (userLogin) => {
        dispatch(actions.getUserLoginExist(userLogin)).then(val => {
            if (val?.status != 'success') {
                Swal.fire({
                    title: 'Error!',
                    text: val?.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        })
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
                <CModalTitle>ADD USER</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateAccountManagement}>
                    <CRow>
                        <CCol>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Name <code>*</code></CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="Fullname"
                                        value={values?.Fullname ? values?.Fullname : data?.fullname}
                                        onChange={handleOnchange}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Email <code>*</code></CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="email"
                                        value={values?.email ? values?.email : data?.email}
                                        onChange={handleOnchange}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Role <code>*</code></CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={role}
                                        isSearchable={true}
                                        value={selectedRole}
                                        onChange={handleOnChangeRole}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">User Title</CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="userTitle"
                                        value={values?.userTitle ? values?.userTitle : data?.userTitle}
                                        onChange={handleOnchange}
                                    />
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Employee ID</CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="employeeId"
                                        value={values?.employeeId ? values?.employeeId : data?.employeeId}
                                        onChange={handleOnchange}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Phone No</CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="phoneNo"
                                        value={values?.phoneNo ? values?.phoneNo : data?.phoneNo}
                                        onChange={handleOnchange}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">User Login <code>*</code></CFormLabel>
                                <CCol>
                                    <CInputGroup>
                                        <CFormInput
                                            type="text"
                                            name="userLogin"
                                            value={values?.userLogin ? values?.userLogin : data?.userLogin}
                                            onChange={handleOnchange}
                                            required
                                        />
                                        <CButton type="button" className='colorBtnIcon-white' onClick={(e) => handleCheckUserExist(values?.userLogin)}>
                                            <FontAwesomeIcon icon={faSearch} size='sm' />
                                        </CButton>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            {
                                !isEdit ?
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-form-label">User Password <code>*<small> Min 6 chars</small></code></CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="password"
                                                name="userPassword"
                                                value={values?.userPassword}
                                                onChange={handleOnchange}
                                                required
                                            />
                                        </CCol>
                                    </CRow>
                                    : ''
                            }
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

export default ModalCreateAccountManagement;
