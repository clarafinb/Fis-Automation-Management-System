import React, { useState, useEffect, useCallback } from 'react'
import { useRedux } from 'src/utils/hooks'

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
import { useLocation, useNavigate } from 'react-router-dom';
import OrderRequestDetailDeliveryTransit from 'src/components/dashboardOpsLead/deliveryTransit/OrderRequestDetailDeliveryTransit'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload } from '@coreui/icons'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'
import Swal from 'sweetalert2'
import TableListDeliveryOnSiteEvidence from 'src/components/dashboardOpsLead/deliveryOnSite/TableListDeliveryOnSiteEvidence'


function DeliveryOnSiteDetail() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [whId, setWhId] = useState("")
    const [orderReqId, setOrderReqId] = useState("")
    const { pathname } = useLocation();
    const [values, setValues] = useState({})
    const [modalUpload, setModalUpload] = useState(false)

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const orderRequestId = pathname.split('/')[5]

        setProjectId(pId)
        setWhId(wId)
        setOrderReqId(orderRequestId)

        if (Global?.user?.userID) {
            dispatch(
                actions.getOrderRequestDetail(orderRequestId)
            ).then(result => {
                setOrderReqDetail(result[0])
                dispatch(actions.getListDeliveryOnSiteEvidence(orderRequestId))
            })

        }
    }, [Global?.user?.userID]);


    const handleBack = () => {
        nav("/delivery-onsite/" + projectId + "/" + whId, { replace: true })
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



    return (
        <>
            <CRow className='py-2'>
                <CCol sm={12}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Delivery Transit Detail
                                    </h4>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm={4}>
                    <OrderRequestDetailDeliveryTransit
                        data={orderReqDetail}
                    />
                </CCol>
                <CCol sm={8}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Back to Pool Confirmation
                                    </h4>
                                </CCol>
                            </CRow>
                            <br />
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
                        </CCardBody>
                    </CCard>
                </CCol >
            </CRow >

            <ModalUploadFile
                open={modalUpload}
                setOpen={setModalUpload}
                handleUpload={handleUploadFile}
                useTemplate={false}
            />
        </>
    )
}

export default DeliveryOnSiteDetail