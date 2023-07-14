import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
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

import * as actions from '../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilFile } from '@coreui/icons'
import TableListInventoryItem from 'src/components/dashboardOpsLead/manageInventory/TableListInventoryItem'
import TableListInventoryBox from 'src/components/dashboardOpsLead/manageInventory/TableListInventoryBox'
import ModalUploadItemList from 'src/components/dashboardOpsLead/manageInventory/ModalUploadItemList'
import TableListInboundFile from 'src/components/dashboardOpsLead/manageInventory/TableListInboundFile'
import TableListInboundLog from 'src/components/dashboardOpsLead/manageInventory/TableListInboundLog'

function ManageInventory() {
    const { dispatch, Global, Dashboard, DashboardOpsLead } = useRedux()
    const [whId, setWhId] = useState('')
    const [whCode, setWhCode] = useState('')
    const [activeKey, setActiveKey] = useState(1)
    const [modalUpload, setModalUpload] = useState(false)
    const [inventoryType, setInventoryType] = useState('')

    useEffect(() => {
        const uriSegment = window.location.href.split("/");
        const wId = uriSegment[6];
        const wCode = uriSegment[7]
        setWhId(wId)
        setWhCode(wCode)
        if (Global?.user?.token) {
            dispatch(actions.getInventoryItem(wId))
            dispatch(actions.getInventoryBox(wId))
            dispatch(actions.getInboundFileUploadSummary(wId))
            dispatch(actions.getInboundTransactionSuccess(wId))
        }
    }, [Global?.user]);

    const handleToogle = useCallback(
        (val, { subDistrictId }) => {
            // dispatch(actions.setStatusActiveSubDistrict(val, subDistrictId))
        }, [DashboardOpsLead.listInventoryItem]
    )

    const downloadFileConfig = (data, fileName = 'file.xlsx') => {
        // create file link in browser's memory
        const href = URL.createObjectURL(data);
        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', fileName); //or any other extension
        document.body.appendChild(link);
        link.click();
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    const handleComponent = useCallback(
        (type, val, data) => {
            if (type === 'downloadFile') {
                window.open(data.filePath, '_blank')
            }
            if (type === 'downloadErr') {
                const { inbFileId, fileName } = data
                dispatch(
                    actions.inboundErrLogExportToExcel(inbFileId, fileName)
                ).then(resp => {
                    downloadFileConfig(resp, fileName)
                })
            }
        }
    )

    const handleOpenModalUpload = (type) => {
        setInventoryType(type)
        setModalUpload(true)
    }

    const handleExportExcelInboundLog = () => {
        dispatch(
            actions.inboundTransactionSuccessExportToExcel(whId, whCode)
        ).then(resp => {
            downloadFileConfig(resp, 'inbound_success_log.xlsx')
        })
    }

    return (
        <>
            <CContainer>
                <CRow>
                    <CCol sm={5} className='mb-4'>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>MA</span>NAGE INVENTORY
                        </h4>
                    </CCol>
                </CRow>
                <CCard className="">
                    <CRow className='m-3'>
                        <CNav variant="tabs">
                            <CNavItem>
                                <CNavLink
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                >
                                    Inventory
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                >
                                    Bulk Upload
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                >
                                    Inbound Success Log
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                    </CRow>
                    <CCardBody>
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                <CRow className=''>
                                    <CCol className="d-none d-md-block text-end">
                                        <CIcon
                                            icon={cilCloudUpload}
                                            className="me-2 text-secondary"
                                            size="xl"
                                            onClick={() => handleOpenModalUpload('item')}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm={5} className='mb-4'>
                                        <h5 className="card-title mb-0">
                                            <span className='text-underline'>IN</span>BOUND ITEM BASE
                                        </h5>
                                    </CCol>
                                </CRow>
                                <CRow className='mb-5'>
                                    <CCol className="d-none d-md-block text-end">
                                        <TableListInventoryItem
                                            data={DashboardOpsLead?.listInventoryItem}
                                            handleToogle={handleToogle}
                                            handleComponent={handleComponent}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className=''>
                                    <CCol className="d-none d-md-block text-end">
                                        <CIcon
                                            icon={cilCloudUpload}
                                            className="me-2 text-secondary"
                                            size="xl"
                                            onClick={() => handleOpenModalUpload('box')}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm={5} className='mb-4'>
                                        <h5 className="card-title mb-0">
                                            <span className='text-underline'>IN</span>BOUND BOX
                                        </h5>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="d-none d-md-block text-end">
                                        <TableListInventoryBox
                                            data={DashboardOpsLead?.listInventoryBox}
                                            handleToogle={handleToogle}
                                            handleComponent={handleComponent}
                                        />
                                    </CCol>
                                </CRow>
                            </CTabPane>
                        </CTabContent>
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                                <CRow>
                                    <CCol sm={5} className='mb-4'>
                                        <h5 className="card-title mb-0">
                                            <span className='text-underline'>IN</span>BOUND FILE
                                        </h5>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="d-none d-md-block text-end">
                                        <TableListInboundFile
                                            data={DashboardOpsLead?.listInboundFile}
                                            handleToogle={handleToogle}
                                            handleComponent={handleComponent}
                                        />
                                    </CCol>
                                </CRow>
                            </CTabPane>
                        </CTabContent>
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                                <CRow>
                                    <CCol sm={5} className='mb-4'>
                                        <h5 className="card-title mb-0">
                                            <span className='text-underline'>IN</span>BOUND SUCCESS LOG
                                        </h5>
                                    </CCol>
                                </CRow>
                                <CRow className=''>
                                    <CCol className="d-none d-md-block text-end">
                                        <CIcon
                                            icon={cilFile}
                                            title='Export Excel'
                                            className="me-2 text-success"
                                            size="xl"
                                            onClick={handleExportExcelInboundLog}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="d-none d-md-block text-end">
                                        <TableListInboundLog
                                            data={DashboardOpsLead?.listInboundLog}
                                            handleToogle={handleToogle}
                                            handleComponent={handleComponent}
                                        />
                                    </CCol>
                                </CRow>
                            </CTabPane>
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CContainer >

            <ModalUploadItemList
                open={modalUpload}
                setOpen={setModalUpload}
                whId={whId}
                type={inventoryType}
            />
        </>
    )
}

export default ManageInventory