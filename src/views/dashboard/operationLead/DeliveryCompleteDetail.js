import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CInputGroup,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane
} from '@coreui/react'

import * as actions from '../../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilFile, cilPlus } from '@coreui/icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faPlay, faPlus, faRefresh, faSearch, faUpload } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/moment'
import Select from 'react-select'
import Swal from 'sweetalert2'
import ModalOpenMap from 'src/components/dashboard/ModalOpenMap'
import { Route, Link, Routes, useNavigate } from 'react-router-dom';


function DeliveryCompleteDetail() {
    const nav = useNavigate();
    const { dispatch, Global, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [orderReqId, setOrderReqId] = useState()
    const [custOrderRequest, setCustOrderRequest] = useState(null)
    const [itemOrderRequest, setItemOrderRequest] = useState([])
    const [itemOrderRequestData, setItemOrderRequestData] = useState([])
    const [transportMode, setTrasportMode] = useState([])
    const [deliveryRequest, setDeliveryRequest] = useState([])
    const [selectedTransportMode, setSelectedTransportMode] = useState({});
    const [selectedDeliveryRequest, setSelectedDeliveryRequest] = useState({});
    const [templateName, setTemplateName] = useState("")
    const [openModalUpload, setOpenModalUpload] = useState(false)
    const [openModalAdditionalService, setOpenModalAdditionalService] = useState(false)
    const [fileUpload, setFileUpload] = useState(null);
    const [templateUrl, setTemplateUrl] = useState("")
    const [serviceChargeData, setServiceChargeData] = useState([])
    const [serviceChargeHeader, setServiceChargeHeader] = useState([])
    const [values, setValues] = useState({})
    const [transportArragmentData, setTransportArragmentData] = useState({})
    const [modalMap, setModalMap] = useState(false)
    const [mapKey, setMapKey] = useState(Date.now())
    const [activeKey, setActiveKey] = useState(1)

    useEffect(() => {
        const splitUri = window.location.href.split("/");
        const orderRequestId = splitUri[8]
        setProjectId(splitUri[6])
        setOrderReqId(orderRequestId)

        if (Global?.user?.userID) {
            dispatch(
                actions.getOrderRequestDetail(orderRequestId)
            ).then(result => {
                setOrderReqDetail(result[0])
            })

            dispatch(
                actions.getSelectActiveTransport()
            ).then(result => {
                setTrasportMode(result)
            })

            dispatch(
                actions.getTransportArragementLocation(orderRequestId)
            ).then(resp => {
                if (resp.length > 0) {
                    setTransportArragmentData({
                        ...resp[0],
                        detail: {
                            latitude: resp[0]?.latitude,
                            longitude: resp[0]?.longitude,
                        }
                    })
                }
            })
        }
    }, [Global?.user?.userID]);

    const handleOnChangeTransportMode = (selectedTransportMode) => {
        setSelectedTransportMode(selectedTransportMode);
        dispatch(actions.getDeliveryRequestFinal(selectedTransportMode.value, orderReqId))
            .then(resp => {
                setDeliveryRequest(resp)
            })
    }

    const handleOnChangeDeliveryRequest = (selectedDeliveryRequest) => {
        setSelectedDeliveryRequest(selectedDeliveryRequest);
    }

    const handleCloseModalUpload = () => {
        setOpenModalUpload(false)
        setFileUpload(null)
    }

    const handleConfirm = () => {
        const payload = {
            orderReqId: orderReqId,
            deliveryModeId: selectedDeliveryRequest.value,
            transportModeId: selectedTransportMode.value,
            LMBY: Global?.user?.userID
        }

        for (const key in payload) {
            if (Object.hasOwnProperty.call(payload, key)) {
                const element = payload[key];
                if (element == "" || element == undefined) {
                    return Swal.fire({
                        title: 'Error!',
                        text: 'Field Empty !',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }
        }
        dispatch(actions.pickandPackComplete(payload))
    }


    const handleComponent = useCallback(
        (action, orderReqId) => {
            // setOrderReqId(orderReqId)
            if (action === 'start') {
            } else if (action === 'reset') {
                dispatch(actions.resetPickAndPackprogress(orderReqId, projectId, detailProject.whId, Global.user.userID))
            } else {
                setOpenModalUpload(true)
                dispatch(
                    actions.getMassUploadTemplateOrderReqItemBulkUpload()
                ).then(response => {
                    setTemplateName(response?.templateName)
                    setTemplateUrl(response?.templateURL)
                })
            }
        }
    )

    const handleBack = () => {
        nav(-1);
    }

    const handleOpenModal = () => {
        dispatch(
            actions.getTransportArragementLocation(orderReqId)
        ).then(resp => {
            if (resp.length > 0) {
                setTransportArragmentData({
                    ...resp[0],
                    detail: {
                        latitude: resp[0]?.latitude,
                        longitude: resp[0]?.longitude,
                    }
                })
                setMapKey(Date.now())
                setModalMap(true)
            }
        })
    }

    const handleComponentQty = useCallback(
        (projectServiceChargeId) => {
            if (values[projectServiceChargeId]) {
                let payload = {
                    orderReqId: orderReqId,
                    projectServiceChargeId: projectServiceChargeId,
                    serviceQty: values[projectServiceChargeId],
                    LMBY: Global?.user?.userID
                }

                dispatch(actions.addOrderRequestServiceCharge(payload))
            } else {
                alert("Qty is Empty !")
            }
        }
    )


    const handleClose = () => {
        setOpenModal(false)
    }

    const handleCreateAdditionalService = () => {

        dispatch(
            actions.getOrderRequestServiceChargeList(projectId, orderReqId)
        ).then(response => {
            setServiceChargeData(response)
            setValues({})
            setOpenModalAdditionalService(true)
        })

    }

    const handleDownloadTemplate = () => {
        window.open(templateUrl, '_blank')
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileUpload(file);
    };

    const handleUploadFile = (e) => {
        e.preventDefault()
        if (fileUpload) {
            const formData = new FormData(e.target);
            dispatch(actions.uploadOrderReqItemPickAndPackProgress(
                formData,
                orderReqId
            ))
            setFileUpload(null)
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'File Empty !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }


    const handleModalDetailItem = (orderReqId) => {
        dispatch(actions.getOrderRequestItemList(orderReqId))
            .then(result => {
                const remapData = [
                    {
                        name: 'no',
                        header: 'No',
                        defaultVisible: true,
                        defaultWidth: 80,
                        type: 'number'
                    }]
                result.map((row, idx) => {
                    remapData.push({
                        name: Object.keys(row)[idx],
                        header: Object.keys(row)[idx],
                        defaultFlex: 1
                    })
                })

                const dataSet = result.map((item, index) => {
                    return {
                        no: index + 1,
                        ...item
                    }
                })
                setItemOrderRequestData(dataSet)
                setItemOrderRequest(remapData)
                setOpenModal(true)
            })
    }

    const handleChangeQty = useCallback(
        (e, data) => {

            const { value } = e.target;

            setValues((prev) => ({
                ...prev,
                [data?.projectServiceChargeId]: value
            }));

        }, [setValues]
    )

    const additionalServiceColumn = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'serviceChargeCode', header: 'SVC Code', defaultFlex: 1 },
        { name: 'serviceCharge', header: 'SVC Desc', defaultFlex: 1 },
        { name: 'uom', header: 'UOM', defaultFlex: 1 },
        { name: 'serviceQty', header: 'QTY', defaultFlex: 1 },
    ]

    const additionalServiceChargeColumn = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'serviceChargeCode', header: 'SVC Code', defaultFlex: 1 },
        { name: 'serviceCharge', header: 'SVC Desc', defaultFlex: 1 },
        { name: 'uom', header: 'UOM', defaultFlex: 1 },
        {
            name: 'serviceQty',
            header: 'QTY',
            defaultFlex: 1,
            defaultWidth: 80,
            render: ({ value, cellProps }) => {
                return (
                    <>
                        <CFormInput
                            className='form-control'
                            type="text"
                            name="qty"
                            onChange={(e) => handleChangeQty(e, cellProps?.data)}
                        />
                    </>
                )
            }
        }, {
            name: 'projectServiceChargeId',
            header: 'Action',
            // defaultFlex: 1,
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value, cellProps }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className='textBlue px-2'
                            title='Order Request'
                            size='sm'
                            onClick={() =>
                                handleComponentQty(value)
                            }
                        />
                    </>
                )
            }
        },
    ]

    return (
        <>
            <CRow className='py-2'>
                <CCol sm={12}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Delivery Complete Detail
                                    </h4>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm={6}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Order Request Detail
                                    </h4>
                                </CCol>
                            </CRow>
                            <br />
                            <CRow>
                                <CCol>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Order Request Date
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="orderRequestDate"
                                                value={moment(orderReqDetail?.orderRequestDate).format('DD-MM-YYYY HH:mm:ss')}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Cust Order Req No
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="custOrderRequest"
                                                value={orderReqDetail?.custOrderRequest}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Order Req Description
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="orderRequestDesc"
                                                value={orderReqDetail?.orderRequestDesc}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Delivery Process Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="processName"
                                                value={orderReqDetail?.processName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Route Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="routeType"
                                                value={orderReqDetail?.routeType}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Requestor Name
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="requestorName"
                                                value={orderReqDetail?.requestorName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Delivery Request Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="deliveryReqType"
                                                value={orderReqDetail?.deliveryReqType}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Transport Request Type
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="transportReqType"
                                                value={orderReqDetail?.transportReqType}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Origin
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="origin"
                                                value={orderReqDetail?.origin}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="originAddress"
                                                value={orderReqDetail?.originAddress}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Destination
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="destination"
                                                value={orderReqDetail?.destination}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="destinationAddress"
                                                value={orderReqDetail?.destinationAddress}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Recipient Name
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientName"
                                                value={orderReqDetail?.recipientName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Recipient Company Name
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientCompanyName"
                                                value={orderReqDetail?.recipientCompanyName}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-sm-3 col-form-label">Pick and Pack Complete Date
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientCompanyName"
                                                value={orderReqDetail?.pickandpackCompleteDate}
                                                readOnly
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={6}>
                    <CCard>
                        <CCardBody>
                            <CRow className='mb-4'>
                                <CNav variant="tabs">
                                    <CNavItem>
                                        <CNavLink
                                            active={activeKey === 1}
                                            onClick={() => setActiveKey(1)}
                                        >
                                            Delivery Arrangement
                                        </CNavLink>
                                    </CNavItem>
                                    <CNavItem>
                                        <CNavLink
                                            active={activeKey === 2}
                                            onClick={() => setActiveKey(2)}
                                        >
                                            HO Document
                                        </CNavLink>
                                    </CNavItem>
                                </CNav>
                            </CRow>
                            <br />
                            <CTabContent>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                    <CRow>
                                        <CCol>
                                            <CRow className="mb-4">
                                                <CFormLabel
                                                    className="col-sm-3 col-form-label">Final Delivery Mode
                                                </CFormLabel>
                                                <CCol>
                                                    <CFormInput
                                                        type="text"
                                                        name="deliveryMode"
                                                        value={orderReqDetail?.deliveryMode}
                                                        readOnly
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-4">
                                                <CFormLabel
                                                    className="col-sm-3 col-form-label">Final Transport Mode
                                                </CFormLabel>
                                                <CCol>
                                                    <CFormInput
                                                        type="text"
                                                        name="transportMode"
                                                        value={orderReqDetail?.transportMode}
                                                        readOnly
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-4">
                                                <CFormLabel
                                                    className="col-sm-3 col-form-label">Pickup Date
                                                </CFormLabel>
                                                <CCol>
                                                    <CFormInput
                                                        type="text"
                                                        name="pickupDate"
                                                        value={orderReqDetail?.pickupDate}
                                                        readOnly
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-4">
                                                <CFormLabel
                                                    className="col-sm-3 col-form-label">Pickup By
                                                </CFormLabel>
                                                <CCol>
                                                    <CFormInput
                                                        type="text"
                                                        name="pickupBy"
                                                        value={orderReqDetail?.pickupBy}
                                                        readOnly
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-4">
                                                <CFormLabel
                                                    className="col-sm-3 col-form-label">Delivery Complete Date
                                                </CFormLabel>
                                                <CCol>
                                                    <CFormInput
                                                        type="text"
                                                        name="deliveryCompleteDate"
                                                        value={orderReqDetail?.deliveryCompleteDate}
                                                        readOnly
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                </CTabPane>
                            </CTabContent>
                            <CTabContent>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>

                                </CTabPane>
                            </CTabContent>
                            <br />
                            < CRow >
                                <CCol className="d-none d-md-block text-end py-3">
                                    <CButton
                                        type="button"
                                        onClick={handleBack}
                                        className='colorBtn-white px-1'
                                        color="success"
                                        title='Back'
                                    >Close</CButton>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol >
            </CRow >
            <CModal
                size="lg"
                visible={openModal}
                onClose={() => setOpenModal(false)}
                alignment='center'
            >
                <CModalHeader>
                    <CModalTitle>Item List {custOrderRequest}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <SmartTable
                                data={itemOrderRequestData}
                                columns={itemOrderRequest}
                                minHeight={200}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={handleClose} color="secondary">Close</CButton>
                </CModalFooter>
            </CModal>
            <CModal
                size="lg"
                visible={openModalUpload}
                onClose={() => setOpenModalUpload(false)}
                alignment='center'
            >
                <CModalHeader>
                    <CModalTitle>Item List Upload {custOrderRequest}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        <CCol sm={6}>
                            <CForm onSubmit={handleUploadFile} encType="multipart/form-data">
                                <CInputGroup className="mb-3">
                                    <CFormInput
                                        type="file"
                                        name="fileUpload"
                                        onChange={(e) => handleFileChange(e)}
                                    />
                                    <CButton
                                        type="submit"
                                        color="success"
                                        title='upload file'
                                    >
                                        <FontAwesomeIcon icon={faUpload} />
                                    </CButton>
                                </CInputGroup>
                            </CForm>
                        </CCol>
                        <CCol>
                            <CButton
                                onClick={handleDownloadTemplate}
                                color="info">
                                Download {templateName}
                            </CButton>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={handleCloseModalUpload} color="secondary">Close</CButton>
                </CModalFooter>
            </CModal>
            <CModal
                size="lg"
                visible={openModalAdditionalService}
                onClose={() => setOpenModalAdditionalService(false)}
                alignment='center'
            >
                <CModalHeader>
                    <CModalTitle>Additonal Service Charge {custOrderRequest}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <SmartTable
                                data={serviceChargeData}
                                columns={additionalServiceChargeColumn}
                                minHeight={200}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    {/* <CButton onClick={handleClose} color="secondary">Close</CButton> */}
                </CModalFooter>
            </CModal>

            <ModalOpenMap
                open={modalMap}
                setOpen={setModalMap}
                data={transportArragmentData}
                key={mapKey}
            />
        </>
    )
}

export default DeliveryCompleteDetail