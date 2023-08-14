import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'

import * as actions_dashboard from '../../../config/redux/Dashboard/actions'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/moment'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import Alert from 'src/components/custom/toast/Alert'

function PickupPreparationDetail() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [orderReqId, setOrderReqId] = useState("")
    const [warehouseId, setWarehouseId] = useState("");
    const [custOrderRequest, setCustOrderRequest] = useState(null)
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
    const [values, setValues] = useState({})
    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)
    const { pathname } = useLocation();

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const orId = pathname.split('/')[5]

        setOrderReqId(orId)
        setProjectId(pId)
        setWarehouseId(wId)

        if (Global?.user?.userID) {
            dispatch(
                actions.getOrderRequestDetail(orId)
            ).then(result => {
                setOrderReqDetail(result[0])
            })

            dispatch(
                actions_dashboard.getSelectActiveTransport()
            ).then(result => {
                setTrasportMode(result)
            })

            dispatch(actions.getOrderRequestServiceCharge(orId))
        }
    }, [Global?.user?.userID]);

    useEffect(() => {
        if (projectId && orderReqId) {
            dispatch(
                actions.getOrderRequestServiceChargeList(projectId, orderReqId)
            ).then(response => {
                setServiceChargeData(response)
            })
        }
    }, [DashboardOpsLead?.listOrdeRequestAdditionalService])

    const handleOnChangeTransportMode = (selectedTransportMode) => {
        setSelectedDeliveryRequest({})
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

    const handleBack = () => {
        nav("/pickup-preparation/" + projectId + "/" + warehouseId, { replace: true })
    }

    const handleConfirm = (event) => {

        event.preventDefault()
        event.stopPropagation()

        const payload = {
            orderReqId: orderReqId,
            deliveryModeId: selectedDeliveryRequest?.value,
            transportModeId: selectedTransportMode?.value,
            totalCollies: values?.totalCollies,
            totalVolume: values?.totalVolume,
            LMBY: Global?.user?.userID
        }

        const err = []
        if (payload.deliveryModeId === undefined) err.push('Delivery Request Final')
        if (payload.transportModeId === undefined) err.push('Transport Mode Final')

        if (err.length > 0) {
            setErrMessage(err.join(' , '))
            setVisible(true)
        } else {
            dispatch(actions.pickandPackComplete(payload))
            handleBack()
        }
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

    const handleCreateAdditionalService = () => {

        dispatch(
            actions.getOrderRequestServiceChargeList(projectId, orderReqId)
        ).then(response => {
            setServiceChargeData(response)
            setOpenModalAdditionalService(true)
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

    const handleDeleteAddService = (custOrderRequestServiceChargeId) => {
        dispatch(
            actions
                .deleteAddServicePickPack(
                    orderReqId,
                    {
                        custOrderRequestServiceId: custOrderRequestServiceChargeId,
                        LMBY: Global?.user?.userID
                    }
                )
        )
    }

    const additionalServiceColumn = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'serviceChargeCode', header: 'SVC Code', defaultFlex: 1 },
        { name: 'serviceCharge', header: 'SVC Desc', defaultFlex: 1 },
        { name: 'uom', header: 'UOM', defaultFlex: 1 },
        { name: 'serviceQty', header: 'QTY', defaultFlex: 1 },
        {
            name: 'custOrderRequestServiceChargeId',
            header: 'Action',
            defaultFlex: 1,
            textAlign: "center",
            render: ({ value }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className='textBlue px-2'
                            title='Delete Addtional Service'
                            onClick={() => handleDeleteAddService(value)}
                        />
                    </>
                )
            }
        },
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
            render: ({ value, data }) => {
                return (
                    <>
                        <CFormInput
                            className='form-control'
                            type="text"
                            name="qty"
                            value={values?.qty}
                            onChange={(e) => handleChangeQty(e, data)}
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
        <>
            <CRow className='py-2'>
                <CCol sm={12}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Pickup Preparation Detail
                                    </h4>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm={4}>
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
                                            className=" col-form-label">Order Request Date
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
                                            className=" col-form-label">Cust Order Req No
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
                                            className=" col-form-label">Order Req Description
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
                                            className=" col-form-label">Delivery Process Type
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
                                            className=" col-form-label">Route Type
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
                                            className=" col-form-label">Requestor Name
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
                                            className=" col-form-label">Delivery Request Type
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
                                            className=" col-form-label">Transport Request Type
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
                                            className=" col-form-label">Origin
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
                                            className=" col-form-label">
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
                                    {/* <CRow className="mb-4">
                                        <CFormLabel
                                            className=" col-form-label">Destination
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
                                    </CRow> */}
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className=" col-form-label">Destination
                                        </CFormLabel>
                                        <CCol>
                                            {/* <CFormInput
                                                type="text"
                                                name="destinationAddress"
                                                value={orderReqDetail?.destinationAddress}
                                                readOnly
                                                disabled
                                            /> */}
                                            <CFormTextarea
                                                rows={4}
                                                name="description"
                                                value={orderReqDetail?.destinationAddress}
                                                readOnly
                                                disabled />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className=" col-form-label">Recipient Name
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
                                            className=" col-form-label">Recipient Company Name
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
                                            className=" col-form-label">Create By / Create Date
                                        </CFormLabel>
                                        <CCol>
                                            <CFormInput
                                                type="text"
                                                name="recipientCompanyName"
                                                value={orderReqDetail?.createBy + ' / ' + orderReqDetail?.createDate}
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
                <CCol sm={8}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <h4 className="card-title mb-0">
                                        Pickup Preparation
                                    </h4>
                                </CCol>
                            </CRow>
                            <br />
                            <CForm onSubmit={handleConfirm}>
                                <CRow>
                                    <CCol>
                                        <CRow className="mb-4">
                                            <CFormLabel className=" col-form-label">Transport Mode Final</CFormLabel>
                                            <CCol>
                                                <Select
                                                    className="input-select"
                                                    options={transportMode}
                                                    isSearchable={true}
                                                    value={selectedTransportMode}
                                                    onChange={handleOnChangeTransportMode}
                                                    required
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-4">
                                            <CFormLabel className=" col-form-label">Delivery Request Final</CFormLabel>
                                            <CCol>
                                                <Select
                                                    className="input-select"
                                                    options={deliveryRequest}
                                                    isSearchable={true}
                                                    value={selectedDeliveryRequest}
                                                    onChange={handleOnChangeDeliveryRequest}
                                                    required
                                                />
                                            </CCol>
                                        </CRow>
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
                                                data={DashboardOpsLead?.listOrdeRequestAdditionalService}
                                                // filterValue={filterValue}
                                                columns={additionalServiceColumn}
                                                minHeight={200}
                                            />
                                        </CCol>
                                        <CRow>
                                            <CCol>
                                                <Alert
                                                    message={errMessage}
                                                    visible={visible}
                                                    setVisible={setVisible}
                                                />
                                            </CCol>
                                        </CRow>
                                        < CRow className='mt-3'>
                                            <CCol className="d-none d-md-block text-end" md={12}>
                                                <ButtonSubmit
                                                    label='CONFIRM'
                                                    type="submit"
                                                    // handleButton={handleConfirm}
                                                    className='me-2'
                                                />
                                                <ButtonCancel
                                                    label='CANCEL'
                                                    handleButton={handleBack}
                                                />
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol >
            </CRow >

            <CModal
                size="lg"
                visible={openModalAdditionalService}
                onClose={() => setOpenModalAdditionalService(false)}
                alignment='center'
            >
                <CModalHeader>
                    <CModalTitle>Additonal Service Charge</CModalTitle>
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
            </CModal>
        </>
    )
}

export default PickupPreparationDetail