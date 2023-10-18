import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useLocation, useNavigate } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane
} from '@coreui/react'

import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import HeaderProject from '../HeaderProject'
import TableListOrderRequestFinalConfirm from 'src/components/dashboardOpsLead/finalConfirm/TableListOrderRequestFinalConfirm'
import TableListFinalConfirmCostTransportDelivery from 'src/components/dashboardOpsLead/finalConfirm/TableListFinalConfirmCostTransportDelivery'
import { cilMoney } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ModalCreateCost from 'src/components/dashboardOpsLead/finalConfirm/ModalCreateCost'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import TableListFinalConfirmWhCost from 'src/components/dashboardOpsLead/finalConfirm/TableListFinalConfirmWhCost'

function FinalConfirm() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})

    const [activeKey, setActiveKey] = useState(1)
    const { pathname } = useLocation();

    const [param, setParam] = useState({})

    const [openModalCreateCost, setOpenModalCreateCost] = useState(false)

    const [title, setTitle] = useState('Delivery')

    useEffect(() => {
        const uri = pathname.split('/');

        setInitValue({
            url: `/${uri[1]}/`,
            projectId: uri[2],
            whId: uri[3],
            transportArrangmentId: uri[6],
            costGroup: uri[7],
            processType: uri[5],
        })

        if (uri[4] === 'pickup') setTitle('Pickup')

        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, uri[2], Dashboard?.activeMenu)
            ).then(result => {
                const dtProjectFind = result.find(row => Number.parseInt(row.whId) === Number.parseInt(uri[3]))
                setDetailProject(dtProjectFind)

                if (activeKey === 1) {
                    dispatch(actions.getOrderRequestTransportArrangment(uri[6]))
                    dispatch(actions.getListFinalConfirmCostTransportDelivery(uri[6]))
                }

                if (activeKey === 2) {
                    dispatch(actions.getListFinalConfirmWhCost(uri[6]))
                }

            })



        }
    }, [Global?.user?.userID, activeKey]);

    const setInitValue = ({
        url,
        projectId,
        whId,
        transportArrangmentId,
        costGroup,
        processType
    }) => {
        setParam({
            url: url,
            projectId: projectId,
            whId: whId,
            transportArrangmentId: transportArrangmentId,
            costGroup: costGroup,
            processType: processType
        })
    }

    const handleCreateCost = () => {
        setOpenModalCreateCost(true)
    }

    const handleBack = () => {
        nav(param.url + param.projectId + "/" + param.whId + "/" + param.processType);
    }

    const handleConfirm = () => {
        dispatch(actions.transportArrangementFinalCostConfirmed(
            param.transportArrangmentId,
            Global?.user?.userID
        )).then(resp => {
            if (resp) {
                handleBack()
            }
        })
    }

    return (
        <>
            <CContainer fluid>
                <CRow className='mb-4'>
                    <CCol sm={12}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'></span>
                            Final Cost Transport {title} Waiting Confirmation Detail
                        </h4>
                    </CCol>
                </CRow>
                <CCard className="">
                    <CCardBody>
                        <CRow className='mt-3'>
                            <CCol sm={6}>
                                <HeaderProject data={detailProject} />
                            </CCol>
                        </CRow>
                        <CRow className='mt-3'>
                            <CNav variant="underline">
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                    >
                                        <p className={activeKey === 1 ? 'text-underline-tab' : ''}>FINAL COST CONFIRMATION</p>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                    >
                                        <p className={activeKey === 2 ? 'text-underline-tab' : ''}>WH COST</p>
                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                        </CRow>
                        <CRow className='mt-2'>
                            <CCol className="d-none d-md-block text-start">
                                <CTabContent>
                                    <CTabPane role="tablist" aria-labelledby="home-tab" visible={activeKey === 1}>
                                        <CRow>
                                            <CCol sm={5} className='mb-2'>
                                                <h5 className="card-title mb-0">
                                                    ORDER REQUEST NO
                                                </h5>
                                            </CCol>
                                        </CRow>
                                        <TableListOrderRequestFinalConfirm
                                            data={DashboardOpsLead?.listRequestTransportArragement}
                                            transportArrangmentId={param?.transportArrangmentId}
                                        />
                                        <CRow className='mt-5 mb-2'>
                                            <CCol sm={5} className='mb-2'>
                                                <h5 className="card-title mb-0">
                                                    COST TRANSPORT DELIVERY
                                                </h5>
                                            </CCol>
                                            <CCol>
                                                <CButton
                                                    onClick={() => handleCreateCost()}
                                                    className="float-end colorBtn-white me-2">
                                                    <CIcon
                                                        icon={cilMoney}
                                                        className="me-2 text-warning"
                                                    />
                                                    ADD COST
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                        <TableListFinalConfirmCostTransportDelivery
                                            data={DashboardOpsLead?.listFinalConfirmCostTransportDelivery}
                                            transportArrangmentId={param?.transportArrangmentId}
                                        />
                                    </CTabPane>
                                    <CTabPane role="tablist" aria-labelledby="home-tab" visible={activeKey === 2}>
                                        <TableListFinalConfirmWhCost
                                            data={DashboardOpsLead?.listFinalConfirmWhCost}
                                            transportArrangmentId={param?.transportArrangmentId}
                                        />
                                    </CTabPane>
                                </CTabContent>
                            </CCol>
                        </CRow>
                        <CRow className='py-2'>
                            <CCol className='text-end'>
                                <ButtonSubmit
                                    label='CONFIRM'
                                    type='button'
                                    handleButton={handleConfirm}
                                    className='me-2'
                                />
                                <ButtonCancel
                                    label='CANCEL'
                                    handleButton={handleBack}
                                />
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer>

            <ModalCreateCost
                open={openModalCreateCost}
                setOpen={setOpenModalCreateCost}
                data={param}
            />
        </>
    )
}

export default FinalConfirm