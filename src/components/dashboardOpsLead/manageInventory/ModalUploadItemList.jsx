import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCol,
    CRow,
    CFormInput,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CInputGroup
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'

function ModalUploadItemList({ open, setOpen, whId, type = 'item' }) {
    const { dispatch, Global } = useRedux()
    const [fileUpload, setFileUpload] = useState(null);
    const [templateUrl, setTemplateUrl] = useState("")
    const [templateName, setTemplateName] = useState("")

    useEffect(() => {
        if (Global?.user?.userID && open) {
            dispatch(
                actions.getMassUploadInboundTemplate()
            ).then(reps => {
                setTemplateName(reps.templateName)
                setTemplateUrl(reps.templateURL)
            })
        }
    }, [Global?.user?.userID, open]);

    const handleDownloadTemplate = () => {
        window.open(templateUrl, '_blank')
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileUpload(file);
    };

    const handleUploadFile = (e) => {
        e.preventDefault()
        if (fileUpload) {
            const formData = new FormData(e.target);
            if (type === 'item') {
                dispatch(actions.inboundItemFileUpload(
                    formData,
                    whId
                ))
            } else {
                dispatch(actions.inboundBoxFileUpload(
                    formData,
                    whId
                ))
            }
            setFileUpload(null)
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'File Empty !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const handleCloseModalUpload = () => {
        setOpen(false)
        setFileUpload(null)
    }


    return (
        <CModal
            size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            alignment='center'
        >
            <CModalHeader>
                <CModalTitle>Item List Upload</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CCol sm={6}>
                        <CForm onSubmit={handleUploadFile} encType="multipart/form-data">
                            <CInputGroup className="mb-3">
                                <CFormInput
                                    type="file"
                                    name="fileUpload"
                                    onChange={(e) => handleFileChange(e)}
                                />
                                <CButton
                                    type="submit"
                                    color="success"
                                    title='upload file'
                                >
                                    <FontAwesomeIcon icon={faUpload} />
                                </CButton>
                            </CInputGroup>
                        </CForm>
                    </CCol>
                    <CCol>
                        <CButton
                            onClick={handleDownloadTemplate}
                            color="info">
                            Download {templateName}
                        </CButton>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <ButtonCancel
                    label='CLOSE'
                    handleButton={handleCloseModalUpload}>
                </ButtonCancel>
            </CModalFooter>
        </CModal>
    )
}

export default ModalUploadItemList;