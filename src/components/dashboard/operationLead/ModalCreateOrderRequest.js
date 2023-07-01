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
    CFormTextarea
} from '@coreui/react'
import * as actions from '../../../config/redux/Dashboard/actions'
import Select from 'react-select'
// import GeocodingForm from '../custom/map/OpenStreetMap'

function ModalCreateOrderRequest({ open, setOpen, projectId, detailProject }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    // const [warehouseType, setWarehouseType] = useState([])
    const [deliveryProcess, setDeliveryProcess] = useState([])
    const [deliveryType, setDeliveryType] = useState([])
    const [routeType, setRouteType] = useState([])
    const [originPoint, setOriginPoint] = useState([])
    const [destination, setDestination] = useState([])
    const [transportType, setTransportType] = useState([])
    const [selectedDeliveryProcess, setSelectedDeliveryProcess] = useState({});
    const [selectedDeliveryType, setSelectedDeliveryType] = useState({});
    const [selectedRouteType, setSelectedRouteType] = useState({});
    const [selectedTransportType, setSelectedTransportType] = useState({});
    const [selectedOriginPoint, setSelectedOriginPoint] = useState({});
    const [selectedDestination, setSelectedDestination] = useState({});
    // const [mapKey, setMapKey] = useState(Date.now())
    const [data, setData] = useState({})

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
            dispatch(actions.getSelectDestination(projectId, selectedRouteType.value, detailProject.whCode)).then(e => {
                setDestination(e)
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

    const handleOnChangeDestination = (selectedDestination) => {
        setSelectedDestination(selectedDestination)
        setValues((prev) => ({
            ...prev,
            destinationAddress: selectedDestination.address
        }))
    }

    useEffect(() => {
        if (Global?.user?.token && projectId) {
            dispatch(actions.getSelectDeliveryProcess()).then(e => {
                setDeliveryProcess(e)
            })

            dispatch(actions.getSelectDeliveryType()).then(e => {
                setDeliveryType(e)
            })

            dispatch(actions.getSelecTransportType()).then(e => {
                setTransportType(e)
            })

            setData({})
        }
    }, [Global?.user, projectId]);


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
            destinationPointId: selectedDestination.value,
            recipientName: values?.recipientName,
            recipientCompanyName: values?.recipientCompanyName,
            LMBY: Global?.user?.userID
        }

        let methode = "POST"
        dispatch(actions.createOrderRequest(payload, methode))
        setData({})
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

    const handleSetLongLat = (long, lat) => {
        setValues((prev) => ({
            ...prev,
            latitude: lat,
            longitude: long
        }));
    }

    const handleClose = () => {
        setData({})
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
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Cust Order Req No <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="custOrderRequest"
                            value={values?.custOrderRequest}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Order Req Description</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="orderRequestDesc"
                            value={values?.orderRequestDesc}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Delivery Process Type <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
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
                    <CFormLabel className="col-sm-2 col-form-label">Route Type <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
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
                    <CFormLabel className="col-sm-2 col-form-label">Requestor Name <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="requestorName"
                            value={values?.requestorName}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Delivery Request Type</CFormLabel>
                    <CCol sm={10}>
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
                    <CFormLabel className="col-sm-2 col-form-label">Transport Request Type</CFormLabel>
                    <CCol sm={10}>
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
                    <CFormLabel className="col-sm-2 col-form-label">Origin</CFormLabel>
                    <CCol sm={10}>
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
                    <CFormLabel className="col-sm-2 col-form-label"></CFormLabel>
                    <CCol sm={10}>
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
                    <CFormLabel className="col-sm-2 col-form-label">Destination</CFormLabel>
                    <CCol sm={10}>
                        <Select
                            className="input-select"
                            options={destination}
                            isSearchable={true}
                            value={selectedDestination}
                            onChange={handleOnChangeDestination}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label"></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="destinationAddress"
                            value={values?.destinationAddress}
                            onChange={handleOnchange}
                            readOnly
                            disabled
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Recipient Name <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="recipientName"
                            value={values?.recipientName}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Recipient Company Name <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="text"
                            name="recipientCompanyName"
                            value={values?.recipientCompanyName}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={handleClose} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreate}>Add</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateOrderRequest;
