import React from 'react';
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
                                                <CCol key={index1} sm={4}>
                                                    <CCard className='mb-2'>
                                                        <CCardImage
                                                            orientation="top"
                                                            src={row1?.deliveryEvidencePath}
                                                            width={100}
                                                            height={200} />
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
        </>
    )
}


export default ModalOpenMap
