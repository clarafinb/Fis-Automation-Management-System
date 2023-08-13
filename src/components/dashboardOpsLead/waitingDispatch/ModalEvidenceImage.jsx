import React from 'react';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CRow,
    CCol,
    CCard,
    CCarousel,
    CCarouselItem,
    CImage,
    CCardBody,
    CCarouselCaption,
} from '@coreui/react'
import ButtonCancel from 'src/components/custom/button/ButtonCancel';

function ModalEvidenceImage({ open, setOpen, data }) {

    const handlePreviewPhoto = (path) => {
        window.open(path, '_blank')
    }

    return (
        <>
            <CModal
                size="lg"
                visible={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <CModalHeader>
                    <CModalTitle>EVIDENCE IMAGES</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardBody>
                                    <CCarousel controls indicators dark>
                                        {data.length > 0 && data.map((row1, index1) => (
                                            <CCarouselItem key={index1}>
                                                <CImage
                                                    className="d-block w-100"
                                                    src={row1?.deliveryEvidencePath}
                                                    alt={index1}
                                                    // height={400}
                                                    onClick={(e) => handlePreviewPhoto(row1?.deliveryEvidencePath)}
                                                />
                                            </CCarouselItem>
                                        ))}
                                    </CCarousel>
                                </CCardBody>
                            </CCard>
                            {/* </CCollapse> */}
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
        </>
    )
}


export default ModalEvidenceImage
