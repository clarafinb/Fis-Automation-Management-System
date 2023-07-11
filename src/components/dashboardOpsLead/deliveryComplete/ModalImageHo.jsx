import React, { useState } from 'react';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CRow,
    CCol,
    CCardImage,
    CCard,
} from '@coreui/react'
import ButtonCancel from 'src/components/custom/button/ButtonCancel';

function ModalOpenMap({ open, setOpen, data }) {
    const detail = data.getAllEvidences
    const [openImageDetail, setOpenImageDetail] = useState(false);
    const [path, setPath] = useState('')

    const handlePreviewPhoto = (path) => {
        setOpenImageDetail(true)
        setPath(path)
    }

    return (
        <>
            <CModal
                size="xl"
                visible={open}
                onClose={() => setOpen}
            >
                <CModalHeader>
                    <CModalTitle>IMAGES</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow >
                        <CCol sm={12}>
                            <ul>
                                {detail?.map((row, index) => (
                                    <li key={index + 1}>
                                        <p>{row.checklistName}</p>
                                        <CRow>
                                            {row.getEvidenceChecklists?.map((row1, index1) => (
                                                <CCol key={index1} sm={2}>
                                                    <CCard className='mb-2'>
                                                        <CCardImage
                                                            orientation="top"
                                                            src={row1?.deliveryEvidencePath}
                                                            width={10}
                                                            height={50}
                                                            onClick={(e) => handlePreviewPhoto(row1?.deliveryEvidencePath)}
                                                        />
                                                    </CCard>
                                                </CCol>
                                            ))}
                                        </CRow>
                                    </li>
                                ))}
                            </ul>
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
            <CModal
                size="xl"
                visible={openImageDetail}
                onClose={() => setOpenImageDetail}
            >
                <CModalHeader>
                    {/* <CModalTitle>IMAGES DETAIL</CModalTitle> */}
                </CModalHeader>
                <CModalBody>
                    <CRow >
                        <CCol sm={12}>
                            <CCard className='mb-2'>
                                <CCardImage
                                    orientation="top"
                                    src={path}
                                    width={300}
                                    height={400}
                                />
                            </CCard>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    < CRow >
                        <CCol className="d-none d-md-block text-end py-3">
                            <ButtonCancel
                                label='CLOSE'
                                handleButton={() => setOpenImageDetail(false)}
                            />
                        </CCol>
                    </CRow>
                </CModalFooter>
            </CModal>
        </>
    )
}


export default ModalOpenMap
