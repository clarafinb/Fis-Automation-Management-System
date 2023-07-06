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
import { separateComma } from 'src/utils/number'

function ModalCreateProjectServiceCharge({ open, setOpen, projectId }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [projectServiceChargeList, setProjectServiceChargeList] = useState([])
    const [currency, setCurrency] = useState([])

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getSelectActiveCurrency()).then(e => {
                setCurrency(e)
            })
            if (projectId) {
                dispatch(actions.getSelectProjectServiceChargeNotRegistered(projectId)).then(e => {
                    setProjectServiceChargeList(e)
                })
            }
        }
    }, [projectId]);

    const handleCreateProjectServiceCharge = () => {
        let payload = {
            projectId: projectId,
            serviceChargeId: values.serviceChargeId,
            currencyId: values.currencyId,
            chargeFee: values.chargeFee.replace(/,/g, ''),
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createProjectServiceCharge(payload))
        setValues({})
    }

    const handleOnchange = useCallback(
        (e) => {
            let { value, name } = e.target;
            if (name === 'chargeFee') value = separateComma(value)
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
                <CModalTitle>Service Charge Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Service Charge <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormSelect
                            name="serviceChargeId"
                            options={projectServiceChargeList}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Currency <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormSelect
                            name="currencyId"
                            options={currency}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Charge Fee <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="chargeFee"
                            value={values?.chargeFee}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreateProjectServiceCharge}>Add</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateProjectServiceCharge;
