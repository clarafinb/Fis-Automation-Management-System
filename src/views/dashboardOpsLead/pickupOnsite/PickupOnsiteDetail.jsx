import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormLabel,
    CFormTextarea,
    CRow
} from '@coreui/react'

import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload } from '@coreui/icons'
import Swal from 'sweetalert2'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import OrderRequestPickupOnsite from 'src/components/dashboardOpsLead/pickupOnsite/OrderRequestPickupOnsite'
import TableListDeliveryOnSiteEvidence from 'src/components/dashboardOpsLead/deliveryOnSite/TableListDeliveryOnSiteEvidence'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'


function PickupOnsiteDetail() {
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const nav = useNavigate()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [whId, setWhId] = useState("")
    const [orderReqId, setOrderReqId] = useState()

    const [values, setValues] = useState({})
    const [modalUpload, setModalUpload] = useState(false)
    const { pathname } = useLocation();
    const [headerData, setHeaderData] = useState({
        url: 'pickup-onsite',
        label: 'DELIVERY ONSITE'
    })

    useEffect(() => {
        const url = pathname.split('/')[1];
        if (url === 'pickup-onsite') {
            setHeaderData({
                url: 'pickup-onsite',
                label: 'DELIVERY ONSITE'
            })
        }

        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const orId = pathname.split('/')[5]

        setProjectId(pId)
        setOrderReqId(orId)
        setWhId(wId)

        if (Global?.user?.userID) {
            dispatch(
                actions.getOrderRequestDetail(orId)
            ).then(result => {
                setOrderReqDetail(result[0])
            })

            dispatch(actions.getListDeliveryOnSiteEvidence(orId))


        }
    }, [Global?.user?.userID]);

    const handleBack = () => {
        nav(`/${headerData.url}/` + projectId + "/" + whId, { replace: true })
    }

    const handleComponent = useCallback(
        (name, data) => {
            console.log(data)
            if (name === 'delete') {
                dispatch(actions.deleteDeliveryOnsiteEvidence(
                    data?.evidenceId,
                    Global.user.userID,
                    orderReqId
                ))
            }
            if (name === 'download') {
                window.open(data.filePath, '_blank')
            }
        }
    )

    const handleSubmit = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            orderReqId: orderReqId,
            returnWHReason: values?.returnWHReason,
            confirmBy: Global.user.userID
        }

        dispatch(actions.confirmDeliveryOnSite(
            payload,
            projectId,
            whId,
            Global.user.userID
        ))
        setValues({})
        handleBack()
    }

    const handleOnchange = useCallback(
        (e) => {
            const { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleOpenModalUpload = () => {
        setModalUpload(true)
    }

    const handleUploadFile = (formData) => {
        if (formData) {
            dispatch(actions.uploadDeliveryOnsiteEvidence(
                formData,
                orderReqId
            ))
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'File Empty !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    return (
        <>
            <CRow className='py-2'>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>
                            {headerData.label}
                        </span>
                    </h4>
                </CCol>
            </CRow>
            <CCard className='mt-3 mb-3'>
                <CCardBody>
                    <CRow className='m-2'>
                        <CCol sm={5}>
                            <OrderRequestPickupOnsite
                                data={orderReqDetail}
                            />
                        </CCol>
                        <CCol>
                            <CRow className='ms-1 mb-4'>
                                <CCol>
                                    <p className="card-title mb-0">
                                        <span className='text-underline'>BA</span>CK TO POOL CONFIRMATION
                                    </p>
                                </CCol>
                            </CRow>
                            <CRow className='ms-1 mb-3'>
                                <CCol>
                                    <CForm onSubmit={handleSubmit}>
                                        <CRow>
                                            <CCol>
                                                <CRow className="mb-4">
                                                    <CFormLabel className=" col-form-label">Reason <code>(*)</code></CFormLabel>
                                                    <CCol>
                                                        <CFormTextarea
                                                            rows={3}
                                                            name="returnWHReason"
                                                            value={values?.returnWHReason}
                                                            onChange={handleOnchange}
                                                            required
                                                        />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol>
                                                        <h6 className="card-title mb-0">
                                                            Attachment Evidence (PDF Only) <code>(*)</code>
                                                        </h6>
                                                    </CCol>
                                                    <CCol className="d-none d-md-block text-end">
                                                        <CButton
                                                            className="colorBtn-white mb-3"
                                                            onClick={() => handleOpenModalUpload()}
                                                        >
                                                            <CIcon
                                                                icon={cilCloudUpload}
                                                                className="me-2 text-warning" />
                                                            ADD EVIDENCE
                                                        </CButton>
                                                    </CCol>
                                                </CRow>
                                                <CCol className="d-none d-md-block text-end">
                                                    <TableListDeliveryOnSiteEvidence
                                                        data={DashboardOpsLead?.listDeliveryOnSiteEvidence}
                                                        handleComponent={handleComponent}
                                                    />
                                                </CCol>
                                                < CRow className='mt-3'>
                                                    <CCol className="d-none d-md-block text-end" md={12}>
                                                        <ButtonSubmit
                                                            label='CONFIRM'
                                                            type="submit"
                                                            className='me-2'
                                                        />
                                                        <ButtonCancel
                                                            label='CANCEL'
                                                            handleButton={handleBack}
                                                        />
                                                    </CCol>
                                                </CRow>
                                            </CCol>

                                        </CRow>
                                    </CForm>
                                </CCol>
                            </CRow>
                        </CCol >
                    </CRow >
                </CCardBody>
            </CCard>


            <ModalUploadFile
                open={modalUpload}
                setOpen={setModalUpload}
                handleUpload={handleUploadFile}
                useTemplate={false}
            />

        </>
    )
}

export default PickupOnsiteDetail