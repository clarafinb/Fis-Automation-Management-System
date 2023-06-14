import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCol,
    CRow,
    CFormInput,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormSelect
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'

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

    const handleCreateTransportType = () => {
        let payload = {
            transportName: values.transportName,
            transportModeId: values.transportModeId,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createTransportType(payload))
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
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Transport Type Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Transport Name</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput type="text" name="transportName" value={values?.serviceChargeCode} onChange={handleOnchange} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Transport Type</CFormLabel>
                    <CCol sm={10}>
                        <CFormSelect
                            name="transportModeId"
                            options={transportTypeList}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreateTransportType}>Add</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateTransportType;
