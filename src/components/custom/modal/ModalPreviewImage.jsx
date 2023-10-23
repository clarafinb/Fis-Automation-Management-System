import React, { useState } from 'react';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CRow,
    CCol,
    CCard,
    CImage,
    CCardHeader,
    CCardBody,
    CCollapse,
} from '@coreui/react'
import ButtonCancel from 'src/components/custom/button/ButtonCancel';
import CIcon from '@coreui/icons-react';
import { cilImage } from '@coreui/icons';
import ModalDetailImage from './ModalDetailImage';

function ModalPreviewImage({ open, setOpen, urlImage, imageName }) {
    const [openImageDetail, setOpenImageDetail] = useState(false);

    const handlePreviewPhoto = (path) => {
        setOpenImageDetail(true)
    }

    return (
        <>
            <CModal
                size="lg"
                visible={open}
                onClose={() => { setOpen(false) }}
                backdrop="static"
                keyboard={false}
            >
                <CModalHeader>
                    <CModalTitle>IMAGE</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className='mb-2'>
                        <CCol>
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardHeader>
                                            <p>
                                                <CIcon icon={cilImage}
                                                    className="me-2 text-warning" />
                                                {imageName}
                                            </p>
                                        </CCardHeader>
                                    </CCard>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CCollapse visible={true}>
                                        <CCard>
                                            <CCardBody>
                                                <CImage
                                                    className="d-block w-100"
                                                    src={urlImage}
                                                    alt={imageName}
                                                    // height={400}
                                                    onClick={(e) => handlePreviewPhoto(urlImage)}
                                                />
                                            </CCardBody>
                                        </CCard>
                                    </CCollapse>
                                </CCol>
                            </CRow>

                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    < CRow >
                        <CCol className="d-none d-md-block text-end py-3">
                            <ButtonCancel
                                label='CLOSE'
                                handleButton={() => setOpen(false)}
                            />
                        </CCol>
                    </CRow>
                </CModalFooter>
            </CModal>
            {/* MODAL DETAIL PHOTO */}
            <ModalDetailImage
                open={openImageDetail}
                setOpen={setOpenImageDetail}
                path={urlImage}
            />

        </>
    )
}


export default ModalPreviewImage
