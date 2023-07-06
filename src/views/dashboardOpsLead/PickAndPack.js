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
    CRow
} from '@coreui/react'

import * as actions from '../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilFile, cilPlus } from '@coreui/icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faRefresh, faTable, faUpload } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

function PickAndPack() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [projectId, setProjectId] = useState("")
    const [templateName, setTemplateName] = useState("")
    const [templateUrl, setTemplateUrl] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [openModalUpload, setOpenModalUpload] = useState(false)
    const [orderReqId, setOrderReqId] = useState()
    const [custOrderRequest, setCustOrderRequest] = useState(null)
    const [itemOrderRequest, setItemOrderRequest] = useState([])
    const [itemOrderRequestData, setItemOrderRequestData] = useState([])
    const [fileUpload, setFileUpload] = useState(null);
    useEffect(() => {
        const id = window.location.href.split("/").pop();
        setProjectId(id)
        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, id)
            ).then(result => {
                setDetailProject(result[0])
                dispatch(actions.getListPickAndPackPending(id, result[0].whId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID, projectId]);

    const handleComponent = useCallback(
        (action, orderReqId) => {
            setOrderReqId(orderReqId)
            if (action === 'start') {
                const payload = {
                    orderReqId: orderReqId,
                    LMBY: Global.user.userID
                }
                dispatch(actions.startPickAndPack(payload, projectId, detailProject.whId))
            } else if (action === 'reset') {
                dispatch(actions.resetPickAndPack(orderReqId, projectId, detailProject.whId, Global.user.userID))
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

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleCloseModalUpload = () => {
        setOpenModalUpload(false)
        setFileUpload(null)
    }

    const handleDownloadTemplate = () => {
        window.open(templateUrl, '_blank')
    }

    const handleUploadFile = (e) => {
        e.preventDefault()
        if (fileUpload) {
            const formData = new FormData(e.target);
            dispatch(actions.uploadOrderReqItem(
                formData,
                orderReqId,
                projectId,
                detailProject.whId,
                Global?.user?.userID
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileUpload(file);
    };


    const handleModalDetailItem = ({ orderReqId, custOrderRequest }) => {
        setOrderReqId(orderReqId)
        setCustOrderRequest(custOrderRequest)
        dispatch(actions.getOrderRequestItemList(orderReqId))
            .then(result => {
                const remapData = [
                    {
                        name: 'no',
                        header: 'No',
                        defaultVisible: true,
                        defaultWidth: 80,
                        type: 'number'
                    }
                ]
                result.map((row, idx) => {
                    if (Object.keys(row)[idx]) {
                        remapData.push({
                            name: Object.keys(row)[idx],
                            header: Object.keys(row)[idx],
                            defaultFlex: 1
                        })
                    }
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

    const filterValue = [
        { name: 'whCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'custOrderRequest', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderRequestDesc', operator: 'startsWith', type: 'string', value: '' },
        { name: 'requestorName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderRequestDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'deliveryReqType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'transportReqType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'origin', operator: 'startsWith', type: 'string', value: '' },
        { name: 'destination', operator: 'startsWith', type: 'string', value: '' },
        { name: 'totalItem', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createDate', operator: 'startsWith', type: 'string', value: '' }
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number' },
        { name: 'whCode', header: 'WH Code', defaultWidth: 120 },
        { name: 'custOrderRequest', header: 'Customer Order Request', defaultWidth: 230 },
        { name: 'orderRequestDesc', header: 'Order Req Desc', defaultWidth: 230 },
        { name: 'requestorName', header: 'Requestor', defaultWidth: 230 },
        { name: 'orderRequestDate', header: 'Order Request Date', defaultWidth: 230, textAlign: 'center' },
        { name: 'deliveryReqType', header: 'Delivery Req Type', defaultWidth: 230 },
        { name: 'transportReqType', header: 'Transport Req Type', defaultWidth: 230 },
        { name: 'origin', header: 'Origin', defaultWidth: 200 },
        { name: 'destination', header: 'Destination', defaultWidth: 200 },
        {
            name: 'totalItem',
            header: 'Total Item Request',
            defaultWidth: 150,
            textAlign: 'center',
            render: ({ value, cellProps }) => {
                return (
                    <>
                        <span>{value}</span>
                        <FontAwesomeIcon
                            icon={faTable}
                            className='textBlue px-2'
                            size='lg'
                            title='Detail Item List'
                            onClick={() => handleModalDetailItem(cellProps.data)} />

                    </>
                )
            }
        },
        { name: 'createBy', header: 'Created By', defaultWidth: 250 },
        { name: 'createDate', header: 'Created date', defaultWidth: 250 },
        {
            name: 'orderReqId',
            header: 'Action',
            defaultWidth: 250,
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value, cellProps }) => {
                return (
                    <>
                        {
                            cellProps.data.totalItem > 0 ?
                                <>
                                    <FontAwesomeIcon
                                        icon={faPlay}
                                        className='textBlue px-2'
                                        size='sm'
                                        title='Pick and Pack Start'
                                        onClick={() => handleComponent('start', value)} />
                                    <FontAwesomeIcon
                                        icon={faRefresh}
                                        className='textBlue px-2'
                                        size='sm'
                                        title='Order Request Item Reset'
                                        onClick={() => handleComponent('reset', value)} />
                                </>
                                :
                                <FontAwesomeIcon
                                    icon={faUpload}
                                    className='textBlue px-2'
                                    title='Order Request'
                                    size='sm'
                                    onClick={() =>
                                        handleComponent('insert', value)
                                    }
                                />
                        }
                    </>
                )
            }
        },
    ];

    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Pick And Pack Pending
                            </h4>
                        </CCol>
                    </CRow>
                    <br />
                    <CRow>
                        <CCol sm={5}>
                            <h5 className="card-title mb-0">
                                {detailProject?.projectName} | {detailProject?.whName} | {detailProject?.whCode}
                            </h5>
                        </CCol>
                    </CRow>
                    <br />
                    <br />
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <CIcon
                                icon={cilFile}
                                className="me-2 text-success"
                                size="xl"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <SmartTable
                                data={Dashboard?.listPickAndPackPending}
                                filterValue={filterValue}
                                columns={columns}
                                minHeight={400}
                            />
                        </CCol>
                    </CRow>
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
        </>
    )
}

export default PickAndPack