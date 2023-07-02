import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import {
    CButton,
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CCard,
    CCardImage,
    CCardBody,
    CFormInput,
    CInputGroup,
    CFormLabel,
    CForm,
} from '@coreui/react'
import * as actions from '../../config/redux/Global/actions'
import * as actionsDashboard from '../../config/redux/Dashboard/actions'
import Swal from "sweetalert2";
import ToggleSwitch from '../custom/toggle/ToggleSwitch';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function ModalPhoto({ open, setOpen, userId }) {
    const { dispatch, Global, Dashboard } = useRedux()
    const [fileUpload, setFileUpload] = useState(null);

    useEffect(() => {
        if (userId) {
            dispatch(actions.getListUserPhoto(userId))
        }
    }, [userId]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileUpload(file);
      };

    const handleDelete = (photoId) => {
        dispatch(actions.setStatusPhoto(photoId, userId))
    }

    const handleChecked = useCallback(
        (val, photoId) => {
            dispatch(actions.setStatusActivePhoto(val, photoId, userId))
        }, [dispatch]
    )

    const handleUploadImage = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        dispatch(actions.addNewPhotoUser(formData, userId))
        setFileUpload(null)
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
                <CModalTitle>Photo Profile collection</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CCol sm={6}>
                        <CForm onSubmit={handleUploadImage} encType="multipart/form-data">
                            <CFormLabel className="col-sm-6 col-form-label">Upload New Photo</CFormLabel>
                            <CInputGroup className="mb-3">
                                <CFormInput
                                    type="file"
                                    name="fileUpload"
                                    onChange={(e) => handleFileChange(e)}
                                />
                                <CButton
                                    type="submit"
                                    color="success"
                                >
                                    <FontAwesomeIcon icon={faUpload} />
                                </CButton>
                            </CInputGroup>
                        </CForm>
                    </CCol>
                </CRow>
                <CRow>
                    {Global?.listUserPhoto.map((val, index) => (
                        <CCol key={index} sm={4}>
                            <CCard style={{ marginBottom: 1 + 'em' }}>
                                <CCardImage orientation="top" src={val?.photoPath} width={100} height={200} />
                                <CCardBody>
                                    <CRow>
                                        <CCol sm={5}>
                                            <ToggleSwitch
                                                checked={() => val.IsActive ? true : false}
                                                size="lg"
                                                handleChecked={handleChecked}
                                                id={val.photoId}
                                            />
                                        </CCol>
                                        <CCol sm={7} className="d-none d-md-block">
                                            <div className='text-end'>
                                                {(!val.IsActive) ?
                                                    <CIcon
                                                        icon={cilTrash}
                                                        className="me-2"
                                                        size="xl"
                                                        onClick={() => handleDelete(val.photoId)}
                                                    />
                                                    : ''}
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalPhoto;
