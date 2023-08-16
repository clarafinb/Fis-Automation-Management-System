import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CInputGroup,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'

import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPencil, faPlus, faUnlink, faUpload } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/moment'
import Swal from 'sweetalert2'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'

function WaitingDispatchDetail() {
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const nav = useNavigate()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [whId, setWhId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [orderReqId, setOrderReqId] = useState()
    const [custOrderRequest, setCustOrderRequest] = useState(null)
    const [itemOrderRequest, setItemOrderRequest] = useState([])
    const [itemOrderRequestData, setItemOrderRequestData] = useState([])
    const [transportMode, setTrasportMode] = useState([])
    const [templateName, setTemplateName] = useState("")
    const [openModalUpload, setOpenModalUpload] = useState(false)
    const [openModalDeliveryArrangment, setOpenModalDeliveryArrangment] = useState(false)
    const [fileUpload, setFileUpload] = useState(null);
    const [templateUrl, setTemplateUrl] = useState("")
    const [values, setValues] = useState({})
    const { pathname } = useLocation();

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const orId = pathname.split('/')[5]

        setProjectId(pId)
        setOrderReqId(orId)
        setWhId(wId)

        if (Global?.user?.userID) {
            dispatch(
                actions.getOrderRequestDetail(orId)
            ).then(result => {
                setOrderReqDetail(result[0])
            })

            dispatch(
                actions.getSelecTransportType()
            ).then(result => {
                setTrasportMode(result)
            })

            dispatch(actions.getTransportArragementOrderReq(orId))
            // dispatch(actions.getOrderRequestServiceCharge(orderRequestId))
        }
    }, [Global?.user?.userID]);

    const handleCloseModalUpload = () => {
        setOpenModalUpload(false)
        setFileUpload(null)
    }

    const handleBack = () => {
        nav("/waiting-dispatch/" + projectId + "/" + whId, { replace: true })
    }

    const handleComponent = useCallback(
        (action, id) => {
            let param = ""
            if (action === 'addTransport') {
                param = `${id}/${orderReqDetail.transportModeId}/${projectId}/${orderReqId}/${whId}`
                nav('/waiting-dispatch/transport-arrangment/' + param)
            }
            if (action === 'addHandCarry') {
                param = `${id}/${orderReqDetail.transportModeId}/${projectId}/${orderReqId}/${whId}`
                nav('/waiting-dispatch/handcarry-arrangment/' + param)
            }
        }
    )

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleCreateTransportArragementSave = () => {
        const payload = {
            orderReqId: orderReqId,
            deliveryModeId: orderReqDetail.deliveryModeId,
            transportModeId: orderReqDetail.transportModeId,
            LMBY: Global?.user?.userID
        }
        dispatch(actions.addTransportArrangment(payload))
    }

    const handleCreateTransportArragement = () => {
        setOpenModalDeliveryArrangment(true)
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

    const transportArragementColumn = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'transportArrangementRefId', header: 'Arrangement Ref Id', defaultFlex: 1 },
        { name: 'deliveryMode', header: 'Delivery Mode', defaultFlex: 1 },
        { name: 'transportMode', header: 'Transport Mode', defaultFlex: 1 },
        { name: 'transportTypeList', header: 'Transport Type List', defaultFlex: 1 },
        { name: 'transportDispatcherList', header: 'Dispatcher', defaultFlex: 1 },
        {
            name: 'transportArrangementOrderReqId',
            header: 'Action',
            defaultFlex: 1,
            render: ({ value, data }) => {
                return (
                    <>
                        {
                            data.hasDetachFunction != 'No' ?
                                <FontAwesomeIcon
                                    icon={faUnlink}
                                    className='textBlue px-2'
                                    title='Detach Transport Arrangement'
                                    size='sm'
                                    onClick={() =>
                                        handleComponent('detachTransport', value)
                                    }
                                />
                                : ''
                        }
                        {
                            data.transportType === 'handCarry' ?
                                <FontAwesomeIcon
                                    icon={faPen}
                                    className='textBlue px-2'
                                    title='Add Arrangement Hand Carry'
                                    size='sm'
                                    onClick={() =>
                                        handleComponent('addHandCarry', data?.transportArrangementId)
                                    }
                                />
                                :
                                <FontAwesomeIcon
                                    icon={faPencil}
                                    className='textBlue px-2'
                                    title='Add Arrangement Transport'
                                    size='sm'
                                    onClick={() =>
                                        handleComponent('addTransport', data?.transportArrangementId)
                                    }
                                />
                        }

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
                                        Waiting Delivery
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
                                                type="textarea"
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
                                            <CFormTextarea
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
                                            className="col-sm-3 col-form-label">Pick And Pack Complete Date
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientCompanyName"
                                                value={orderReqDetail.pickandpackCompleteDate}
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
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Delivery Arrangement
                                    </h4>
                                </CCol>
                            </CRow>
                            <br />
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
                                    <CRow>
                                        <CCol>
                                            <h5 className="card-title mb-0">
                                                Transport Arrangement
                                            </h5>
                                        </CCol>
                                        {
                                            (DashboardOpsLead?.listTransportArragement.length == 0 && orderReqDetail?.hasGroup == 'No') ||
                                                (orderReqDetail?.hasGroup == 'Yes') ?
                                                <CCol className="d-none d-md-block text-end">
                                                    <CIcon
                                                        icon={cilPlus}
                                                        className="me-2 text-default"
                                                        size="xl"
                                                        onClick={handleCreateTransportArragement}
                                                    />
                                                </CCol>
                                                :
                                                ''
                                        }
                                    </CRow>
                                    <CCol className="d-none d-md-block text-end">
                                        <SmartTable
                                            data={DashboardOpsLead?.listTransportArragement}
                                            // filterValue={filterValue}
                                            columns={transportArragementColumn}
                                            minHeight={200}
                                        />
                                    </CCol>
                                </CCol>
                            </CRow>
                            <br />
                            < CRow className='mt-3'>
                                <CCol className="d-none d-md-block text-end" md={12}>
                                    {/* <CButton onClick={handleBack} color="secondary">Back</CButton> */}
                                    <ButtonCancel
                                        label='CANCEL'
                                        handleButton={handleBack}
                                    />
                                </CCol>
                            </CRow>
                            {/*
                            <br />
                            <br />
                            <CRow>
                                <CCol>
                                    <h5 className="card-title mb-0">
                                        Additional Service
                                    </h5>
                                </CCol>
                                <CCol className="d-none d-md-block text-end">
                                    <CIcon
                                        icon={cilPlus}
                                        className="me-2 text-default"
                                        size="xl"
                                        onClick={handleCreateAdditionalService}
                                    />
                                </CCol>
                            </CRow>
                            <CCol className="d-none d-md-block text-end">
                                <SmartTable
                                    data={Dashboard?.listOrdeRequestAdditionalService}
                                    // filterValue={filterValue}
                                    columns={additionalServiceColumn}
                                    minHeight={200}
                                />
                            </CCol> */}
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
                visible={openModalDeliveryArrangment}
                onClose={() => setOpenModalDeliveryArrangment(false)}
                alignment='center'
            >
                <CModalHeader>
                    <CModalTitle>Add New Delivery Arrangement</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CRow className="mb-4">
                            <CFormLabel
                                className="col-sm-3 col-form-label">Delivery Mode
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
                                className="col-sm-3 col-form-label">Transport Mode
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
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={handleCreateTransportArragementSave} color="primary">Create</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default WaitingDispatchDetail