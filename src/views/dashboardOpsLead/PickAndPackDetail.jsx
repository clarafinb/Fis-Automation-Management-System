import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CRow
} from '@coreui/react'

import * as actions from '../../config/redux/Dashboard/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh, faUpload } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/moment'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import TableListItemInventory from 'src/components/dashboardOpsLead/pickAndPackPending/TableListItemInventory'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'

function PickAndPackDetail() {
    const nav = useNavigate();
    const { dispatch, Global, Dashboard } = useRedux()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [orderReqId, setOrderReqId] = useState()
    const [templateName, setTemplateName] = useState("")
    const [openModalUpload, setOpenModalUpload] = useState(false)
    const [templateUrl, setTemplateUrl] = useState("")
    const [whId, setWhId] = useState('')
    const [confirmStatus, setConfirmStatus] = useState(false)

    useEffect(() => {
        const splitUri = window.location.href.split("/");
        const wId = splitUri[8]
        const orderRequestId = splitUri[9]

        setProjectId(splitUri[6])
        setOrderReqId(orderRequestId)
        setWhId(wId)

        if (Global?.user?.userID) {
            refreshData(orderRequestId, wId)
        }
    }, [Global?.user?.userID, Dashboard?.listOrderReqItemWithInventory.length]);

    const handleBack = () => {
        nav("/dashboard-ops-lead/pick-pack/" + projectId, { replace: true })
    }

    const handleConfirm = () => {
        const payload = {
            orderReqId: orderReqId,
            whId: whId,
            inboundType: orderReqDetail?.inboundType,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.startPickAndPack(payload, projectId, whId))
        handleBack()
    }

    const refreshData = (orderReqId, whId) => {
        dispatch(
            actions.getOrderRequestDetail(orderReqId)
        ).then(result => {
            setOrderReqDetail(result[0])
            dispatch(actions.getOrderRequestItemListWithInventory(
                orderReqId,
                whId,
                result[0].inboundType
            )).then(() => {
                if (Dashboard?.listOrderReqItemWithInventory.length > 0) {
                    const res = Dashboard?.listOrderReqItemWithInventory
                        .filter(row => row.balanceQTY < 0)
                    if (res.length > 0 && Dashboard?.listOrderReqItemWithInventory.length === 0) {
                        setConfirmStatus(false)
                    }

                    if (res.length === 0 && Dashboard?.listOrderReqItemWithInventory.length === 0) {
                        setConfirmStatus(false)
                    }

                    if (res.length === 0 && Dashboard?.listOrderReqItemWithInventory.length > 0) {
                        setConfirmStatus(true)
                    }

                } else {
                    setConfirmStatus(false)
                }
            })
        })
    }

    const handleComponent = useCallback(
        (action, orderReqId) => {
            if (action === 'start') {
            } else if (action === 'reset') {
                dispatch(
                    actions.resetPickAndPackprogress(orderReqId, projectId, whId, Global.user.userID)
                ).then(() => {
                    refreshData(orderReqId, whId)
                })
            } else {
                setOpenModalUpload(true)
                dispatch(
                    actions.getMassUploadTemplateOrderReqItemBulkUpload()
                ).then(response => {
                    setTemplateName(response?.templateName)
                    setTemplateUrl(response?.templateURL)
                })
            }
        }
    )


    const handleDownloadTemplate = () => {
        window.open(templateUrl, '_blank')
    }

    const handleUploadFile = (formData) => {
        if (formData) {
            dispatch(
                actions.uploadOrderReqItemPickAndPackProgress(
                    formData,
                    orderReqId
                )
            ).then(() => {
                refreshData(orderReqId, whId)
            })
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
                <CCol sm={12}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Pick And Pack Pending Detail
                                    </h4>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm={4}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Order Request Detail
                                    </h4>
                                </CCol>
                            </CRow>
                            <br />
                            <CRow>
                                <CCol>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Order Request Date
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="orderRequestDate"
                                                value={moment(orderReqDetail?.orderRequestDate).format('DD-MM-YYYY HH:mm:ss')}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Cust Order Req No
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="custOrderRequest"
                                                value={orderReqDetail?.custOrderRequest}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Order Req Description
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="orderRequestDesc"
                                                value={orderReqDetail?.orderRequestDesc}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Delivery Process Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="processName"
                                                value={orderReqDetail?.processName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Route Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="routeType"
                                                value={orderReqDetail?.routeType}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Requestor Name
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="requestorName"
                                                value={orderReqDetail?.requestorName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Delivery Request Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="deliveryReqType"
                                                value={orderReqDetail?.deliveryReqType}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Transport Request Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="transportReqType"
                                                value={orderReqDetail?.transportReqType}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Origin
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="origin"
                                                value={orderReqDetail?.origin}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="originAddress"
                                                value={orderReqDetail?.originAddress}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Recipient Name
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientName"
                                                value={orderReqDetail?.recipientName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Recipient Company Name
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientCompanyName"
                                                value={orderReqDetail?.recipientCompanyName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Create By / Create Date
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientCompanyName"
                                                value={orderReqDetail?.createBy + ' / ' + orderReqDetail?.createDate}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={8}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Order Request Detail
                                    </h4>
                                </CCol>
                            </CRow>
                            <br />
                            <CRow>
                                <CCol>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label col-sm-3">Total Item Request
                                        </CFormLabel>
                                        <CCol md={2}>
                                            <CFormInput
                                                type="text"
                                                name="totalItem"
                                                value={orderReqDetail?.totalItem}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                        <CCol>
                                            {/* <FontAwesomeIcon
                                                icon={faSearch}
                                                className='textBlue px-2'
                                                title='Item List'
                                                size='lg'
                                                onClick={() =>
                                                    handleModalDetailItem(orderReqId)
                                                }
                                            /> */}
                                            {
                                                orderReqDetail?.totalItem > 0 ?
                                                    <FontAwesomeIcon
                                                        icon={faRefresh}
                                                        className='textBlue px-2'
                                                        title='Reset'
                                                        size='lg'
                                                        onClick={() =>
                                                            handleComponent('reset', orderReqId)
                                                        }
                                                    />
                                                    : ''
                                            }
                                            <FontAwesomeIcon
                                                icon={faUpload}
                                                className='textBlue px-2'
                                                title='Upload'
                                                size='lg'
                                                onClick={() =>
                                                    handleComponent('upload')
                                                }
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol>
                                            <h5 className="card-title mb-0">
                                                Item List
                                            </h5>
                                        </CCol>
                                    </CRow>
                                    <CCol className="d-none d-md-block text-end">
                                        <TableListItemInventory
                                            data={Dashboard?.listOrderReqItemWithInventory}
                                        />
                                    </CCol>
                                    <CRow className='mt-3'>
                                        <CCol className="d-none d-md-block text-end" md={12}>
                                            {
                                                confirmStatus === true ?
                                                    <>
                                                        <ButtonSubmit
                                                            label='CONFIRM'
                                                            handleButton={handleConfirm}
                                                            className='me-2'
                                                        />
                                                    </>
                                                    : ''
                                            }
                                            <ButtonCancel
                                                label='CANCEL'
                                                handleButton={handleBack}
                                            />
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol >
            </CRow >
            <ModalUploadFile
                open={openModalUpload}
                setOpen={setOpenModalUpload}
                handleDownloadTemplate={handleDownloadTemplate}
                templateName={templateName}
                handleUpload={handleUploadFile}
            />
        </>
    )
}

export default PickAndPackDetail