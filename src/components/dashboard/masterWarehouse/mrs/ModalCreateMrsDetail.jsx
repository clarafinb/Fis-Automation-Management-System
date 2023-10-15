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
import Alert from 'src/components/custom/toast/Alert'

function ModalCreateMrsDetail({ open, setOpen, mrsId }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})

    const [transportTypeAll, setTransportTypeAll] = useState([])
    const [selectedTransportTypeAll, setSelectedTransportTypeAll] = useState({});

    const [province, setProvince] = useState([])
    const [selectedProvince, setSelectedProvince] = useState({});

    const [subDistrict, setSubDistrict] = useState([]);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState({});

    const [destinationProvince, setDestinationProvince] = useState([])
    const [selectedDestinationProvince, setSelectedDestinationProvince] = useState({});

    const [destinationSubDistrict, setDestinationSubDistrict] = useState([]);
    const [selectedDestinationSubDistrict, setSelectedDestinationSubDistrict] = useState({});

    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)

    useEffect(() => {
        if (Global?.user?.token && open) {
            resetForm()
            initApi()
        }
    }, [Global?.user, open]);

    const resetForm = () => {
        setSelectedTransportTypeAll({})
        setSelectedProvince({})
        setSelectedSubDistrict({})
        setSelectedDestinationProvince({})
        setSelectedDestinationSubDistrict({})
        setValues({})
        setErrMessage(null)
        setVisible(false)
    }

    const initApi = () => {

        dispatch(actions.getSelecTransportTypeAll()).then(e => {
            setTransportTypeAll(e)
        })

        dispatch(actions.getSelectWarehouseProvince()).then(e => {
            setProvince(e)
        })

        dispatch(actions.getSelectWarehouseProvince()).then(e => {
            setDestinationProvince(e)
        })
    }

    const handleCreateMrsDetail = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            mrsId: mrsId,
            transportTypeId: selectedTransportTypeAll?.value,
            originSubDistrictId: selectedSubDistrict?.value,
            destinationSubDistrictId: selectedDestinationSubDistrict?.value,
            chargeRate: values?.chargeRate,
            LMBY: Global?.user?.userID
        }


        const err = []
        if (payload.transportTypeId === undefined) err.push('Transport Type')
        if (payload.originSubDistrictId === undefined) err.push('Origin Sub District')
        if (payload.destinationSubDistrictId === undefined) err.push('Destination Sub District')

        if (err.length > 0) {
            setErrMessage(err.join(' , '))
            setVisible(true)
        } else {
            dispatch(actions.createMrsDetail(payload))
                .then(resp => {
                    if (resp === "success") {
                        dispatch(actions.getListMrsDetail(mrsId))
                        setOpen(false)
                    }
                })
        }
    }

    const handleOnchange = useCallback(
        (e) => {
            let { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleOnChangetransportTypeAll = (selectedTransportTypeAll) => {
        setSelectedTransportTypeAll(selectedTransportTypeAll);
    }

    const handleOnChangeProvince = (selectedProvince) => {
        setSelectedProvince(selectedProvince);
        if (selectedProvince.value) {
            dispatch(actions.getSelectSubDistrictBaseOnProvince(selectedProvince.value))
                .then(e => {
                    setSubDistrict(e)
                })
        }
    }

    const handleOnChangeSubDistrict = (selectedSubDistrict) => {
        setSelectedSubDistrict(selectedSubDistrict);
    }

    const handleOnChangeDestinationProvince = (selectedDestinationProvince) => {
        setSelectedDestinationProvince(selectedDestinationProvince);
        if (selectedDestinationProvince.value) {
            dispatch(actions.getSelectSubDistrictBaseOnProvince(selectedDestinationProvince.value))
                .then(e => {
                    setDestinationSubDistrict(e)
                })
        }
    }

    const handleOnChangeDestinationSubDistrict = (selectedDestinationSubDistrict) => {
        setSelectedDestinationSubDistrict(selectedDestinationSubDistrict);
    }


    return (
        <CModal
            size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
        >
            <CModalHeader>
                <CModalTitle>ADD NEW MRS DETAIL</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateMrsDetail}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Transport Type <code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={transportTypeAll}
                                isSearchable={true}
                                value={selectedTransportTypeAll}
                                onChange={handleOnChangetransportTypeAll}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Origin Province <code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={province}
                                isSearchable={true}
                                value={selectedProvince}
                                onChange={handleOnChangeProvince}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Origin Sub District <code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={subDistrict}
                                isSearchable={true}
                                value={selectedSubDistrict}
                                onChange={handleOnChangeSubDistrict}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Destination Province <code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={destinationProvince}
                                isSearchable={true}
                                value={selectedDestinationProvince}
                                onChange={handleOnChangeDestinationProvince}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Destination Sub District <code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={destinationSubDistrict}
                                isSearchable={true}
                                value={selectedDestinationSubDistrict}
                                onChange={handleOnChangeDestinationSubDistrict}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Charge Fee <code>*</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="chargeRate"
                                value={values?.chargeRate}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <Alert
                                message={errMessage}
                                visible={visible}
                                setVisible={setVisible}
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

export default ModalCreateMrsDetail;
