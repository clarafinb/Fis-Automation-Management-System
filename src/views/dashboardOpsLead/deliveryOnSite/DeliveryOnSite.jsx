import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate, useLocation } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow
} from '@coreui/react'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import ModalListItem from 'src/components/dashboardOpsLead/pickAndPackPending/ModalListItem'
import TableListDeliveryOnSite from 'src/components/dashboardOpsLead/deliveryOnSite/TableListDeliveryOnSite'
import { cilSpreadsheet } from '@coreui/icons'

function DeliveryOnSite() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [custOrderRequest, setCustOrderRequest] = useState(null)
    const [itemOrderRequestData, setItemOrderRequestData] = useState([])
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
                dispatch(actions.getListDeliveryOnSite(pId, wId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID]);

    const handleComponent = useCallback(
        (action, value, data) => {
            if (action === 'detail') {
                nav(`detail/${value}`)
            } else {
                setCustOrderRequest(data?.custOrderRequest)
                dispatch(actions.getOrderRequestItemList(data?.orderReqId))
                    .then(result => {
                        const remapData = [
                            {
                                name: 'no',
                                header: 'No',
                                defaultVisible: true,
                                defaultWidth: 80,
                                type: 'number'
                            }
                        ]
                        result.map((row, idx) => {
                            if (Object.keys(row)[idx]) {
                                remapData.push({
                                    name: Object.keys(row)[idx],
                                    header: Object.keys(row)[idx],
                                    defaultFlex: 1
                                })
                            }
                        })
                        const dataSet = result.map((item, index) => {
                            return {
                                no: index + 1,
                                ...item
                            }
                        })
                        setItemOrderRequestData(dataSet)
                        setOpenModal(true)
                    })
            }
        }
    )

    return (
        <>
            <CContainer fluid>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>DE</span>LIVERY ONSITE
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol className="d-none d-md-block">
                        <CButton className="colorBtn-white">
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
                        <br />
                        <CRow>
                            <CCol className="d-none d-md-block text-end">
                                <TableListDeliveryOnSite
                                    data={DashboardOpsLead?.listDeliveryOnSite}
                                    handleComponent={handleComponent}
                                />
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer>
            <ModalListItem
                open={openModal}
                setOpen={setOpenModal}
                data={itemOrderRequestData}
                custOrderRequest={custOrderRequest}
            />
        </>
    )
}

export default DeliveryOnSite