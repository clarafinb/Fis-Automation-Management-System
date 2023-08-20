import React from 'react';
import { useDropzone } from 'react-dropzone'
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CRow,
    CCol,
    CButton,
    CForm,
    CContainer,
} from '@coreui/react'
import { cilCloudUpload, cilFile } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import ButtonSubmit from '../button/ButtonSubmit';

function ModalUploadFile({
    open,
    setOpen,
    handleDownloadTemplate,
    templateName,
    handleUpload,
    useTemplate = true
}) {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps
    } = useDropzone({
        maxFiles: 1
    })

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ))

    const handleSubmit = (event) => {
        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('fileUpload', file);
        });
        handleUpload(formData)
        event.preventDefault()
        event.stopPropagation()
    }


    return (
        <>
            <CModal
                size="lg"
                visible={open}
                onClose={() => setOpen(false)}
                alignment='center'
            >
                <CModalHeader>
                    <CModalTitle>UPLOAD FILE</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        {useTemplate ?
                            <CCol className="d-none d-md-block">
                                <CButton
                                    onClick={handleDownloadTemplate}
                                    className="colorBtn-white">
                                    <CIcon
                                        icon={cilCloudUpload}
                                        className="me-2 text-warning" />
                                    DOWNLOAD {templateName}
                                </CButton>
                            </CCol>
                            : ''
                        }
                    </CRow>
                    <CRow>
                        <CCol>
                            <CForm onSubmit={handleSubmit} encType="multipart/form-data">
                                <CRow>
                                    <CCol>
                                        <CContainer>
                                            <CRow className='mb-3'>
                                                <CCol {...getRootProps({ className: 'dropzone' })}>
                                                    <input {...getInputProps()} />
                                                    <CIcon
                                                        icon={cilFile}
                                                        className="me-2 text-warning mb-2"
                                                        size='5xl'
                                                    />
                                                    <h6>Drop your file here, or <span className='text-warning'>Browse</span></h6>
                                                    <p>Maksimum fole size 50mb</p>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol>
                                                    <h5>Files</h5>
                                                    <ul>{files}</ul>
                                                </CCol>
                                            </CRow>
                                        </CContainer>
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CCol className="d-grid gap-2">
                                        <ButtonSubmit type="submit" />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        </>
    )
}


export default ModalUploadFile
