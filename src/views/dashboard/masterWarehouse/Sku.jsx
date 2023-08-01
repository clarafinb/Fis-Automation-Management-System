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
import {
    cilArrowThickToBottom,
    cilCloudUpload,
    cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateSku from 'src/components/dashboard/masterWarehouse/sku/ModalCreateSku'
import TableListSku from 'src/components/dashboard/masterWarehouse/sku/TableListSku'
import TableListBulkUploadSku from 'src/components/dashboard/masterWarehouse/sku/TableListBulkUploadSku'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'
import Swal from 'sweetalert2'
import { downloadFileConfig } from 'src/helper/globalHelper'
import { useLocation } from 'react-router-dom'

function Sku() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState("")
    const [projectName, setProjectName] = useState("")
    const [activeKey, setActiveKey] = useState(1)
    const [openModalUpload, setOpenModalUpload] = useState(false)
    const [templateName, setTemplateName] = useState("")
    const [templateUrl, setTemplateUrl] = useState("")
    const [detailProject, setDetailProject] = useState({})
    const { pathname } = useLocation();

    useEffect(() => {
        if (Global?.user?.token) {
            const id = pathname.split('/')[3]
            const pName = decodeURI(pathname.split('/')[4])
            setProjectId(id)
            setProjectName(pName)

            if (activeKey === 1) {
                dispatch(actions.getListSku(id))
            }

            if (activeKey === 2) {
                dispatch(actions.getMaterialBulkUploadResult(id))
            }
        }
    }, [Global?.user, activeKey]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleBulkUpload = () => {
        dispatch(
            actions.getMassUploadSKUTemplate()
        ).then(resp => {
            setTemplateUrl(resp.templateURL)
            setTemplateName(resp.templateName)
            setOpenModalUpload(true)
        })
    }

    const handleToogle = useCallback(
        (val, data) => {
            let skuId = data?.materialId

            dispatch(actions.setStatusActiveSku(val, skuId, projectId))

        }, [Dashboard.listSku]
    )

    const handleComponent = useCallback(
        (name, val) => {
            if (name === 'download') {
                window.open(val.filePath, '_blank')
            }
            if (name === 'downloadError') {
                dispatch(
                    actions.getMasterSKUBulkUploadErrList(val.bulkUploadId, val.fileName)
                ).then(resp => {
                    downloadFileConfig(resp, 'error_sku_' + projectName + '_' + Date.now() + 'xlsx')
                })
            }
        }
    )

    const handleDownloadTemplate = () => {
        window.open(templateUrl, '_blank')
    }

    const handleUploadFile = (formData) => {
        if (formData) {
            dispatch(
                actions.masterMaterialBulkUpload(
                    formData,
                    projectId
                )
            )
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'File Empty !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const handleExportExcel = () => {
        dispatch(
            actions.getMasterSKUExportToExcel(projectId, projectName)
        ).then(resp => {
            downloadFileConfig(resp, 'sku_' + projectName + '_' + Date.now() + 'xlsx')
        })
    }

    return (
        <>
            <CContainer>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>PR</span>OJECT MASTER SKU
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol className="d-none d-md-block">
                        <CButton className="colorBtn-white" onClick={handleCreate}>
                            <CIcon icon={cilPlus} className="me-2 text-warning" />
                            ADD PROJECT MASTER SKU
                        </CButton>
                        <CButton className="colorBtn-white ms-3" onClick={handleBulkUpload}>
                            <CIcon icon={cilCloudUpload} className="me-2 text-warning" />
                            BULK UPLOAD PROJECT MASTER SKU
                        </CButton>
                        <CButton className="colorBtn-white ms-3" onClick={handleExportExcel}>
                            <CIcon icon={cilArrowThickToBottom} className="me-2 text-success" />
                            DOWNLOAD MASTER SKU
                        </CButton>
                    </CCol>
                </CRow>
                <br />
                <CCard className="">
                    <CCardBody>
                        <CRow className='mb-4'>
                            <CCol className="">
                                <CNav variant="tabs">
                                    <CNavItem>
                                        <CNavLink
                                            active={activeKey === 1}
                                            onClick={() => setActiveKey(1)}
                                        >
                                            Master SKU
                                        </CNavLink>
                                    </CNavItem>
                                    <CNavItem>
                                        <CNavLink
                                            active={activeKey === 2}
                                            onClick={() => setActiveKey(2)}
                                        >
                                            Bulk Upload Result
                                        </CNavLink>
                                    </CNavItem>
                                </CNav>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol className="d-none d-md-block text-end">
                                <CTabContent>
                                    <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                        <TableListSku
                                            data={Dashboard?.listSku}
                                            handleToogle={handleToogle}
                                        />
                                    </CTabPane>
                                    <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                                        <TableListBulkUploadSku
                                            data={Dashboard?.listBulkUploadSku}
                                            handleComponent={handleComponent}
                                        />
                                    </CTabPane>
                                </CTabContent>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer >

            <ModalCreateSku
                open={modalCreate}
                setOpen={setModalCreate}
                projectId={projectId}
            />

            <ModalUploadFile
                open={openModalUpload}
                setOpen={setOpenModalUpload}
                handleDownloadTemplate={handleDownloadTemplate}
                templateName={templateName}
                handleUpload={handleUploadFile}
            />
        </>
    )
}

export default Sku