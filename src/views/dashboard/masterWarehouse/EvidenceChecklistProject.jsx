import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow
} from '@coreui/react'
import {
    cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateEvidenceChecklistProject from 'src/components/dashboard/masterWarehouse/evidenceProject/ModalCreateEvidenceChecklistProject'
import TableListEvidenceChecklistProject from 'src/components/dashboard/masterWarehouse/evidenceProject/TableListEvidenceChecklistProject'

function EvidenceChecklistProject() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState('')

    useEffect(() => {
        if (Global?.user?.token) {
            const id = window.location.href.split("/").pop();
            setProjectId(id)
            dispatch(actions.getListEvidenceChecklistProject(id))
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let evidenceChecklistProjectId = data?.evidenceChecklistProjectId
            dispatch(actions.setStatusEvidenceChecklistProject(val, evidenceChecklistProjectId))
        }, [Dashboard.listEvidenceChecklistProject]
    )

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>PR</span>OJECT EVIDENCE CHECKLIST
                    </h4>
                </CCol>
            </CRow>
            <br />
            <CRow>
                <CCol className="">
                    <CButton
                        className="colorBtn-white"
                        onClick={handleCreate}>
                        <CIcon icon={cilPlus}
                            className="me-2 text-warning"
                        />
                        <b>ADD PROJECT EVIDENCE CHECKLIST</b>
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol>
                            <TableListEvidenceChecklistProject
                                data={Dashboard?.listEvidenceChecklistProject}
                                handleToogle={handleToogle}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateEvidenceChecklistProject open={modalCreate} setOpen={setModalCreate} projectId={projectId} />
        </>
    )
}

export default EvidenceChecklistProject