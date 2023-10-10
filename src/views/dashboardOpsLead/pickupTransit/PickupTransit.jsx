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
import TableListPickupTransit from 'src/components/dashboardOpsLead/pickupTransit/TableListPickupTransit'
import HeaderProject from '../HeaderProject'
import ModalReAssignMover from 'src/components/dashboardOpsLead/waitingDispatch/ModalReAssignMover'
import { downloadFileConfig } from 'src/helper/globalHelper'

function PickupTransit() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const { pathname } = useLocation();

    const [transportTypeArrangementId, setTransportTypeArrangementId] = useState('');
    const [openModalReAssignMover, setOpenModalReAssignMover] = useState(false)
    const [detailData, setDetailData] = useState({})

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
                dispatch(actions.getListPickupTransit(pId, wId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID]);

    const handleComponent = useCallback(
        (name, data) => {

            data.transportArrangmentId = data.transportArrangementId;
            data.projectId = projectId;
            data.whId = whId;

            if (name === 'pool') nav(`detail/${data.orderReqId}`)

            if (name === 'assign') {
                setDetailData(data)
                setTransportTypeArrangementId(data.transportTypeArrangementId)
                setOpenModalReAssignMover(true)
            }

            if (name === 'detail') nav(`track/${data.orderReqId}`)
        }
    )

    const handleComplete = (value) => {
        if (value) {
            dispatch(actions.getListPickupTransit(projectId, whId, Global?.user?.userID))
        }
    }

    const handleExportExcel = () => {
        const param = {
            projectId: detailProject?.projectId,
            whId: detailProject?.whId,
            userId: Global?.user?.userID,
            whCode: detailProject?.whCode,
        }

        dispatch(
            actions.getOrderRequestInTransitPickupExportToExcel(param)
        ).then(resp => {
            downloadFileConfig(resp, 'pickup_transit_' + Date.now() + 'xlsx')
        })
    }

    return (
        <>
            <CContainer fluid>
                <CRow className='mb-4'>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>IN</span>
                            TRANSIT PICKUP LIST
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
                                <TableListPickupTransit
                                    data={DashboardOpsLead?.listPickupTransit}
                                    handleComponent={handleComponent}
                                />
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer>

            <ModalReAssignMover
                open={openModalReAssignMover}
                setOpen={setOpenModalReAssignMover}
                data={detailData}
                transportTypeArrangementId={transportTypeArrangementId}
                onSite={true}
                handleComplete={handleComplete}
            />
        </>
    )
}

export default PickupTransit