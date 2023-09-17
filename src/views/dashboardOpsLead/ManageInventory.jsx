import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

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

import * as actions from '../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilFile, cilSpreadsheet } from '@coreui/icons'
import TableListInventoryItem from 'src/components/dashboardOpsLead/manageInventory/TableListInventoryItem'
import TableListInventoryBox from 'src/components/dashboardOpsLead/manageInventory/TableListInventoryBox'
import TableListInboundFile from 'src/components/dashboardOpsLead/manageInventory/TableListInboundFile'
import TableListInboundLog from 'src/components/dashboardOpsLead/manageInventory/TableListInboundLog'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'
import Swal from 'sweetalert2'
import { downloadFileConfig } from 'src/helper/globalHelper'
import { useLocation } from 'react-router-dom'
import TableListOutboundLog from 'src/components/dashboardOpsLead/manageInventory/TableListOutboundLog'
import HeaderProject from './HeaderProject'

function ManageInventory() {
    const { dispatch, Global, Dashboard, DashboardOpsLead } = useRedux()
    const [whId, setWhId] = useState('')
    const [whCode, setWhCode] = useState('')
    const [whName, setWhName] = useState('')
    const [activeKey, setActiveKey] = useState(1)
    const [modalUpload, setModalUpload] = useState(false)
    const [inventoryType, setInventoryType] = useState('')
    const [templateUrl, setTemplateUrl] = useState("")
    const [templateName, setTemplateName] = useState("")
    const { pathname } = useLocation();


    useEffect(() => {
        const wId = pathname.split('/')[2];
        const wCode = pathname.split('/')[3]
        const wName = decodeURI(pathname.split('/')[4]);

        setWhId(wId)
        setWhCode(wCode)
        setWhName(wName)

        if (Global?.user?.token) {
            if (activeKey === 1) {
                dispatch(actions.getInventoryItem(wId))
                dispatch(actions.getInventoryBox(wId))
            }

            if (activeKey === 2) {
                dispatch(actions.getInboundFileUploadSummary(wId))
            }

            if (activeKey === 3) {
                dispatch(actions.getInboundTransactionSuccess(wId))
            }

            if (activeKey === 4) {
                dispatch(actions.getOutboundTransactionSuccess(wId))
            }

        }
    }, [Global?.user, activeKey]);

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
        dispatch(
            actions.getMassUploadInboundTemplate(type)
        ).then(reps => {
            setTemplateName(reps.templateName)
            setTemplateUrl(reps.templateURL)
            setInventoryType(type)
            setModalUpload(true)
        })
    }

    const handleExportExcelInboundLog = () => {
        dispatch(
            actions.inboundTransactionSuccessExportToExcel(whId, whCode)
        ).then(resp => {
            downloadFileConfig(resp, 'inbound_success_log.xlsx')
        })
    }

    const handleExportExcelInboundItem = () => {
        dispatch(
            actions.getInventoryItemBaseSummaryExportToExcel(whId, whCode)
        ).then(resp => {
            downloadFileConfig(resp, 'inbound_item.xlsx')
        })
    }

    const handleExportExcelInboundBox = () => {
        dispatch(
            actions.getInventoryBoxSummaryExportToExcel(whId, whCode)
        ).then(resp => {
            downloadFileConfig(resp, 'inbound_box.xlsx')
        })
    }

    const handleExportExcelOutboundLog = () => {
        dispatch(
            actions.outboundTransactionSuccessExportToExcel(whId, whCode)
        ).then(resp => {
            downloadFileConfig(resp, 'outbound_success_log.xlsx')
        })
    }

    const handleDownloadTemplate = () => {
        window.open(templateUrl, '_blank')
    }

    const handleUploadFile = (formData) => {
        if (formData) {
            if (inventoryType === 'item') {
                dispatch(actions.inboundItemFileUpload(
                    formData,
                    whId
                ))
            } else {
                dispatch(actions.inboundBoxFileUpload(
                    formData,
                    whId
                ))
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'File Empty !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const handleDownloadExcel = (type = 'box') => {
        if (type === 'item') {
            handleExportExcelInboundItem()
        } else {
            handleExportExcelInboundBox()
        }
    }

    return (
        <>
            <CContainer fluid>
                <CRow>
                    <CCol sm={5} className='mb-4'>
                        <HeaderProject data={{
                            projectName: 'MANAGE INVENTORY',
                            whName: whName,
                            whCode: whCode
                        }}
                        />
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
                            <CNavItem>
                                <CNavLink
                                    active={activeKey === 4}
                                    onClick={() => setActiveKey(4)}
                                >
                                    Outbound Success Log
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                    </CRow>
                    <CCardBody>
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                <CRow className=''>
                                    <CCol className="d-none d-md-block text-end">
                                        <CButton
                                            className="colorBtn-white me-3"
                                            onClick={() => handleDownloadExcel('item')}
                                        >
                                            <CIcon
                                                icon={cilSpreadsheet}
                                                className="me-2 text-warning" />
                                            DONWLOAD EXCEL INBOUND ITEM
                                        </CButton>
                                        <CButton
                                            className="colorBtn-white me-3"
                                            onClick={() => handleOpenModalUpload('item')}
                                        >
                                            <CIcon
                                                icon={cilCloudUpload}
                                                className="me-2 text-warning" />
                                            UPLOAD EXCEL INBOUND ITEM
                                        </CButton>
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
                                            handleComponent={handleComponent}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className=''>
                                    <CCol className="d-none d-md-block text-end">
                                        <CButton
                                            className="colorBtn-white me-3"
                                            onClick={() => handleDownloadExcel('box')}
                                        >
                                            <CIcon
                                                icon={cilSpreadsheet}
                                                className="me-2 text-warning" />
                                            DOWNLOAD EXCEL INBOUND BOX
                                        </CButton>
                                        <CButton
                                            className="colorBtn-white me-3"
                                            onClick={() => handleOpenModalUpload('box')}
                                        >
                                            <CIcon
                                                icon={cilCloudUpload}
                                                className="me-2 text-warning" />
                                            UPLOAD EXCEL INBOUND BOX
                                        </CButton>
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
                                    <CCol className="d-none d-md-block text-end me-2 mb-2">
                                        <CButton className="colorBtn-white" onClick={handleExportExcelInboundLog}>
                                            <CIcon icon={cilSpreadsheet} className="me-2 text-success" />
                                            EXPORT TO EXCEL
                                        </CButton>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="d-none d-md-block text-end">
                                        <TableListInboundLog
                                            data={DashboardOpsLead?.listInboundLog}
                                            handleComponent={handleComponent}
                                        />
                                    </CCol>
                                </CRow>
                            </CTabPane>
                        </CTabContent>
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 4}>
                                <CRow>
                                    <CCol sm={5} className='mb-4'>
                                        <h5 className="card-title mb-0">
                                            <span className='text-underline'>OUT</span>BOUND SUCCESS LOG
                                        </h5>
                                    </CCol>
                                </CRow>
                                <CRow className=''>
                                    <CCol className="d-none d-md-block text-end me-2 mb-2">
                                        <CButton className="colorBtn-white" onClick={handleExportExcelOutboundLog}>
                                            <CIcon icon={cilSpreadsheet} className="me-2 text-success" />
                                            EXPORT TO EXCEL
                                        </CButton>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="d-none d-md-block text-end">
                                        <TableListOutboundLog
                                            data={DashboardOpsLead?.listOutboundLog}
                                            handleComponent={handleComponent}
                                        />
                                    </CCol>
                                </CRow>
                            </CTabPane>
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CContainer >

            <ModalUploadFile
                open={modalUpload}
                setOpen={setModalUpload}
                handleDownloadTemplate={handleDownloadTemplate}
                templateName={templateName}
                handleUpload={handleUploadFile}
            />
        </>
    )
}

export default ManageInventory