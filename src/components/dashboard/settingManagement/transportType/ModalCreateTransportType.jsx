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
    CFormSelect,
    CForm
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateTransportType({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [transportTypeList, setTransportTypeList] = useState([])

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getSelectActiveTransport()).then(e => {
                setTransportTypeList(e)
            })
        }
    }, [Global?.user]);

    const handleCreateTransportType = (event) => {
        let payload = {
            transportName: values.transportName,
            transportModeId: values.transportModeId,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createTransportType(payload))

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

    return (
        <CModal
            // size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        // alignment='center'
        >
            <CModalHeader>
                <CModalTitle>ADD TRANSPORT TYPE</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateTransportType}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Transport Name<code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="transportName"
                                value={values?.transportName}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Transport Type<code>*</code></CFormLabel>
                        <CCol>
                            <CFormSelect
                                name="transportModeId"
                                options={transportTypeList}
                                onChange={handleOnchange}
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

export default ModalCreateTransportType;
