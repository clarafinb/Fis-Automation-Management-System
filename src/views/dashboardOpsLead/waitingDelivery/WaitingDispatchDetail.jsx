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
import { faPen, faPencil, faUnlink, faUpload } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import OrderRequestWaitingDispatch from 'src/components/dashboardOpsLead/waitingDispatch/OrderRequestWaitingDispatch'

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
    const [headerData, setHeaderData] = useState({
        url: 'waiting-dispatch',
        label: 'WAITING DELIVERY'
    })

    useEffect(() => {
        const url = pathname.split('/')[1];
        if (url === 'waiting-transport-confirm') {
            setHeaderData({
                url: 'waiting-transport-confirm',
                label: 'WAITING TRANSPORT CONFIRM'
            })
        }


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
        nav(`/${headerData.url}/` + projectId + "/" + whId, { replace: true })
    }

    const handleComponent = useCallback(
        (action, id) => {
            let param = ""
            if (action === 'addTransport') {
                param = `${id}/${orderReqDetail.transportModeId}/${projectId}/${orderReqId}/${whId}`
                nav(`/${headerData.url}/transport-arrangment/` + param, { replace: true })
            }
            if (action === 'addHandCarry') {
                param = `${id}/${orderReqDetail.transportModeId}/${projectId}/${orderReqId}/${whId}`
                nav(`/${headerData.url}/handcarry-arrangment/` + param, { replace: true })
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
                                <CButton className='colorBtnIcon-black p-1 me-1'>
                                    <FontAwesomeIcon
                                        icon={faUnlink}
                                        className='textWhite px-1'
                                        title='Detach Transport Arrangement'
                                        size='sm'
                                        onClick={() =>
                                            handleComponent('detachTransport', value)
                                        }
                                    />
                                </CButton>

                                : ''
                        }
                        {
                            data.transportType === 'handCarry' ?
                                <CButton className='colorBtnIcon-black p-1'>
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        className='textWhite px-1'
                                        title='Add Arrangement Hand Carry'
                                        size='sm'
                                        onClick={() =>
                                            handleComponent('addHandCarry', data?.transportArrangementId)
                                        }
                                    />
                                </CButton>

                                :
                                <CButton className='colorBtnIcon-black p-1'>
                                    <FontAwesomeIcon
                                        icon={faPencil}
                                        className='textWhite px-1'
                                        title='Add Arrangement Transport'
                                        size='sm'
                                        onClick={() =>
                                            handleComponent('addTransport', data?.transportArrangementId)
                                        }
                                    />
                                </CButton>

                        }

                    </>
                )
            }
        },
    ]

    return (
        <>
            <CRow className='py-2'>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>
                            {headerData.label}
                        </span>
                    </h4>
                </CCol>
            </CRow>
            <CCard className='mt-3 mb-3'>
                <CCardBody>
                    <CRow className='m-2'>
                        <CCol sm={5}>
                            <OrderRequestWaitingDispatch
                                data={orderReqDetail}
                            />
                        </CCol>
                        <CCol>
                            <CRow className='ms-1'>
                                <CCol>
                                    <p className="card-title mb-0">
                                        <span className='text-underline'>DE</span>LIVERY ARRANGEMENT
                                    </p>
                                </CCol>
                            </CRow>
                            <br />
                            <CRow className='ms-1'>
                                <CCol>
                                    <CRow className="mb-4">
                                        <CFormLabel
                                            className="col-form-label">Final Delivery Mode
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
                                            className="col-form-label">Final Transport Mode
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
                                    <CRow className='mb-4 mt-5'>
                                        <CCol>
                                            <p className="card-title mb-0">
                                                <span className='text-underline'>TR</span>ANSPORT ARRANGEMENT
                                            </p>
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
                                    <CCol className="d-none d-md-block text-end ">
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
                        </CCol >
                    </CRow >
                </CCardBody>
            </CCard>

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