import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CFormLabel,
    CFormInput,
    CButton,
    CInputGroup,
    CCardFooter,
    CImage
} from '@coreui/react'
import * as actions from '../../config/redux/Global/actions'
import * as actionsDashboard from '../../config/redux/Dashboard/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhotoFilm, faSearch } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";
import Select from 'react-select'
import ModalChangePasswordAccount from 'src/components/account/ModalChangePasswordAccount'
import ModalPhoto from 'src/components/account/ModalPhoto'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const nav = useNavigate();
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [modalPhoto, setModalPhoto] = useState(false)
    const [values, setValues] = useState({})
    const [role, setRole] = useState([])
    const [data, setData] = useState({})
    const [selectedRole, setSelectedRole] = useState(null)
    const [photoPath, setPhotoPath] = useState({})

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actionsDashboard.getSelectRolesByRoleId(Global?.user?.roleInf?.roleId)).then(e => {
                setRole(e)
            })
        
            dispatch(actions.getDetailProfile(Global?.user?.userID)).then(resp => {
                setData(resp)
                setSelectedRole({ label: resp.roleName, value: resp.roleId })
            })
        }
    }, [Global?.user?.token]);

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getUserActivePhoto(Global?.user?.userID)).then(resp => {
                setPhotoPath(resp)
                Global.user = { ...Global.user, ...{photoPath: resp}}
                dispatch(actions.actionSetReduxUser(Global.user))
            })
        }
    }, [Global?.user?.token, modalPhoto]);

    console.log(Global)

    const handleOnChangeRole = (selectedRole) => {
        setSelectedRole(selectedRole);
    }

    const handleCreate = () => {
        setModalCreate(true)
    }


    const handleEditAccountManagement = () => {
        let payload = {
            userId: data?.userId,
            Fullname: values.Fullname ? values.Fullname : data.fullname,
            userTitle: values.userTitle ? values.userTitle : data.userTitle,
            email: values.email ? values.email : data.email,
            userLogin: values.userLogin ? values.userLogin : data?.userLogin,
            phoneNo: values.phoneNo ? values.phoneNo : data.phoneNo,
            employeeId: values.employeeId ? values.employeeId : data.employeeId,
            LMBY: Global?.user?.userID,
            roleId: selectedRole?.value,
        }
        dispatch(actionsDashboard.updateAccountManagement(payload))
        setData({})
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
        dispatch(actionsDashboard.getUserLoginExist(userLogin)).then(val => {
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

    const handleManagePhoto = () => {
        setModalPhoto(true)
    }

    return (
        <>
            <CCard className="">
                <CCardHeader>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Profile
                            </h4>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <br />
                    <CRow>
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
                                        value={values?.userLogin ? values?.userLogin : data?.userLogin}
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
                        <CRow className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label">Photo Profile</CFormLabel>
                            <CCol sm={10}>
                                <CRow>
                                    <CCol>
                                        <CImage rounded thumbnail src={photoPath} width={200} height={200} />
                                    </CCol>
                                </CRow>
                                <CRow className='py-3'>
                                    <CCol>
                                        <CButton type="button"
                                            color="warning"
                                            onClick={(e) => handleManagePhoto()}>
                                            Manage Photo &nbsp;
                                            <FontAwesomeIcon icon={faPhotoFilm} className='textBlue' />
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CRow>
                </CCardBody>
                <CCardFooter>
                    <CRow className="sm-12">
                        <CCol sm={4}>
                            <CButton onClick={() => nav('/')} color="secondary">Close</CButton>
                            &nbsp;&nbsp;&nbsp;
                            <CButton onClick={handleCreate} color="success">Change Password</CButton>
                            &nbsp;&nbsp;&nbsp;
                            <CButton color="primary" onClick={handleEditAccountManagement}>Update</CButton>
                        </CCol>
                    </CRow>
                </CCardFooter>
            </CCard >
            < ModalChangePasswordAccount
                open={modalCreate}
                setOpen={setModalCreate}
                userId={data?.userId}
            />
            < ModalPhoto
                open={modalPhoto}
                setOpen={setModalPhoto}
                userId={data?.userId}
            />
        </>
    )
}

export default Profile