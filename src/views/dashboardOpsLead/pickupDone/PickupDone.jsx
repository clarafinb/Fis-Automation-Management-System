import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useLocation, useNavigate } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
    CTabContent,
    CTabPane
} from '@coreui/react'

import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import TableListPickupDone from 'src/components/dashboardOpsLead/pickupDone/TableListPickupDone'
import CIcon from '@coreui/icons-react'
import { cilSpreadsheet } from '@coreui/icons'
import HeaderProject from '../HeaderProject'

function PickupDone() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [activeKey, setActiveKey] = useState(1)
    const { pathname } = useLocation();
    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, pId, Dashboard?.activeMenu)
            ).then(result => {
                const dtProjectFind = result.find(row => Number.parseInt(row.whId) === Number.parseInt(wId))
                setDetailProject(dtProjectFind)
                dispatch(actions.getListPickupDone(pId, wId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID]);


    const handleComponent = useCallback(
        (action, value, data) => {
            if (action === 'detail') {
                nav(`detail/${value?.orderReqId}`, { replace: true })
            }
        }
    )

    return (
        <>
            <CContainer fluid>
                <CRow className='mb-3'>
                    <CCol sm={12}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>PI</span>CKUP DONE &
                            WAITING HO COMPLETE IN WH
                        </h4>
                    </CCol>
                </CRow>
                <CRow className='mb-2'>
                    <CCol className="d-none d-md-block">
                        <CButton className="colorBtn-white">
                            <CIcon icon={cilSpreadsheet} className="me-2 text-success" />
                            EXPORT TO EXCEL
                        </CButton>
                    </CCol>
                </CRow>
                <CCard className="">
                    <CCardBody>
                        <CRow className='mt-3 mb-3'>
                            <CCol sm={6}>
                                <HeaderProject data={detailProject} />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol className="d-none d-md-block text-end">
                                <CTabContent>
                                    <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                        <TableListPickupDone
                                            data={DashboardOpsLead?.listPickupDone}
                                            handleComponent={handleComponent}
                                        />
                                    </CTabPane>
                                </CTabContent>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer>
        </>
    )
}

export default PickupDone