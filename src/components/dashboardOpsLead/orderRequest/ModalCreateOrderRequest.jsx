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
    CFormTextarea,
    CForm
} from '@coreui/react'
import * as actions_dashboard from '../../../config/redux/Dashboard/actions'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import Select from 'react-select'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import Alert from 'src/components/custom/toast/Alert'

function ModalCreateOrderRequest({ open, setOpen, projectId, detailProject, getSummaryProject }) {
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
    const [selectedProvince, setSelectedProvince] = useState({});
    const [selectedProvinceOrigin, setSelectedProvinceOrigin] = useState({});
    const [subDistrict, setSubDistrict] = useState([]);
    const [subDistrictOrigin, setSubDistrictOrigin] = useState([]);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState({});
    const [selectedSubDistrictOrigin, setSelectedSubDistrictOrigin] = useState({});
    const [packageType, setPackageType] = useState([])
    const [selectedPackageType, setSelectedPackageType] = useState({});
    const [destinationMandatory, setDestinationMandatory] = useState(false)
    const [originMandatory, setOriginMandatory] = useState(false)
    const [destination, setDestination] = useState([])
    const [selectedDestination, setSelectedDestination] = useState({})
    const [selectedOrigin, setSelectedOrigin] = useState({})
    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)

    useEffect(() => {
        if (Global?.user?.token && open) {
            dispatch(actions.getSelectDeliveryProcess()).then(e => {
                setDeliveryProcess(e)
            })

            dispatch(actions.getSelecTransportType()).then(e => {
                setTransportType(e)
            })

            dispatch(actions_dashboard.getSelectWarehouseProvince()).then(e => {
                setProvince(e)
            })

            dispatch(actions.getSelectPackageType()).then(e => {
                setPackageType(e)
            })
        }
    }, [Global?.user, open]);

    useEffect(() => {
        if (open) {
            setVisible(false)
            setErrMessage(null)
            setValues({})
            setSelectedDeliveryProcess({})
            setRouteType([])
            setSelectedRouteType({})
            setSelectedDestination({})
            setDestinationMandatory(false)
            setOriginMandatory(false)
            setSelectedProvince({})
            setSelectedSubDistrict({})
            setSelectedPackageType({})
            setSelectedOriginPoint({})
            setOriginPoint([])
            setSelectedTransportType({})
            setSelectedDeliveryType({})
        }
    }, [open])

    const handleOnChangeProvince = (selectedProvince) => {
        setSelectedProvince(selectedProvince);
        setSelectedSubDistrict({})
        if (selectedProvince.value) {
            dispatch(actions_dashboard.getSelectSubDistrictBaseOnProvince(selectedProvince.value))
                .then(e => {
                    setSubDistrict(e)
                })
        }
    }

    const handleOnChangeProvinceOrigin = (selectedProvinceOrigin) => {
        setSelectedProvinceOrigin(selectedProvinceOrigin);
        setSelectedSubDistrictOrigin({})
        if (selectedProvinceOrigin.value) {
            dispatch(actions_dashboard.getSelectSubDistrictBaseOnProvince(selectedProvinceOrigin.value))
                .then(e => {
                    setSubDistrictOrigin(e)
                })
        }
    }

    const handleOnChangeSubDistrict = (selectedSubDistrict) => {
        setSelectedSubDistrict(selectedSubDistrict);
    }

    const handleOnChangeSubDistrictOrigin = (selectedSubDistrictOrigin) => {
        setSelectedSubDistrictOrigin(selectedSubDistrictOrigin);
    }

    const handleOnChangePackageType = (selectedPackageType) => {
        setSelectedPackageType(selectedPackageType)
    }

    const handleOnChangeDeliveryProcess = (selectedDeliveryProcess) => {
        setSelectedDeliveryProcess(selectedDeliveryProcess);

        setRouteType([])
        setSelectedRouteType({})

        setOriginPoint([])
        setSelectedOriginPoint({})

        setDestination([])
        setSelectedDestination({})

        setDeliveryType([])
        setSelectedDeliveryType({})

        setDestinationMandatory(false)
        setOriginMandatory(false)

        setValues((prev) => ({
            ...prev,
            originAddress: '',
            destinationAddress: ''
        }))

        dispatch(actions.getSelecRouteType(selectedDeliveryProcess.value)).then(e => {
            setRouteType(e)
        })
    }

    const handleOnChangeRouteType = (selectedRouteType) => {
        setSelectedRouteType(selectedRouteType)

        const { routeTypeId, destinationTypeCode, originTypeCode } = selectedRouteType
        const { whCode } = detailProject

        dispatch(actions.getSelectDeliveryType(routeTypeId)).then(e => {
            setDeliveryType(e)
        })

        if (destinationTypeCode === 'PP' && projectId && routeTypeId && whCode) {
            setDestinationMandatory(false)
            setSelectedDestination({})
        } else {
            setSelectedProvince({})
            setSelectedSubDistrict({})
            setDestinationMandatory(true)
            dispatch(
                actions.getDestinationKeyWHProject({
                    projectId,
                    routeTypeId,
                    whCode
                })
            ).then(resp => {
                setDestination(resp)
            })
        }

        if (originTypeCode === 'PP' && projectId && routeTypeId && whCode) {
            setOriginMandatory(false)
            setSelectedOrigin({})

        } else {
            setSelectedProvinceOrigin({})
            setSelectedSubDistrictOrigin({})
            setOriginMandatory(true)
            dispatch(
                actions.getSelectOriginPoin(
                    projectId,
                    routeTypeId,
                    whCode
                ))
                .then(e => {
                    setOriginPoint(e)
                    setSelectedOriginPoint(e[0])
                    setValues((prev) => ({
                        ...prev,
                        originAddress: e[0]?.address
                    }))
                })
        }
    }

    const handleOnChangeDestination = (selectedDestination) => {
        setValues((prev) => ({
            ...prev,
            destinationAddress: selectedDestination?.address
        }))
        setSelectedDestination(selectedDestination)
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
            routeTypeId: selectedRouteType?.value,
            originPointId: 0,
            originSubDistrictId: 0,
            originAddress: values?.originAddress,
            destinationPointId: 0,
            destinationSubDistrictId: 0,
            destinationAddress: values?.destinationAddress,
            siteId: values?.siteId,
            siteName: values?.siteName,
            recipientName: values?.recipientName,
            recipientCompanyName: values?.recipientCompanyName,
            LMBY: Global?.user?.userID
        }

        const err = []
        if (destinationMandatory) {
            payload.destinationPointId = selectedDestination?.value
            if (payload.destinationPointId === undefined) err.push('Destination')

        } else {
            payload.destinationSubDistrictId = selectedSubDistrict?.value
            if (payload.destinationSubDistrictId === undefined) err.push('Destination Sub Disctict')
        }

        if (originMandatory) {
            payload.originPointId = selectedOriginPoint?.value
            if (payload.originPointId === undefined) err.push('Origin')
        } else {
            payload.originSubDistrictId = selectedSubDistrictOrigin?.value
            if (payload.originSubDistrictId === undefined) err.push('Origin Sub Disctict')
        }

        if (payload.routeTypeId === undefined) err.push('Route Type')
        if (payload.transportReqType === undefined) err.push('Transport Request Type')

        if (err.length > 0) {
            setErrMessage(err.join(' , '))
            setVisible(true)
        } else {
            dispatch(actions.createOrderRequest(payload, "POST"))
                .then(resp => {
                    if (resp === "success") {
                        getSummaryProject(projectId)
                        setOpen(false)
                    }
                })
        }

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
            <CForm onSubmit={handleCreate}>
                <CModalHeader>
                    <CModalTitle>ADD ORDER REQUEST</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Cust Order Req No <code>*</code></CFormLabel>
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
                                <CFormLabel className="col-form-label">Delivery Process Type <code>*</code></CFormLabel>
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
                                <CFormLabel className="col-form-label">Route Type <code>*</code></CFormLabel>
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
                                <CFormLabel className="col-form-label">Requestor Name <code>*</code></CFormLabel>
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
                                <CFormLabel className="col-form-label">Origin {destinationMandatory ? <code>*</code> : ''}</CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={originPoint}
                                        isSearchable={true}
                                        value={selectedOriginPoint}
                                        onChange={handleOnChangeOriginPoint}
                                        isDisabled={!originMandatory}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Origin Province {!destinationMandatory ? <code>*</code> : ''}</CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={province}
                                        isSearchable={true}
                                        value={selectedProvinceOrigin}
                                        onChange={handleOnChangeProvinceOrigin}
                                        isDisabled={originMandatory}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Origin Sub District {!destinationMandatory ? <code>*</code> : ''}</CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={subDistrictOrigin}
                                        isSearchable={true}
                                        value={selectedSubDistrictOrigin}
                                        onChange={handleOnChangeSubDistrictOrigin}
                                        isDisabled={originMandatory}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Origin Address {!destinationMandatory ? <code>*</code> : ''}</CFormLabel>
                                <CCol>
                                    <CFormTextarea
                                        rows={5}
                                        name="originAddress"
                                        value={values?.originAddress}
                                        onChange={handleOnchange}
                                        disabled={originMandatory}
                                        required
                                    >
                                    </CFormTextarea>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Transport Request Type <code>*</code></CFormLabel>
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
                                <CFormLabel className="col-form-label">Recipient Name <code>*</code></CFormLabel>
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
                                <CFormLabel className="col-form-label">Recipient Company Name <code>*</code></CFormLabel>
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
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Destination {destinationMandatory ? <code>*</code> : ''} </CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={destination}
                                        isSearchable={true}
                                        value={selectedDestination}
                                        onChange={handleOnChangeDestination}
                                        isDisabled={!destinationMandatory}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Destination Province {!destinationMandatory ? <code>*</code> : ''}</CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={province}
                                        isSearchable={true}
                                        value={selectedProvince}
                                        onChange={handleOnChangeProvince}
                                        isDisabled={destinationMandatory}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Destination Sub District {!destinationMandatory ? <code>*</code> : ''}</CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={subDistrict}
                                        isSearchable={true}
                                        value={selectedSubDistrict}
                                        onChange={handleOnChangeSubDistrict}
                                        isDisabled={destinationMandatory}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Destination Address <code>*</code></CFormLabel>
                                <CCol>
                                    <CFormTextarea
                                        rows={5}
                                        name="destinationAddress"
                                        value={values?.destinationAddress}
                                        onChange={handleOnchange}
                                        disabled={destinationMandatory}
                                        required
                                    >
                                    </CFormTextarea>
                                </CCol>
                            </CRow>
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
                </CModalBody>
            </CForm>
        </CModal >
    )
}

export default ModalCreateOrderRequest;
