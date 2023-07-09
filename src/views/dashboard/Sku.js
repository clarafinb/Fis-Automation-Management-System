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
    cilCloudUpload,
    cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../config/redux/Dashboard/actions'
import ModalCreateSku from 'src/components/dashboard/sku/ModalCreateSku'
import TableListSku from 'src/components/dashboard/sku/TableListSku'

function Sku() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState()
    const [activeKey, setActiveKey] = useState(1)

    useEffect(() => {
        if (Global?.user?.token) {
            const id = window.location.href.split("/").pop();
            setProjectId(id)
            dispatch(actions.getListSku(id))
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleBulkUpload = () => {

    }

    const handleToogle = useCallback(
        (val, id) => {
            let data = Dashboard.listSku[id]
            let skuId = data.detail.materialId

            dispatch(actions.setStatusActiveSku(val, skuId, projectId))

        }, [Dashboard.listSku]
    )

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
                        {/* </CCol>
                    <CCol className="d-none d-md-block"> */}
                        <CButton className="colorBtn-white ms-3" onClick={handleBulkUpload}>
                            <CIcon icon={cilCloudUpload} className="me-2 text-warning" />
                            BULK UPLOAD PROJECT MASTER SKU
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
        </>
    )
}

export default Sku