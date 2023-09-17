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
import { cilDataTransferUp, cilSpreadsheet } from '@coreui/icons'
import ModalCreateOrderRequest from 'src/components/dashboardOpsLead/orderRequest/ModalCreateOrderRequest'
import ModalCancelOrderRequest from 'src/components/dashboardOpsLead/orderRequest/ModalCancelOrderRequest'
import TableListOrderRequest from 'src/components/dashboardOpsLead/orderRequest/TableListOrderRequest'
import { downloadFileConfig } from 'src/helper/globalHelper'
import HeaderProject from '../HeaderProject'

function OrderRequest() {
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [orderReqId, setOrderReqId] = useState()
    const [openModalOrderRequest, setOpenModalOrderRequest] = useState(false)
    const [activeKey, setActiveKey] = useState(1)
    const { pathname } = useLocation();
    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, pId, Dashboard?.activeMenu)
            ).then(result => {
                const dtProjectFind = result.find(row => row.whId == wId)
                setDetailProject(dtProjectFind)
                dispatch(actions.getListOrderRequest(pId, wId, Global?.user?.userID))
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

    const handleCreate = () => {
        setOpenModalOrderRequest(true)
    }

    const handleExportExcel = () => {
        const param = {
            projectId: detailProject?.projectId,
            whId: detailProject?.whId,
            userId: Global?.user?.userID,
            whCode: detailProject?.whCode,
        }

        dispatch(
            actions.getOrderRequestWHProjectExportToExcel(param)
        ).then(resp => {
            downloadFileConfig(resp, 'order_request_' + Date.now() + 'xlsx')
        })
    }

    return (
        <>
            <CContainer fluid>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>OR</span>DER REQUEST
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol className="d-none d-md-block">
                        {/* <CButton className="colorBtn-white me-3" onClick={handleCreate}>
                            <CIcon icon={cilPlus} className="me-2 text-warning" />
                            ADD ORDER REQUEST
                        </CButton> */}
                        <CButton className="colorBtn-white me-3">
                            <CIcon icon={cilDataTransferUp} className="me-2 text-warning" />
                            UPLOAD FILE
                        </CButton>
                        <CButton className="colorBtn-white" onClick={handleExportExcel}>
                            <CIcon icon={cilSpreadsheet} className="me-2 text-success" />
                            EXPORT TO EXCEL
                        </CButton>
                    </CCol>
                </CRow>
                <br />
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
                                        active={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                    >
                                        <p className={activeKey === 1 ? 'text-underline-tab' : ''}>ORDER REQUEST</p>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                    >
                                       <p className={activeKey === 2 ? 'text-underline-tab' : ''}>ORDER REQ BULK UPLOAD LOG</p>
                                    </CNavLink>
                                </CNavItem>
                                {/* <CNavItem>
                                    <CNavLink
                                        active={activeKey === 3}
                                        onClick={() => setActiveKey(3)}
                                    >
                                        Item Order Req Bulk Upload Log
                                    </CNavLink>
                                </CNavItem> */}
                            </CNav>
                        </CRow>
                        <CRow className='mt-2'>
                            <CCol className="d-none d-md-block text-end">
                                <CTabContent>
                                    <CTabPane role="tablist" aria-labelledby="home-tab" visible={activeKey === 1}>
                                        <TableListOrderRequest
                                            data={DashboardOpsLead?.listOrdeRequest}
                                            handleComponent={handleComponent}
                                        />
                                    </CTabPane>
                                    <CTabPane role="tablist" aria-labelledby="home-tab" visible={activeKey === 2}>
                                    </CTabPane>
                                </CTabContent>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer>

            <ModalCancelOrderRequest
                open={openModal}
                setOpen={setOpenModal}
                orderReqId={orderReqId}
                detailProject={detailProject}
            />

            <ModalCreateOrderRequest
                open={openModalOrderRequest}
                setOpen={setOpenModalOrderRequest}
                projectId={detailProject.projectId}
                detailProject={detailProject}
            />
        </>
    )
}

export default OrderRequest