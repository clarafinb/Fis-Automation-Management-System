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
    CFormTextarea,
    CInputGroup,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'

import * as actions from '../../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilFile, cilPlus } from '@coreui/icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus, faRefresh, faSearch, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/moment'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import Alert from 'src/components/custom/toast/Alert'

function PickAndPackProgressDetail() {
    const nav = useNavigate();
    const { dispatch, Global, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [orderReqId, setOrderReqId] = useState("")
    const [warehouseId, setWarehouseId] = useState("");
    const [openModal, setOpenModal] = useState(false)
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
    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)
    const { pathname } = useLocation();

    useEffect(() => {
        const pId = pathname.split('/')[4]
        const wId = pathname.split('/')[5]
        const orId = pathname.split('/')[7]

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
                actions.getSelectActiveTransport()
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
                // setValues({})
            })
        }
    }, [Dashboard?.listOrdeRequestAdditionalService])

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
        nav("/dashboard-ops-lead/pick-pack/progress/" + projectId + "/" + warehouseId, { replace: true })
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
            setOpenModalAdditionalService(true)
            // setValues({})
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
                                        Pick And Pack Progress
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
                                        Pick and Pack Completion
                                    </h4>
                                </CCol>
                            </CRow>
                            <br />
                            <CForm onSubmit={handleConfirm}>
                                <CRow>
                                    <CCol>
                                        <CRow className="mb-4">
                                            <CFormLabel
                                                className="col-sm-3 col-form-label">Total Item Request
                                            </CFormLabel>
                                            <CCol md={2}>
                                                <CFormInput
                                                    type="text"
                                                    name="totalItem"
                                                    value={orderReqDetail?.totalItem}
                                                    readOnly
                                                    disabled
                                                />
                                            </CCol>
                                            <CCol>
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                    className='textBlue px-2'
                                                    title='Item List'
                                                    size='lg'
                                                    onClick={() =>
                                                        handleModalDetailItem(orderReqId)
                                                    }
                                                />
                                                {/* {
                                                orderReqDetail?.totalItem > 0 ?
                                                    <FontAwesomeIcon
                                                        icon={faRefresh}
                                                        className='textBlue px-2'
                                                        title='Item List'
                                                        size='lg'
                                                        onClick={() =>
                                                            handleComponent('reset', orderReqId)
                                                        }
                                                    />
                                                    : ''
                                            }
                                            <FontAwesomeIcon
                                                icon={faUpload}
                                                className='textBlue px-2'
                                                title='Item List'
                                                size='lg'
                                                onClick={() =>
                                                    handleComponent('upload')
                                                }
                                            /> */}
                                            </CCol>
                                        </CRow>
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
                                        <CRow className="mb-4">
                                            <CFormLabel className=" col-form-label">Total Collies</CFormLabel>
                                            <CCol>
                                                <CFormInput
                                                    type="number"
                                                    name="totalCollies"
                                                    value={values?.totalCollies}
                                                    onChange={handleOnchange}
                                                    required
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-4">
                                            <CFormLabel className=" col-form-label">Total Volume (CBM)</CFormLabel>
                                            <CCol>
                                                <CFormInput
                                                    type="number"
                                                    name="totalVolume"
                                                    value={values?.totalVolume}
                                                    onChange={handleOnchange}
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
                                                data={Dashboard?.listOrdeRequestAdditionalService}
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
                                        {
                                            orderReqDetail?.totalItem > 0 ?
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
                                                : ''
                                        }
                                    </CCol>

                                </CRow>
                            </CForm>
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
        </>
    )
}

export default PickAndPackProgressDetail