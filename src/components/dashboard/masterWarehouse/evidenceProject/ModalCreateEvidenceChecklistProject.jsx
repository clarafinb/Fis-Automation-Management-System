import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
    CFormInput,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import Select from 'react-select'

function ModalCreateEvidenceChecklistProject({ open, setOpen, projectId }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [checklistType, setChecklistType] = useState([])
    const [selectedEvidenceChecklist, setSelectedEvidenceChecklist] = useState({})

    useEffect(() => {
        if (Global?.user?.token && open) {
            dispatch(actions.getProjectEvidenceChecklistNotRegisteredYet(projectId)).then(e => {
                setChecklistType(e)
            })
            setSelectedEvidenceChecklist({})
        }
    }, [Global?.user, open]);

    const handleCreateEvidenceChecklistProject = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let payload = {
            evidenceChecklistId: selectedEvidenceChecklist?.value,
            projectId: projectId,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createEvidenceChecklistProject(payload))
        setOpen(false)
    }

    const handleOnChangeChecklistType = (selectedEvidenceChecklist) => {
        setSelectedEvidenceChecklist(selectedEvidenceChecklist);
    }

    return (
        <CModal
            // size="xl"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
        >
            <CModalHeader>
                <CModalTitle>ADD EVICENDE CHECKLIST</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateEvidenceChecklistProject}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">CHECKLIST NAME <code>(*)</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={checklistType}
                                isSearchable={true}
                                value={selectedEvidenceChecklist}
                                onChange={handleOnChangeChecklistType}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CCol className="d-grid gap-2">
                            <ButtonSubmit type="submit" />
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
        </CModal>
    )
}

export default ModalCreateEvidenceChecklistProject;
