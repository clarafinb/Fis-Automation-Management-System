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
    CFormSelect,
    CForm
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import { separateComma } from 'src/utils/number'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

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

    const handleCreateProjectServiceCharge = (event) => {
        let payload = {
            projectId: projectId,
            serviceChargeId: values.serviceChargeId,
            currencyId: values.currencyId,
            chargeFee: values.chargeFee.replace(/,/g, ''),
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createProjectServiceCharge(payload))
        setValues({})

        event.preventDefault()
        event.stopPropagation()
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
            // size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>ADD PROJECT SERVICE SHARGE</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateProjectServiceCharge}>
                <CRow className="mb-3">
                    <CFormLabel className="col-form-label">Service Charge <code>*</code></CFormLabel>
                    <CCol>
                        <CFormSelect
                            name="serviceChargeId"
                            options={projectServiceChargeList}
                            onChange={handleOnchange}
                            required
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-form-label">Currency <code>*</code></CFormLabel>
                    <CCol>
                        <CFormSelect
                            name="currencyId"
                            options={currency}
                            onChange={handleOnchange}
                            required
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-form-label">Charge Fee <code>*</code></CFormLabel>
                    <CCol>
                        <CFormInput
                            type="text"
                            name="chargeFee"
                            value={values?.chargeFee}
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

export default ModalCreateProjectServiceCharge;
