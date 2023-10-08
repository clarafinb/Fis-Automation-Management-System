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
import TableListFinalConfirm from 'src/components/dashboardOpsLead/finalConfirm/TableListFinalConfirm'
import HeaderProject from '../HeaderProject'

function FinalConfirm() {
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
                dispatch(actions.getListFinalConfirm(wId))
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

    const handleExportExcel = () => {
        console.log('export excel')
    }

    return (
        <>
            <CContainer fluid>
                <CRow className='mb-4'>
                    <CCol sm={12}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>Final</span>
                            &nbsp; Cost Transport Delivery Waiting Confirmation
                        </h4>
                    </CCol>
                </CRow>
                {/* <CRow className='mb-4'>
                    <CCol className="d-none d-md-block">
                        <CButton className="colorBtn-white" onClick={handleExportExcel}>
                            <CIcon icon={cilSpreadsheet} className="me-2 text-success" />
                            EXPORT TO EXCEL
                        </CButton>
                    </CCol>
                </CRow> */}
                <CCard className="">
                    <CCardBody>
                        <CRow className='mt-3 mb-4'>
                            <CCol sm={6}>
                                <HeaderProject data={detailProject} />
                            </CCol>
                        </CRow>
                        <CRow className='mt-2'>
                            <CCol className="d-none d-md-block text-end">
                                <TableListFinalConfirm
                                    data={DashboardOpsLead?.listFinalConfirm}
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

export default FinalConfirm