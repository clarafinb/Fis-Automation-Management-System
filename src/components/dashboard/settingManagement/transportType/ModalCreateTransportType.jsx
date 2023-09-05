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
    CForm
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import Select from 'react-select'

function ModalCreateTransportType({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [transportTypeList, setTransportTypeList] = useState([])
    const [selectedTransportType, setSelectedTransportType] = useState({})

    useEffect(() => {

        setValues({})
        setSelectedTransportType({})

        if (Global?.user?.token && open) {
            dispatch(actions.getSelectActiveTransport()).then(e => {
                setTransportTypeList(e)
            })
        }
    }, [Global?.user, open]);

    const handleCreateTransportType = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let payload = {
            transportName: values.transportName,
            transportModeId: selectedTransportType.value,
            transportTypeCode: values.transportTypeCode,
            LMBY: Global?.user?.userID
        }

        dispatch(actions.createTransportType(payload))
        setOpen(false)
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

    const handleOnChangeTransportType = (selectedTransportType) => {
        setSelectedTransportType(selectedTransportType);
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
                        <CFormLabel className="col-form-label">Transport Type Code<code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="transportTypeCode"
                                value={values?.transportTypeCode}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Transport Mode<code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={transportTypeList}
                                isSearchable={true}
                                value={selectedTransportType}
                                onChange={handleOnChangeTransportType}
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
