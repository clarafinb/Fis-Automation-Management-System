import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import Swal from 'sweetalert2'

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
    CTabPane,
} from '@coreui/react'
import {
    cilPlus, cilSpreadsheet, cilX,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../../config/redux/Dashboard/actions'
import TableListMrsDetail from 'src/components/dashboard/masterWarehouse/mrs/TableListMrsDetail'
import { useLocation, useNavigate } from 'react-router-dom'
import ModalCreateMrsDetail from 'src/components/dashboard/masterWarehouse/mrs/ModalCreateMrsDetail'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'
import TableListMrsDetailBulkUpload from 'src/components/dashboard/masterWarehouse/mrs/TableListMrsDetailBulkUpload'

function MrsDetail() {
    const nav = useNavigate();
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState("")
    const [mrsId, setMrsId] = useState("")
    const { pathname } = useLocation();

    const [activeKey, setActiveKey] = useState(1)
    const [url, setUrl] = useState('')

    const [modalUpload, setModalUpload] = useState(false)
    const [templateUrl, setTemplateUrl] = useState("")
    const [templateName, setTemplateName] = useState("")

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const mrId = pathname.split('/')[4]
        const uri = pathname.split('/')[1]

        setProjectId(pId)
        setMrsId(mrId)
        setUrl(uri)

        if (Global?.user?.token) {
            if (activeKey === 1) dispatch(actions.getListMrsDetail(mrId))
            if (activeKey === 2) dispatch(actions.getListMrsDetailBulkUpload(mrId))
        }

    }, [Global?.user?.token, activeKey]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleComponent = useCallback(
        (action, data) => {
            if (action === 'delete') deleteMrsDetail(data.mrsDetailId)
            if (action === 'download') handleDownloadFile(data.vFilePath)
        }
    )

    const deleteMrsDetail = (mrsDetailId) => {
        dispatch(actions.deleteMrsDetail(mrsDetailId, Global.user.userID))
            .then(resp => {
                if (resp === 'success') dispatch(actions.getListMrsDetail(mrsId))
            })
    }


    const handleBulkCreate = () => {
        dispatch(
            actions.getBulkUploadMRSDetailTemplate()
        ).then(reps => {
            setTemplateName(reps.templateName)
            setTemplateUrl(reps.templateURL)
            setModalUpload(true)
        })
    }

    const handleBack = () => {
        nav("/" + url + "/" + projectId, { replace: true })
    }

    const handleDownloadTemplate = () => {
        window.open(templateUrl, '_blank')
    }

    const handleDownloadFile = (url) => {
        window.open(url, '_blank')
    }

    const handleUploadFile = (formData) => {
        if (formData) {
            dispatch(actions.mrsDetailBulkUpload(
                formData,
                mrsId
            ))
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'File Empty !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }


    return (
        <>
            <CContainer fluid>
                <CCard className="">
                    <CCardBody>
                        <CRow className='mb-2'>
                            <CCol sm={5}>
                                <h4 className="card-title mb-0">
                                    <span className='text-underline'>MRS</span> DETAIL
                                </h4>
                            </CCol>
                        </CRow>
                        <CRow className='mt-1'>
                            <CNav variant="underline">
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                    >
                                        <p className={activeKey === 1 ? 'text-underline-tab' : ''}>MRS LIST</p>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                    >
                                        <p className={activeKey === 2 ? 'text-underline-tab' : ''}>BULK UPLOAD</p>
                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                        </CRow>
                        <CTabContent>
                            <CTabPane role="tablist" aria-labelledby="home-tab" visible={activeKey === 1}>
                                {/* MRS LIST */}
                                <CRow>
                                    <CCol className="d-none d-md-block p-2 text-end">
                                        <CButton className="colorBtnIcon-blue me-1" onClick={handleCreate}>
                                            <CIcon icon={cilPlus} className="me-2 text-white" />
                                            ADD NEW MRS
                                        </CButton>
                                        <CButton className="colorBtnIcon-blue me-1" onClick={handleBulkCreate}>
                                            <CIcon icon={cilSpreadsheet} className="me-2 text-white" />
                                            BULK MRS UPLOAD
                                        </CButton>
                                        <CButton className="colorBtnIcon-red" onClick={handleBack}>
                                            <CIcon icon={cilX} className="me-2 text-black" />
                                            BACK TO LIST
                                        </CButton>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="d-none d-md-block text-end">
                                        <CTabContent>
                                            <TableListMrsDetail
                                                data={Dashboard?.listMrsDetail}
                                                handleComponent={handleComponent}
                                            />
                                        </CTabContent>
                                    </CCol>
                                </CRow>
                            </CTabPane>
                            <CTabPane role="tablist" aria-labelledby="home-tab" visible={activeKey === 2}>
                                {/* MRS LIST BULK UPLOAD*/}
                                <TableListMrsDetailBulkUpload
                                    data={Dashboard?.listMrsDetailBulkUpload}
                                    handleComponent={handleComponent}
                                />
                            </CTabPane>
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CContainer >

            <ModalCreateMrsDetail
                open={modalCreate}
                setOpen={setModalCreate}
                mrsId={mrsId}
            />

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

export default MrsDetail