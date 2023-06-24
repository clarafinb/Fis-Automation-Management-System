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
    CInputGroup
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";
import Select from 'react-select'

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
        if (Global?.user?.token) {
            dispatch(actions.getSelectRolesByRoleId(Global?.user?.roleInf?.roleId)).then(e => {
                setRole(e)
            })
            setData({})
        }
    }, [Global?.user?.token]);

    useEffect(() => {
        setData({})
        if (isEdit) {
            setSelectedRole({
                label: dataEdit?.detail?.roleName,
                value: dataEdit?.detail?.roleId
            })
            setData(dataEdit)
        }
    }, [isEdit, open]);

    const handleCreateAccountManagement = () => {
        let payload = {
            Fullname: values.Fullname ? values.Fullname : data.fullname,
            userTitle: values.userTitle ? values.userTitle : data.userTitle,
            email: values.email ? values.email : data.email,
            userLogin: values.userLogin ? values.userLogin : data?.detail?.userLogin,
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
                <CModalTitle>Add User Account</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Name <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="Fullname"
                            value={values?.Fullname ? values?.Fullname : data?.fullname}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Email <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="email"
                            value={values?.email ? values?.email : data?.email}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Role <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <Select
                            className="input-select"
                            options={role}
                            isSearchable={true}
                            value={selectedRole}
                            onChange={handleOnChangeRole}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">User Title</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="userTitle"
                            value={values?.userTitle ? values?.userTitle : data?.userTitle}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Employee ID</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="employeeId"
                            value={values?.employeeId ? values?.employeeId : data?.employeeId}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Phone No</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="phoneNo"
                            value={values?.phoneNo ? values?.phoneNo : data?.phoneNo}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">User Login <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                type="text"
                                name="userLogin"
                                value={values?.userLogin ? values?.userLogin : data?.detail?.userLogin}
                                onChange={handleOnchange}
                            />
                            <CButton type="button"
                                color="warning"
                                onClick={(e) => handleCheckUserExist(values?.userLogin)}>
                                <FontAwesomeIcon icon={faSearch} className='textBlue' />
                            </CButton>
                        </CInputGroup>
                    </CCol>
                </CRow>
                {
                    !isEdit ?
                        <CRow className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label">User Password <code>(*)<br /> Min 6 chars</code></CFormLabel>
                            <CCol sm={10}>
                                <CFormInput
                                    type="password"
                                    name="userPassword"
                                    value={values?.userPassword}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                        : ''
                }
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreateAccountManagement}>Submit</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateAccountManagement;
