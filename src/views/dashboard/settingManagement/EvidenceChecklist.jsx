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
import ModalCreateEvidenceChecklist from 'src/components/dashboard/settingManagement/evidence/ModalCreateEvidenceChecklist'
import TableListEvidenceChecklist from 'src/components/dashboard/settingManagement/evidence/TableListEvidenceChecklist'

function EvidenceChecklist() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListEvidenceChecklist())
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let evidenceChecklistId = data?.evidenceChecklistId
            dispatch(actions.setStatusEvidenceChecklist(val, evidenceChecklistId))
        }, [Dashboard.listEvidenceChecklist]
    )

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>MA</span>STER EVIDENCE CHECKLIST
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
                        <b>ADD MASTER EVIDENCE CHECKLIST</b>
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol>
                            <TableListEvidenceChecklist
                                data={Dashboard?.listEvidenceChecklist}
                                handleToogle={handleToogle}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateEvidenceChecklist open={modalCreate} setOpen={setModalCreate} />
        </>
    )
}

export default EvidenceChecklist