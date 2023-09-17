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
import { cilSpreadsheet } from '@coreui/icons'
import ModalCancelOrderRequestPickup from 'src/components/dashboardOpsLead/orderRequestPickup/ModalCancelOrderRequestPickup'
import TableListOrderRequestPickup from 'src/components/dashboardOpsLead/orderRequestPickup/TableListOrderRequestPickup'
import { downloadFileConfig } from 'src/helper/globalHelper'

function OrderRequestPickup() {
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [orderReqId, setOrderReqId] = useState()
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
                dispatch(actions.getListOrderRequestPickup(pId, wId, Global?.user?.userID))
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
                dispatch(actions.deleteOrderRequestPickup(payload, detailProject.projectId, detailProject.whId))
            } else {
                setOpenModal(true)
            }
        }
    )

    const handleExportExcel = () => {
        const param = {
            projectId: detailProject?.projectId,
            whId: detailProject?.whId,
            userId: Global?.user?.userID,
            whCode: detailProject?.whCode,
        }

        dispatch(
            actions.getOrderRequestPickupWHProjectExportToExcel(param)
        ).then(resp => {
            downloadFileConfig(resp, 'order_request_pickup' + Date.now() + 'xlsx')
        })
    }

    return (
        <>
            <CContainer fluid>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>OR</span>DER REQUEST PICKUP
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol className="d-none d-md-block">
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
                            <CCol>
                                <h5>
                                    <img src={'icon/icon_project_grey.png'} alt="icon_project" className='px-2' />{detailProject?.projectName} <span className='px-3'>|</span>
                                    <img src={'icon/icon_warehouse_grey.png'} alt="icon_warehouse" className='px-2' /> {detailProject?.whName} <span className='px-3'>|</span>
                                    <img src={'icon/icon_code_grey.png'} alt="icon_code" className='px-2' /> {detailProject?.whCode}
                                </h5>
                            </CCol>
                        </CRow>
                        <CRow className='mt-3'>
                            <CNav variant="tabs">
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                    >
                                        Order Request
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                    >
                                        Order Req Bulk Upload Log
                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                        </CRow>
                        <CRow>
                            <CCol className="d-none d-md-block text-end">
                                <CTabContent>
                                    <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                        <TableListOrderRequestPickup
                                            data={DashboardOpsLead?.listOrdeRequestPickup}
                                            handleComponent={handleComponent}
                                        />
                                    </CTabPane>
                                </CTabContent>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer>

            <ModalCancelOrderRequestPickup
                open={openModal}
                setOpen={setOpenModal}
                orderReqId={orderReqId}
                detailProject={detailProject}
            />
        </>
    )
}

export default OrderRequestPickup