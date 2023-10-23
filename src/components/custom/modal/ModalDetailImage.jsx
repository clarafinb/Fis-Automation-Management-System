import React from 'react';
import {
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CRow,
    CCol,
    CCardImage,
    CCard,
} from '@coreui/react'
import ButtonCancel from 'src/components/custom/button/ButtonCancel';

function ModalDetailImage({ open, setOpen, path }) {
    return (
        <>
            <CModal
                size="xl"
                visible={open}
                onClose={() => setOpen(false)}
                backdrop="static"
                keyboard={false}
            >
                <CModalHeader>
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
                                handleButton={() => setOpen(false)}
                            />
                        </CCol>
                    </CRow>
                </CModalFooter>
            </CModal>
        </>
    )
}


export default ModalDetailImage
