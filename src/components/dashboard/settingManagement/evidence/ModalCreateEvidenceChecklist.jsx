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

function ModalCreateEvidenceChecklist({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [checklistType, setChecklistType] = useState([])
    const [selectedChecklistType, setSelectedChecklistType] = useState({})

    useEffect(() => {
        if (Global?.user?.token && open) {
            dispatch(actions.getSelectEvidenceChecklistType()).then(e => {
                setChecklistType(e)
            })
            setValues({})
            setSelectedChecklistType({})
        }
    }, [Global?.user, open]);

    const handleCreateEvidenceChecklist = (event) => {
        let payload = {
            checklistTypeId: selectedChecklistType?.value,
            checklistName: values.checklistName,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createEvidenceChecklist(payload))

        event.preventDefault()
        event.stopPropagation()
    }

    const handleOnchange = useCallback(
        (e) => {
            const { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleOnChangeChecklistType = (selectedChecklistType) => {
        setSelectedChecklistType(selectedChecklistType);
    }

    return (
        <CModal
            // size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>ADD CHECKLIST CREATION</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateEvidenceChecklist}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">CHECKLIST NAME <code>(*)</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="checklistName"
                                value={values?.checklistName}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">CHECKLIST TYPE <code>(*)</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={checklistType}
                                isSearchable={true}
                                value={selectedChecklistType}
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

export default ModalCreateEvidenceChecklist;
