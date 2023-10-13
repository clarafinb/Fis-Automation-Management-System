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
    CForm,
    CFormCheck
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import { separateComma } from 'src/utils/number'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreateProjectServiceCharge({ open, setOpen, projectId }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [projectServiceChargeList, setProjectServiceChargeList] = useState([])
    const [currency, setCurrency] = useState([])
    const [disableChargeStatus, setDisableChargeStatus] = useState(true)

    useEffect(() => {
        if (Global?.user?.token && open) {

            setValues((prev) => ({
                ...prev,
                chargeFee: 0
            }));

            dispatch(actions.getSelectActiveCurrency()).then(e => {
                setCurrency(e)
            })
            if (projectId) {
                dispatch(actions.getSelectProjectServiceChargeNotRegistered(projectId)).then(e => {
                    setProjectServiceChargeList(e)
                })
            }
        }
    }, [projectId, open]);

    const handleCreateProjectServiceCharge = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            projectId: projectId,
            serviceChargeId: values.serviceChargeId,
            currencyId: values.currencyId,
            hasFixedPrice: values.hasFixedPrice,
            chargeFee: values.hasFixedPrice ?
                values.chargeFee : 0,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.createProjectServiceCharge(payload))
        setValues({})
        setOpen(false)

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

    const handleOnchangeCheck = (event) => {
        const { name, checked } = event.target;
        setValues({
            ...values,
            [name]: checked,
        });

        setDisableChargeStatus(!checked)

        if (!checked) {
            setValues((prev) => ({
                ...prev,
                chargeFee: 0
            }));
        }
    };


    return (
        <CModal
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
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
                        <CCol>
                            <CFormCheck
                                id="flexCheckDefault"
                                label="Fixed Price"
                                name='hasFixedPrice'
                                onChange={handleOnchangeCheck}
                                checked={values?.hasFixedPrice}
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
                                disabled={disableChargeStatus}
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
