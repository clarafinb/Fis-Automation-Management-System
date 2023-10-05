import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate, useLocation } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'

import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilSpreadsheet } from '@coreui/icons'
import TableListBackToPool from 'src/components/dashboardOpsLead/backToPool/TableListBackToPool'
import HeaderProject from '../HeaderProject'
import { downloadFileConfig } from 'src/helper/globalHelper'

function BackToPool() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const { pathname } = useLocation();

    const [projectId, setProjectId] = useState('');
    const [whId, setWhId] = useState('')

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]

        setProjectId(pId);
        setWhId(wId);

        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, pId, Dashboard?.activeMenu)
            ).then(result => {
                const dtProjectFind = result.find(row => parseInt(row.whId) === parseInt(wId))
                setDetailProject(dtProjectFind)
                dispatch(actions.getListBtp(pId, wId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID]);

    const handleComponent = useCallback(
        (name, data) => {

            data.transportArrangmentId = data.transportArrangementId;
            data.projectId = projectId;
            data.whId = whId;

            if (name === 'detail') nav(`detail/${data.orderReqId}`)

        }
    )

    const handleExportExcel = () => {
        const param = {
            projectId: detailProject?.projectId,
            whId: detailProject?.whId,
            userId: Global?.user?.userID,
            whCode: decodeURI(detailProject?.whCode),
        }

        console.log(param)

        dispatch(
            actions.getDeliveryBTPWHProjectExportToExcel(param)
        ).then(resp => {
            downloadFileConfig(resp, 'back_to_pool_request_' + Date.now() + 'xlsx')
        })
    }

    return (
        <>
            <CContainer fluid>
                <CRow className='mb-4'>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>BACK</span>
                            &nbsp;TO POOL REQUEST
                        </h4>
                    </CCol>
                </CRow>
                <CRow className='mb-4'>
                    <CCol className="d-none d-md-block">
                        <CButton className="colorBtn-white" onClick={handleExportExcel}>
                            <CIcon icon={cilSpreadsheet} className="me-2 text-success" />
                            EXPORT TO EXCEL
                        </CButton>
                    </CCol>
                </CRow>
                <CCard className="">
                    <CCardBody>
                        <CRow className='mt-3 mb-4'>
                            <CCol sm={6}>
                                <HeaderProject data={detailProject} />
                            </CCol>
                        </CRow>
                        <CRow className='mt-2'>
                            <CCol className="d-none d-md-block text-end">
                                <TableListBackToPool
                                    data={DashboardOpsLead?.listBackToPool}
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

export default BackToPool