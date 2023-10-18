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
import TableListFinalComplete from 'src/components/dashboardOpsLead/finalComplete/TableListFinalComplete'
import HeaderProject from '../HeaderProject'

function FinalComplete() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const { pathname } = useLocation();

    const [projectId, setProjectId] = useState('');
    const [whId, setWhId] = useState('')
    const [processType, setProcessType] = useState('')

    const [title, setTitle] = useState('Delivery')

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const pt = pathname.split('/')[4]

        if (pt === 'pickup') setTitle('Pickup')

        setProjectId(pId);
        setWhId(wId);
        setProcessType(pt);

        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, pId, Dashboard?.activeMenu)
            ).then(result => {
                const dtProjectFind = result.find(row => parseInt(row.whId) === parseInt(wId))
                setDetailProject(dtProjectFind)
                dispatch(actions.getListFinalComplete(wId, pt))
            })
        }
    }, [Global?.user?.userID]);

    const handleComponent = useCallback(
        (name, data) => {

            data.transportArrangmentId = data.transportArrangementId;
            data.projectId = projectId;
            data.whId = whId;

            const url = `detail/${data.transportArrangmentId}/${data.costGroup.toLowerCase()}`
            if (name === 'detail') nav(url, { replace: true })

        }
    )

    return (
        <>
            <CContainer fluid>
                <CRow className='mb-4'>
                    <CCol sm={12}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>Final</span>
                            &nbsp;Cost Transport {title} Complete
                        </h4>
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
                                <TableListFinalComplete
                                    data={DashboardOpsLead?.listFinalComplete}
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

export default FinalComplete