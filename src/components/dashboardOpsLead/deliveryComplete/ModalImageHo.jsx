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
    CCarousel,
    CCarouselItem,
    CImage,
    CInputGroup,
    CFormInput,
    CButton,
    CCardHeader,
    CCardBody,
    CCollapse,
} from '@coreui/react'
import ButtonCancel from 'src/components/custom/button/ButtonCancel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import debounce from "lodash.debounce"
import CIcon from '@coreui/icons-react';
import { cilImage } from '@coreui/icons';

function ModalOpenMap({ open, setOpen, data }) {
    const detail = data.getAllEvidences
    const [openImageDetail, setOpenImageDetail] = useState(false);
    const [path, setPath] = useState('')
    const [visible, setVisible] = useState({})

    const handlePreviewPhoto = (path) => {
        setOpenImageDetail(true)
        setPath(path)
    }

    const handleOnchange = debounce(
        (e) => {
            //   const { value } = e.target;
            //   setFilteredProject(Dashboard?.listProject)

            //   if (value?.length > 2) {
            //     setSearchProject(value.toLowerCase())
            //   }
        },
        // searchProject ? 500 : 0
    )

    const handleVisible = (index) => {
        setVisible((prev) => ({
            ...prev,
            [index]: visible?.[index] ? !visible?.[index] : true
        }));
    }

    return (
        <>
            <CModal
                size="lg"
                visible={open}
                onClose={() => {
                    setOpen(false)
                    setVisible({})
                }}
            >
                <CModalHeader>
                    <CModalTitle>IMAGES</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CFormInput type="text" name="search" placeholder="Search" onChange={handleOnchange} />
                                <CButton type="button" className='colorBtnIcon-white'>
                                    <FontAwesomeIcon icon={faSearch} size='sm' />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    {detail?.map((row, index) => (
                        <CRow key={index} className='mb-2'>
                            <CCol>
                                <CRow>
                                    <CCol>
                                        <CCard onClick={() => handleVisible(index)}>
                                            <CCardHeader>
                                                <p><CIcon icon={cilImage} className="me-2 text-warning" />{row.checklistName}</p>
                                            </CCardHeader>
                                        </CCard>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol>
                                        <CCollapse visible={visible?.[index]}>
                                            <CCard>
                                                <CCardBody>
                                                    <CCarousel controls indicators>
                                                        {row.getEvidenceChecklists?.map((row1, index1) => (
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
                                        </CCollapse>
                                    </CCol>
                                </CRow>

                            </CCol>
                        </CRow>
                    ))}
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
