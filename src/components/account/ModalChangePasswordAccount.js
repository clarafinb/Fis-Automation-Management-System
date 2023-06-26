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
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import Swal from "sweetalert2";

function ModalChangePasswordAccount({ open, setOpen, userId }) {
    const [values, setValues] = useState({})
    const { dispatch, Global } = useRedux()

    useEffect(() => {
        setValues({})
    }, [open]);
    
    const handleChangePassword = () => {
        if (values?.newPassword != values?.newPasswordRetype) {
            Swal.fire({
                title: 'Error!',
                text: 'Password Not Match',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } else {
            const payload = {
                userId: userId,
                oldPassword:values?.oldPassword,
                newPassword: values?.newPassword,
                LMBY: Global?.user?.userID,
            }
            dispatch(actions.updateUserPassword(payload))
            setValues({})
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
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
        >
            <CModalHeader>
                <CModalTitle>Change Password</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Old Password <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="password"
                            name="oldPassword"
                            value={values?.oldPassword}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">New Password <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="password"
                            name="newPassword"
                            value={values?.newPassword}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Retype new Password <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="password"
                            name="newPasswordRetype"
                            value={values?.newPasswordRetype}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleChangePassword}>Submit</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalChangePasswordAccount;
