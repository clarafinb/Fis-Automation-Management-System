import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useLocation } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane
} from '@coreui/react'

import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilDataTransferUp } from '@coreui/icons'
import { downloadFileConfig } from 'src/helper/globalHelper'
import HeaderProject from '../HeaderProject'
import TableListOrderRequestBulk from 'src/components/dashboardOpsLead/orderRequest/TableListOrderRequestBulk'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'
import Swal from 'sweetalert2'

function OrderRequestBulk() {
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [orderReqId, setOrderReqId] = useState()
    const [openModalOrderRequest, setOpenModalOrderRequest] = useState(false)
    const [activeKey, setActiveKey] = useState(1)
    const { pathname } = useLocation();
    const [param, setParam] = useState({})

    const [openModalUpload, setOpenModalUpload] = useState(false)
    const [templateUrl, setTemplateUrl] = useState("")
    const [templateName, setTemplateName] = useState("")

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const pcgkId = pathname.split('/')[4]

        setParam({
            projectId: pId,
            whId: wId,
            packageProcessId: pcgkId
        })

        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, pId, Dashboard?.activeMenu)
            ).then(result => {
                const dtProjectFind = result.find(row => Number.parseInt(row.whId) === Number.parseInt(wId))
                setDetailProject(dtProjectFind)
                dispatch(actions.getListOrderRequestBulkDraft(pId, wId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID]);


    const handleComponent = useCallback(
        (name, orderReqId) => {
            setOrderReqId(orderReqId)
            if (name === 'delete') {
                const payload = {
                    orderReqId: orderReqId,
                    LMBY: Global.user.userID,
                    orderReqStatus: "Deleted"
                }
                dispatch(actions.deleteOrderRequest(payload, detailProject.projectId, detailProject.whId))
            } else {
                setOpenModal(true)
            }
        }
    )

    const handleDownloadTemplate = () => {
        window.open(templateUrl, '_blank')
    }

    const handleUploadFile = (formData) => {
        if (formData) {
            // dispatch(
            //     actions.uploadOrderReqItemPickAndPackProgress(
            //         formData,
            //         orderReqId
            //     )
            // ).then(() => {
            //     refreshData(orderReqId, whId)
            // })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'File Empty !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const handleCreateBulkOrderRequest = () => {
        setOpenModalUpload(true)
        // dispatch(
        //     actions.getMassUploadTemplateOrderReqItemBulkUpload()
        // ).then(response => {
        //     setTemplateName(response?.templateName)
        //     setTemplateUrl(response?.templateURL)
        // })
    }

    return (
        <>
            <CContainer fluid>
                <CRow className='mb-3'>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>BULK</span>
                            &nbsp;ORDER REQUEST
                        </h4>
                    </CCol>
                </CRow>
                <CCard className="">
                    <CCardBody>
                        <CRow className='mt-3'>
                            <CCol sm={6}>
                                <HeaderProject data={detailProject} />
                            </CCol>
                        </CRow>
                        <CRow className='mt-3'>
                            <CNav variant="underline">
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                    >
                                        <p className={activeKey === 2 ? 'text-underline-tab' : ''}>ORDER REQUEST DRAFT</p>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                    >
                                        <p className={activeKey === 1 ? 'text-underline-tab' : ''}>BULK UPLOAD</p>
                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                        </CRow>
                        <CRow className='mt-2'>
                            <CCol className="d-none d-md-block text-end">
                                <CTabContent>
                                    <CTabPane role="tablist" aria-labelledby="home-tab" visible={activeKey === 1}>
                                        <CRow className='mb-2'>
                                            <CCol className="d-none d-md-block p-2">
                                                <CButton
                                                    className="colorBtnIcon-blue me-1"
                                                    onClick={handleCreateBulkOrderRequest}
                                                >
                                                    <CIcon icon={cilDataTransferUp} className="me-2 text-secondary" />
                                                    UPLOAD BULK ORDER REQUEST
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                        <CRow className='mb-2'>
                                            <CCol className="d-none d-md-block">
                                                <TableListOrderRequestBulk
                                                    data={DashboardOpsLead?.listOrdeRequestBulk}
                                                    handleComponent={handleComponent}
                                                />
                                            </CCol>
                                        </CRow>
                                    </CTabPane>
                                    <CTabPane role="tablist" aria-labelledby="home-tab" visible={activeKey === 2}>
                                    </CTabPane>
                                </CTabContent>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer>

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

export default OrderRequestBulk