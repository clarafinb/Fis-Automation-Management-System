import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CRow
} from '@coreui/react'

import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRefresh, faUpload } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { useNavigate, useLocation } from 'react-router-dom';
import TableListItemInventory from 'src/components/dashboardOpsLead/pickAndPackPending/TableListItemInventory'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'
import OrderRequestDetailPickAndPackPendingDetail from 'src/components/dashboardOpsLead/pickAndPackPending/OrderRequestDetailPickAndPackPendingDetail'
import ModalBoxRequest from 'src/components/dashboardOpsLead/pickAndPackPending/ModalBoxRequest'

function PickAndPackDetail() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [orderReqId, setOrderReqId] = useState("")
    const [templateName, setTemplateName] = useState("")
    const [openModalUpload, setOpenModalUpload] = useState(false)
    const [templateUrl, setTemplateUrl] = useState("")
    const [whId, setWhId] = useState("")
    const [confirmStatus, setConfirmStatus] = useState(false)
    const { pathname } = useLocation();
    const [openModalBoxRequest, setOpenModalBoxRequest] = useState(false)

    useEffect(() => {

        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const orId = pathname.split('/')[5]

        setOrderReqId(orId)
        setProjectId(pId)
        setWhId(wId)

        if (Global?.user?.userID) {
            refreshData(orId, wId)
        }
    }, [Global?.user?.userID, DashboardOpsLead?.listOrderReqItemWithInventory.length]);

    const handleOpenModalBoxRequest = () => {
        setOpenModalBoxRequest(true)
    }

    const handleBack = () => {
        nav("/pick-pack-pending/" + projectId + "/" + whId, { replace: true })
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
                result[0]?.inboundType
            )).then(() => {
                if (DashboardOpsLead?.listOrderReqItemWithInventory.length > 0) {
                    const res = DashboardOpsLead?.listOrderReqItemWithInventory
                        .filter(row => row.balanceQTY < 0)
                    if (res.length > 0 && DashboardOpsLead?.listOrderReqItemWithInventory.length === 0) {
                        setConfirmStatus(false)
                    }

                    if (res.length === 0 && DashboardOpsLead?.listOrderReqItemWithInventory.length === 0) {
                        setConfirmStatus(false)
                    }

                    if (res.length === 0 && DashboardOpsLead?.listOrderReqItemWithInventory.length > 0) {
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

            switch (action) {
                case 'reset':

                    dispatch(
                        actions.resetPickAndPackprogress(orderReqId, projectId, whId, Global.user.userID)
                    ).then(() => {
                        refreshData(orderReqId, whId)
                    })
                    break;

                case 'upload':

                    setOpenModalUpload(true)
                    dispatch(
                        actions.getMassUploadTemplateOrderReqItemBulkUpload()
                    ).then(response => {
                        setTemplateName(response?.templateName)
                        setTemplateUrl(response?.templateURL)
                    })
                    break;

                case 'addBoxRequest':
                    handleOpenModalBoxRequest()
                    break;

                default:
                    alert('undifined actions')
                    break;
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
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>PI</span>CK & PACK PENDING
                    </h4>
                </CCol>
            </CRow>

            <CCard className='mt-3 mb-3'>
                <CCardBody>
                    <CRow className='m-2'>
                        <CCol sm={4}>
                            <OrderRequestDetailPickAndPackPendingDetail
                                data={orderReqDetail}
                            />
                        </CCol>
                        <CCol sm={8}>
                            <CRow className='ms-1'>
                                <CCol>
                                    <p className="card-title mb-0">
                                        <span className='text-underline'>OR</span>DER REQUEST DETAIL
                                    </p>
                                </CCol>
                            </CRow>
                            <br />
                            <CRow className='ms-1'>
                                <CCol>
                                    <CRow className="mb-4">
                                        <CFormLabel>Total Item Request
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
                                        {
                                            orderReqDetail?.inboundType === 'ITEM' ?
                                                <CCol>
                                                    {
                                                        orderReqDetail?.totalItem > 0 ?
                                                            <CButton className='colorBtnIcon-black p-1 me-2'>
                                                                <FontAwesomeIcon
                                                                    icon={faRefresh}
                                                                    className='textWhite px-2 mt-1'
                                                                    title='Reset'
                                                                    size='lg'
                                                                    onClick={() =>
                                                                        handleComponent('reset', orderReqId)
                                                                    }
                                                                />
                                                            </CButton>
                                                            : ''
                                                    }
                                                    <CButton className='colorBtnIcon-black p-1'>
                                                        <FontAwesomeIcon
                                                            icon={faUpload}
                                                            className='textWhite px-1 mt-1'
                                                            title='Upload'
                                                            size='lg'
                                                            onClick={() =>
                                                                handleComponent('upload')
                                                            }
                                                        />
                                                    </CButton>
                                                </CCol>
                                                : ''
                                        }
                                        {
                                            orderReqDetail?.inboundType === 'BOX' ?
                                                <CCol>
                                                    <CButton className='colorBtnIcon-black p-1 me-2'>
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                            className='textWhite px-1 mt-1'
                                                            title='Add Box Request'
                                                            size='lg'
                                                            onClick={() =>
                                                                handleComponent('addBoxRequest')
                                                            }
                                                        />
                                                    </CButton>
                                                    {
                                                        orderReqDetail?.totalItem > 0 ?
                                                            <CButton className='colorBtnIcon-black p-1 me-2'>
                                                                <FontAwesomeIcon
                                                                    icon={faRefresh}
                                                                    className='textWhite px-2 mt-1'
                                                                    title='Reset'
                                                                    size='lg'
                                                                    onClick={() =>
                                                                        handleComponent('reset', orderReqId)
                                                                    }
                                                                />
                                                            </CButton>
                                                            : ''
                                                    }
                                                </CCol>
                                                : ''
                                        }
                                    </CRow>
                                    <CRow>
                                        <CCol>
                                            <p className="card-title mb-0">
                                                <span className='text-underline'>IT</span>EM LIST
                                            </p>
                                        </CCol>
                                    </CRow>
                                    <CCol className="d-none d-md-block text-end py-3">
                                        <TableListItemInventory
                                            data={DashboardOpsLead?.listOrderReqItemWithInventory}
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
                        </CCol >
                    </CRow >
                </CCardBody>
            </CCard>


            <ModalUploadFile
                open={openModalUpload}
                setOpen={setOpenModalUpload}
                handleDownloadTemplate={handleDownloadTemplate}
                templateName={templateName}
                handleUpload={handleUploadFile}
            />

            <ModalBoxRequest
                open={openModalBoxRequest}
                setOpen={setOpenModalBoxRequest}
                whId={whId}
                orderReqId={orderReqId}
                refreshData={refreshData}
            />
        </>
    )
}

export default PickAndPackDetail