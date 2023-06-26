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
    CCard,
    CCardImage,
    CCardBody,
    CCardTitle,
    CCardText,
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import Swal from "sweetalert2";
import ToggleSwitch from '../custom/toggle/ToggleSwitch';
import { cilSend, cilSettings } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

function ModalPhoto({ open, setOpen, userId }) {
    const [values, setValues] = useState({})
    const { dispatch, Global } = useRedux()

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
                oldPassword: values?.oldPassword,
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
                <CModalTitle>Photo Profile collection</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCard style={{ width: '18rem' }}>
                    <CCardImage orientation="top" src='/images/dummy-image.jpg' width={100} height={200} />
                    <CCardBody>
                        {/* <CCardTitle>Card title</CCardTitle>
                        <CCardText>
                            Some quick example text to build on the card title and make up the bulk of the cards content.
                        </CCardText>
                        <CButton href="#">Go somewhere</CButton> */}
                        <CRow>
                            <CCol sm={5}>
                                <ToggleSwitch
                                    // checked={() => val.activeStatus === "active" ? true : false}
                                    checked={(e) => true}
                                    size="lg"
                                    // handleChecked={handleChecked}
                                    id={2}
                                />
                            </CCol>
                            <CCol sm={7} className="d-none d-md-block">
                                <div className='text-end'>
                                    <CIcon
                                        icon={cilSettings}
                                        className="me-2"
                                        size="xl"
                                    // onClick={() => handleModalMasterWerehouse(val.projectId)}
                                    />
                                    {/* {(val.publishStatus === "notPublished" && val.activeStatus != "inactive") && ( */}
                                    <CIcon
                                        icon={cilSend}
                                        className="me-2"
                                        size="xl"
                                    // onClick={() => handleSend(val.projectId)}
                                    />
                                    {/* )} */}
                                </div>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
                {/* <CRow className="mb-3">
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
                </CRow> */}
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleChangePassword}>Submit</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalPhoto;
