import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useLocation } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow
} from '@coreui/react'
import * as actions from '../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import TableListMasterLocation from 'src/components/dashboardOpsLead/masterLocation/TableListMasterLocation'
import ModalCreateMasterLocation from 'src/components/dashboardOpsLead/masterLocation/ModalCreateMasterLocation'


function MasterLocation() {
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [routeCategoryList, setRouteCategoryList] = useState([])
    const [projectId, setProjectId] = useState(null)
    const { pathname } = useLocation();

    useEffect(() => {
        const pId = pathname.split('/')[3]
        const wId = pathname.split('/')[4]
        setProjectId(pId)
        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, pId)
            ).then(result => {
                const dtProjectFind = result.find(row => row.whId == wId)
                setDetailProject(dtProjectFind)
                dispatch(actions.getListMasterLocation(pId))
                dispatch(actions.getSelecRouteCategory()).
                    then(resp => {
                        setRouteCategoryList(resp)
                    })
            })
        }
    }, [Global?.user?.userID]);

    const handleComponent = useCallback(
        (action, pointCodeId) => {
            dispatch(actions.deleteMasterLocation(pointCodeId, Global.user.userID, projectId))
        }
    )

    const handleOpenModal = (e) => {
        setOpenModal(true)
    }

    return (
        <>
            <CContainer>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>MA</span>STER LOCATION
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol className="d-none d-md-block">
                        <CButton className="colorBtn-white me-3" onClick={handleOpenModal}>
                            <CIcon icon={cilPlus} className="me-2 text-warning" />
                            ADD MASTER LOCATION
                        </CButton>
                    </CCol>
                </CRow>
            </CContainer>
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
                            <TableListMasterLocation
                                data={DashboardOpsLead?.listMasterLocation}
                                handleComponent={handleComponent}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateMasterLocation
                open={openModal}
                setOpen={setOpenModal}
                routeCategoryList={routeCategoryList}
                projectId={projectId}
            />
        </>
    )
}

export default MasterLocation