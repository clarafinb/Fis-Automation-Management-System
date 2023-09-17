import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilSpreadsheet } from '@coreui/icons'
import ModalListItem from 'src/components/dashboardOpsLead/pickAndPackPending/ModalListItem'
import TableListPickAndPackPending from 'src/components/dashboardOpsLead/pickAndPackPending/TableListPickAndPackPending'
import HeaderProject from '../HeaderProject'

function PickAndPack() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [projectId, setProjectId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [custOrderRequest, setCustOrderRequest] = useState(null)
    const [itemOrderRequestData, setItemOrderRequestData] = useState([])
    const { pathname } = useLocation();

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        setProjectId(pId)
        if (Global?.user?.userID && projectId) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, pId, Dashboard?.activeMenu)
            ).then(result => {
                const dtProjectFind = result.find(row => row.whId == wId)
                setDetailProject(dtProjectFind)
                dispatch(actions.getListPickAndPackPending(pId, wId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID, projectId]);

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
                            <span className='text-underline'>PI</span>CK & PACK PENDING
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
                            <CCol sm={6}>
                                <HeaderProject data={detailProject} />
                            </CCol>
                        </CRow>
                        <br />
                        <CRow>
                            <CCol className="d-none d-md-block text-end">
                                <TableListPickAndPackPending
                                    data={DashboardOpsLead?.listPickAndPackPending}
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

export default PickAndPack