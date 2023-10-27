import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
    CTabContent,
} from '@coreui/react'
import {
    cilPlus
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateTemplateSetting from 'src/components/dashboard/masterWarehouse/templateSetting/ModalCreateTemplateSetting'
import TableListTemplateSetting from 'src/components/dashboard/masterWarehouse/templateSetting/TableListTemplateSetting'
import { useLocation, useNavigate } from 'react-router-dom'

function TemplateSetting() {
    const nav = useNavigate();
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState("")
    const { pathname } = useLocation();

    useEffect(() => {
        const id = pathname.split('/')[2]
        setProjectId(id)
        if (Global?.user?.token) {
            dispatch(actions.getListTemplateSetting(id))
        }
    }, [projectId]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let dnSetupId = data?.dnSetupId
            dispatch(actions.setStatusActiveTemplateSetting(val, dnSetupId, projectId))
                .then(resp => {
                    if (resp === 'success') {
                        dispatch(actions.getListTemplateSetting(projectId))
                    }
                })
        }, [Dashboard.listTemplateSetting]
    )

    return (
        <>
            <CContainer fluid>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>DN</span> TEMPLATE SETTING
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol className="d-none d-md-block">
                        <CButton className="colorBtn-white" onClick={handleCreate}>
                            <CIcon icon={cilPlus} className="me-2 text-warning" />
                            ADD DN TEMPLATE SETTING
                        </CButton>
                    </CCol>
                </CRow>
                <br />
                <CCard className="">
                    <CCardBody>
                        <CRow>
                            <CCol className="d-none d-md-block text-end">
                                <CTabContent>
                                    <TableListTemplateSetting
                                        data={Dashboard?.listTemplateSetting}
                                        handleToogle={handleToogle}
                                    />
                                </CTabContent>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer >

            <ModalCreateTemplateSetting
                open={modalCreate}
                setOpen={setModalCreate}
                projectId={projectId}
            />

        </>
    )
}

export default TemplateSetting