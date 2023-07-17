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
    CFormTextarea,
    CForm
} from '@coreui/react'
import * as actions from '../../../config/redux/Dashboard/actions'
import Select from 'react-select'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

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
    const [packageType, setPackageType] = useState([])
    const [selectedPackageType, setSelectedPackageType] = useState({})

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

            dispatch(actions.getSelectPackageType()).then(e => {
                setPackageType(e)
            })
        }
    }, [Global?.user, open]);

    useEffect(() => {
        setValues({})
    }, [open])

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

    const handleOnChangePackageType = (selectedPackageType) => {
        setSelectedPackageType(selectedPackageType)
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
            dispatch(
                actions.getSelectOriginPoin(
                    projectId,
                    selectedRouteType.value,
                    detailProject.whCode))
                .then(e => {
                    setOriginPoint(e)
                    setSelectedOriginPoint(e[0])
                    setValues((prev) => ({
                        ...prev,
                        originAddress: e[0].address
                    }))
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

    const handleCreate = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            projectId: projectId,
            whId: detailProject.whId,
            packageId: selectedPackageType?.value,
            whCode: detailProject.whCode,
            custOrderRequest: values?.custOrderRequest,
            requestorName: values?.requestorName,
            orderRequestDesc: values?.orderRequestDesc,
            deliveryReqType: selectedDeliveryType?.label,
            transportReqType: selectedTransportType?.label,
            routeTypeId: selectedRouteType.value,
            originPointId: selectedOriginPoint.value,
            destinationSubDistrictId: selectedSubDistrict?.value,
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
            size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
        >
            <CForm onSubmit={handleCreate}>
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
                                        required
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
                                        required
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
                                        required
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
                                        required
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
                                        readOnly
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
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Transport Request Type <code>(*)</code></CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={transportType}
                                        isSearchable={true}
                                        value={selectedTransportType}
                                        onChange={handleOnChangetransportType}
                                        required
                                    />
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Destination Province <code>(*)</code></CFormLabel>
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
                                <CFormLabel className="col-form-label">Destination Sub District <code>(*)</code></CFormLabel>
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
                                <CFormLabel className="col-form-label">Destination Address <code>(*)</code></CFormLabel>
                                <CCol>
                                    <CFormTextarea
                                        rows={5}
                                        name="destinationAddress"
                                        value={values?.destinationAddress}
                                        onChange={handleOnchange}
                                        required
                                    >
                                    </CFormTextarea>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Site ID</CFormLabel>
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
                                <CFormLabel className="col-form-label">Sitename</CFormLabel>
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
                                <CFormLabel className="col-form-label">Package Type</CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={packageType}
                                        isSearchable={true}
                                        value={selectedPackageType}
                                        onChange={handleOnChangePackageType}
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
                                        required
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
                                        required
                                    />
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CCol className="d-grid gap-2">
                            <ButtonSubmit type="submit" />
                        </CCol>
                    </CRow>
                </CModalBody>
            </CForm>
        </CModal >
    )
}

export default ModalCreateOrderRequest;
