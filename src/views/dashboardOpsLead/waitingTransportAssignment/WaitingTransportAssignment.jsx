import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'

import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import TableListWaitingTransportAssignment from 'src/components/dashboardOpsLead/waitingTransportAssignment/TableListWaitingTransportAssignment'

function WaitingTransportAssignment() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const { pathname } = useLocation();
    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, pId)
            ).then(result => {
                const dtProjectFind = result.find(row => row.whId == wId)
                setDetailProject(dtProjectFind)
                dispatch(actions.getListWaitingTransportAssignment(pId, wId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID]);


    const handleComponent = useCallback(
        (action, value, data) => {
            if (action === 'detail') {
                nav(`detail/${value}`, { replace: true })
            }
        }
    )

    return (
        <>
            <CContainer fluid>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>WA</span>ITING TRANSPORT ASSIGNMENT
                        </h4>
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
                            <CCol>
                                <TableListWaitingTransportAssignment
                                    data={DashboardOpsLead?.listWaitingTransportAssignment}
                                    handleComponent={handleComponent}
                                />
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer>
        </>
    )
}

export default WaitingTransportAssignment