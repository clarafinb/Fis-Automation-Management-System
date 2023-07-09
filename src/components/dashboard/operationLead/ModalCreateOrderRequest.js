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
    CFormTextarea
} from '@coreui/react'
import * as actions from '../../../config/redux/Dashboard/actions'
import Select from 'react-select'

function ModalCreateOrderRequest({ open, setOpen, projectId, detailProject }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [deliveryProcess, setDeliveryProcess] = useState([])
    const [deliveryType, setDeliveryType] = useState([])
    const [routeType, setRouteType] = useState([])
    const [originPoint, setOriginPoint] = useState([])
    const [transportType, setTransportType] = useState([])
    const [selectedDeliveryProcess, setSelectedDeliveryProcess] = useState({});
    const [selectedDeliveryType, setSelectedDeliveryType] = useState({});
    const [selectedRouteType, setSelectedRouteType] = useState({});
    const [selectedTransportType, setSelectedTransportType] = useState({});
    const [selectedOriginPoint, setSelectedOriginPoint] = useState({});
    const [province, setProvince] = useState([])
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [subDistrict, setSubDistrict] = useState([]);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState(null);

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

    const handleOnChangeDeliveryProcess = (selectedDeliveryProcess) => {
        setSelectedDeliveryProcess(selectedDeliveryProcess);
        dispatch(actions.getSelecRouteType(selectedDeliveryProcess.value)).then(e => {
            setRouteType(e)
        })
    }

    const handleOnChangeRouteType = (selectedRouteType) => {
        setSelectedRouteType(selectedRouteType)

        if (projectId && selectedRouteType.value && detailProject.whCode) {
            dispatch(actions.getSelectOriginPoin(projectId, selectedRouteType.value, detailProject.whCode)).then(e => {
                setOriginPoint(e)
            })
        }
    }

    const handleOnChangeDeliveryType = (selectedDeliveryType) => {
        setSelectedDeliveryType(selectedDeliveryType);
    }

    const handleOnChangetransportType = (selectedTransportType) => {
        setSelectedTransportType(selectedTransportType);
    }

    const handleOnChangeOriginPoint = (selectedOriginPoint) => {
        setSelectedOriginPoint(selectedOriginPoint)
        setValues((prev) => ({
            ...prev,
            originAddress: selectedOriginPoint.address
        }))

    }

    useEffect(() => {
        if (Global?.user?.token && open) {
            dispatch(actions.getSelectDeliveryProcess()).then(e => {
                setDeliveryProcess(e)
            })

            dispatch(actions.getSelectDeliveryType()).then(e => {
                setDeliveryType(e)
            })

            dispatch(actions.getSelecTransportType()).then(e => {
                setTransportType(e)
            })

            dispatch(actions.getSelectWarehouseProvince()).then(e => {
                setProvince(e)
            })
        }
    }, [Global?.user, open]);

    useEffect(() => {
        setValues({})
    }, [open])


    const handleCreate = () => {
        let payload = {
            projectId: projectId,
            whId: detailProject.whId,
            whCode: detailProject.whCode,
            custOrderRequest: values?.custOrderRequest,
            requestorName: values?.requestorName,
            orderRequestDesc: values?.orderRequestDesc,
            deliveryReqType: selectedDeliveryType?.label,
            transportReqType: selectedTransportType?.label,
            routeTypeId: selectedRouteType.value,
            originPointId: selectedOriginPoint.value,
            destinationSubDistrictId: selectedSubDistrict.value,
            destinationAddress: values?.destinationAddress,
            siteId: values?.siteId,
            siteName: values?.siteName,
            recipientName: values?.recipientName,
            recipientCompanyName: values?.recipientCompanyName,
            LMBY: Global?.user?.userID
        }

        let methode = "POST"
        dispatch(actions.createOrderRequest(payload, methode))
        setValues({})
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

    const handleClose = () => {
        setValues({})
        setOpen(false)
    }

    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
        >
            <CModalHeader>
                <CModalTitle>Order Request Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Cust Order Req No <code>(*)</code></CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="custOrderRequest"
                                    value={values?.custOrderRequest}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Order Req Description</CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="orderRequestDesc"
                                    value={values?.orderRequestDesc}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Delivery Process Type <code>(*)</code></CFormLabel>
                            <CCol>
                                <Select
                                    className="input-select"
                                    options={deliveryProcess}
                                    isSearchable={true}
                                    value={selectedDeliveryProcess}
                                    onChange={handleOnChangeDeliveryProcess}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Route Type <code>(*)</code></CFormLabel>
                            <CCol>
                                <Select
                                    className="input-select"
                                    options={routeType}
                                    isSearchable={true}
                                    value={selectedRouteType}
                                    onChange={handleOnChangeRouteType}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Requestor Name <code>(*)</code></CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="requestorName"
                                    value={values?.requestorName}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Delivery Request Type</CFormLabel>
                            <CCol>
                                <Select
                                    className="input-select"
                                    options={deliveryType}
                                    isSearchable={true}
                                    value={selectedDeliveryType}
                                    onChange={handleOnChangeDeliveryType}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Origin</CFormLabel>
                            <CCol>
                                <Select
                                    className="input-select"
                                    options={originPoint}
                                    isSearchable={true}
                                    value={selectedOriginPoint}
                                    onChange={handleOnChangeOriginPoint}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Origin Address</CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="originAddress"
                                    value={values?.originAddress}
                                    onChange={handleOnchange}
                                    readOnly
                                    disabled
                                />
                            </CCol>
                        </CRow>
                    </CCol>
                    <CCol>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Transport Request Type</CFormLabel>
                            <CCol>
                                <Select
                                    className="input-select"
                                    options={transportType}
                                    isSearchable={true}
                                    value={selectedTransportType}
                                    onChange={handleOnChangetransportType}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Destination Province <code>(*)</code></CFormLabel>
                            <CCol>
                                <Select
                                    className="input-select"
                                    options={province}
                                    isSearchable={true}
                                    value={selectedProvince}
                                    onChange={handleOnChangeProvince}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Destination Sub District <code>(*)</code></CFormLabel>
                            <CCol>
                                <Select
                                    className="input-select"
                                    options={subDistrict}
                                    isSearchable={true}
                                    value={selectedSubDistrict}
                                    onChange={handleOnChangeSubDistrict}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Destination Address</CFormLabel>
                            <CCol>
                                <CFormTextarea
                                    rows={5}
                                    name="destinationAddress"
                                    value={values?.destinationAddress}
                                    onChange={handleOnchange}
                                >
                                </CFormTextarea>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Site ID<code>(*)</code></CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="siteId"
                                    value={values?.siteId}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Sitename<code>(*)</code></CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="siteName"
                                    value={values?.siteName}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Recipient Name <code>(*)</code></CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="recipientName"
                                    value={values?.recipientName}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-form-label">Recipient Company Name <code>(*)</code></CFormLabel>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    name="recipientCompanyName"
                                    value={values?.recipientCompanyName}
                                    onChange={handleOnchange}
                                />
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CRow className="mb-3">
                    <CCol>
                        <CButton
                            className="colorBtn-cancel"
                            onClick={handleClose}>
                            CANCEL
                        </CButton>
                        <CButton
                            className="colorBtn-yellow ms-3"
                            onClick={handleCreate}>
                            SAVE
                        </CButton>
                    </CCol>
                </CRow>
            </CModalFooter>
        </CModal >
    )
}

export default ModalCreateOrderRequest;
