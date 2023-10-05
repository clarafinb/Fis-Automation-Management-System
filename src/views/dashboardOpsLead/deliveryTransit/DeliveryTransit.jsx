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
import TableListDeliveryTransit from 'src/components/dashboardOpsLead/deliveryTransit/TableListDeliveryTransit'
import { cilSpreadsheet } from '@coreui/icons'
import ModalReAssignMover from 'src/components/dashboardOpsLead/waitingDispatch/ModalReAssignMover'

function DeliveryTransit() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})

    const [transportTypeArrangementId, setTransportTypeArrangementId] = useState('');
    const [openModalReAssignMover, setOpenModalReAssignMover] = useState(false)
    const [detailData, setDetailData] = useState({})

    const [projectId, setProjectId] = useState('')
    const [whId, setWhId] = useState('')

    const { pathname } = useLocation();
    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]

        setProjectId(pId)
        setWhId(wId)

        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, pId, Dashboard?.activeMenu)
            ).then(result => {
                const dtProjectFind = result.find(row => Number.parseInt(row.whId) === Number.parseInt(wId))
                setDetailProject(dtProjectFind)
                dispatch(actions.getListDeliveryTransit(pId, wId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID]);

    const handleComponent = useCallback(
        (action, value, data) => {
            if (action === 'detail') {
                nav(`detail/${value}`)
            }
            if (action === 'assign') {
                setDetailData({
                    ...data,
                    transportArrangmentId: data.transportArrangementId,
                    projectId: projectId
                })
                setTransportTypeArrangementId(data.transport_type_arrangement_id)
                setOpenModalReAssignMover(true)
            }
        }
    )

    const handleComplete = (value) => {
        if (value) {
            dispatch(actions.getListDeliveryTransit(projectId, whId, Global?.user?.userID))
        }
    }

    return (
        <>
            <CContainer fluid>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>DE</span>LIVERY IN TRANSIT
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
                                <TableListDeliveryTransit
                                    data={DashboardOpsLead?.listDeliveryTransit}
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
                handleComplete={handleComplete}
            />
        </>
    )
}

export default DeliveryTransit