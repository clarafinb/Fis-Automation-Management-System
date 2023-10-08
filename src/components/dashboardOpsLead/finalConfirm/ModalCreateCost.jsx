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
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import Select from 'react-select'

function ModalCreateCost({ open, setOpen, data }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})

    const [selectedServiceCharge, setSelectedServiceCharge] = useState({})
    const [serviceChargeList, setServiceChargeList] = useState([])

    const [selectedOrderReq, setSelectedOrderReq] = useState({})
    const [orderReqList, setOrderReqList] = useState([])

    useEffect(() => {
        resetForm()

        if (open && Global?.user?.userID) {
            setDefaultValue()
            dispatch(actions.getProjectServiceChargeGetAllActiveOnly(data.projectId))
                .then(ress => {
                    setServiceChargeList(ress)
                })

            if (data.costGroup === "no") {
                dispatch(actions.getSelectOrderRequestTransportArrangment(data.transportArrangmentId))
                    .then(ress => {
                        setOrderReqList(ress)
                    })

            }
        }

    }, [Global?.user?.userID, open]);

    const resetForm = () => {
        setSelectedOrderReq({})
        setSelectedServiceCharge({})
        setValues({})
    }

    const setDefaultValue = () => {
        setValues((prev) => ({
            ...prev,
            serviceQty: 1
        }));
    }

    const handleOnChangeServiceCharge = (selectedServiceCharge) => {
        setSelectedServiceCharge(selectedServiceCharge);
        setValues((prev) => ({
            ...prev,
            chargeFee: selectedServiceCharge?.extra?.chargeFee
        }));
    }

    const handleOnChangeOrderReq = (selectedOrderReq) => {
        setSelectedOrderReq(selectedOrderReq);
    }

    const handleCreateCost = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            transportArrangementId: data.transportArrangmentId,
            orderReqId: data.costGroup === 'no' ? selectedOrderReq.value : 0,
            projectServiceChargeId: selectedServiceCharge.value,
            serviceCost: values?.chargeFee,
            serviceQty: values?.serviceQty,
            LMBY: Global?.user?.userID
        }

        dispatch(actions.transportArrangementAddFinalCostTransport(payload))
            .then(resp => {
                if (resp) {
                    dispatch(
                        actions.getListFinalConfirmCostTransportDelivery(data.transportArrangmentId)
                    )
                    setOpen(false)
                }
            })

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
            size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
        >
            <CModalHeader>
                <CModalTitle>ADD COST</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateCost}>
                    {
                        data.costGroup === 'no' ?
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Order Request No <code>*</code></CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={orderReqList}
                                        isSearchable={true}
                                        value={selectedOrderReq}
                                        onChange={handleOnChangeOrderReq}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            : ''
                    }
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Service / Add Cost<code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={serviceChargeList}
                                isSearchable={true}
                                value={selectedServiceCharge}
                                onChange={handleOnChangeServiceCharge}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Price <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="chargeFee"
                                value={values?.chargeFee}
                                onChange={handleOnchange}
                                readOnly={selectedServiceCharge?.extra?.hasFixedPrice === 'yes' ? true : false}
                                disabled={selectedServiceCharge?.extra?.hasFixedPrice === 'yes' ? true : false}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">QTY <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="serviceQty"
                                value={values?.serviceQty}
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

export default ModalCreateCost;
