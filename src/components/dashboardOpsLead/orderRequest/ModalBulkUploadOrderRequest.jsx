import React, { useEffect, useState } from 'react';
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
    CFormLabel,
} from '@coreui/react'
import { cilCloudUpload, cilFile } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit';
import Select from 'react-select'
import { useRedux } from 'src/utils/hooks';
import * as actions from '../../../config/redux/DashboardOpsLead/actions'

function ModalBulkUploadOrderRequest({
    open,
    setOpen,
    // handleDownloadTemplate,
    // templateName,
    // handleUpload,
    useTemplate = true,
    data
}) {

    const { dispatch, Global } = useRedux()

    const [deliveryProcess, setDeliveryProcess] = useState([])
    const [selectedDeliveryProcess, setSelectedDeliveryProcess] = useState({});

    const [routeType, setRouteType] = useState([])
    const [selectedRouteType, setSelectedRouteType] = useState({});

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

    useEffect(() => {
        if (Global?.user?.token && open) {

            setSelectedDeliveryProcess({})
            setSelectedRouteType({})

            dispatch(actions.getSelectDeliveryProcessPackageProcess(data.packageProcessId))
                .then(e => {
                    setDeliveryProcess(e)
                })
            dispatch(actions.getSelecRouteTypePackageProcess(data.packageProcessId))
                .then(e => {
                    setRouteType(e)
                })
        }
    }, [Global?.user, open]);

    const handleDownloadTemplate = () => {
        dispatch(
            actions.getBulkOrderRequestDeliveryTemplate()
        ).then(response => {
            window.open(response?.templateURL, '_blank')
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('fileUpload', file);
            formData.append('deliveryProcessId', selectedDeliveryProcess?.value);
            formData.append('routeTypeId', selectedDeliveryProcess?.value);
        });

        // Display the key/value pairs
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        if (formData) {
            console.log('isi')
        } else {
            console.log('kosong')
        }

    }

    const handleOnChangeDeliveryProcess = (selectedDeliveryProcess) => {
        setSelectedDeliveryProcess(selectedDeliveryProcess);
    }

    const handleOnChangeRouteType = (selectedRouteType) => {
        setSelectedRouteType(selectedRouteType)
    }


    return (
        <>
            <CModal
                size="md"
                visible={open}
                onClose={() => setOpen(false)}
                alignment='center'
                backdrop="static"
                keyboard={false}
            >
                <CModalHeader>
                    <CModalTitle>UPLOAD BULK ORDER REQUEST</CModalTitle>
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
                                    DOWNLOAD TEMPLATE
                                </CButton>
                            </CCol>
                            : ''
                        }
                    </CRow>
                    <CRow>
                        <CCol>
                            <CForm onSubmit={handleSubmit} encType="multipart/form-data">
                                <CRow className="mb-3">
                                    <CFormLabel className="col-form-label">Delivery Process Type <code>*</code></CFormLabel>
                                    <CCol>
                                        <Select
                                            className="input-select"
                                            options={deliveryProcess}
                                            isSearchable={true}
                                            value={selectedDeliveryProcess}
                                            onChange={handleOnChangeDeliveryProcess}
                                            required
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel className="col-form-label">Route Type <code>*</code></CFormLabel>
                                    <CCol>
                                        <Select
                                            className="input-select"
                                            options={routeType}
                                            isSearchable={true}
                                            value={selectedRouteType}
                                            onChange={handleOnChangeRouteType}
                                            required
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol>
                                        <CContainer fluid>
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


export default ModalBulkUploadOrderRequest
