import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CFormLabel,
    CFormTextarea,
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
import { faClipboard, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import ModalCreateOrderRequest from 'src/components/dashboard/operationLead/ModalCreateOrderRequest'
import moment from 'moment/moment'

function OrderRequest() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [projectId, setProjectId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [values, setValues] = useState({})
    const [orderReqId, setOrderReqId] = useState()
    const [openModalOrderRequest, setOpenModalOrderRequest] = useState(false)
    const [activeKey, setActiveKey] = useState(1)
    useEffect(() => {
        const id = window.location.href.split("/").pop();
        setProjectId(id)
        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, id)
            ).then(result => {
                setDetailProject(result[0])
                dispatch(actions.getListOrderRequest(id, result[0].whId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID]);

    const handleOnchange = useCallback(
        (e) => {
            const { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleComponent = useCallback(
        (name, orderReqId) => {
            setOrderReqId(orderReqId)
            if (name === 'delete') {
                const payload = {
                    orderReqId: orderReqId,
                    LMBY: Global.user.userID,
                    orderReqStatus: "Deleted"
                }
                dispatch(actions.deleteOrderRequest(payload, projectId, detailProject.whId))
            } else {
                setOpenModal(true)
            }
        }
    )

    const handleClose = () => {
        setValues({})
        setOpenModal(false)
    }

    const handleCreate = () => {
        setOpenModalOrderRequest(true)
    }

    const handleCancel = () => {
        if (values.remarks === "" || values.remarks === undefined) {
            return (
                Swal.fire({
                    title: 'Error!',
                    text: 'Remarks Empty',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            )
        } else {
            const payload = {
                orderReqId: orderReqId,
                LMBY: Global.user.userID,
                remarks: values.remarks,
                orderReqStatus: "cancelled"
            }
            dispatch(actions.cancelOrderRequest(payload, projectId, detailProject.whId))
            setOpenModal(false)
        }
    }

    const filterValue = [
        { name: 'whCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'custOrderRequest', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderRequestDesc', operator: 'startsWith', type: 'string', value: '' },
        { name: 'requestorName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderRequestDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'deliveryReqType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'transportReqType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'origin', operator: 'startsWith', type: 'string', value: '' },
        { name: 'destination', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderRequestStatus', operator: 'startsWith', type: 'string', value: '' },
        { name: 'cancelRemarks', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createDate', operator: 'startsWith', type: 'string', value: '' }
    ]

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number', textAlign: 'center' },
        { name: 'whCode', header: 'WH Code', defaultWidth: 120 },
        { name: 'whName', header: 'WH Name', defaultWidth: 120 },
        { name: 'custOrderRequest', header: 'Cust Order Request', defaultWidth: 200 },
        { name: 'orderRequestDesc', header: 'Order Req Desc', defaultWidth: 200 },
        { name: 'requestorName', header: 'Requestor', defaultWidth: 150 },
        {
            name: 'orderRequestDate',
            header: 'Order Request Date',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value }) => {
                return (
                    moment(value).format('DD-MM-YYYY HH:mm:ss')
                )
            }
        },
        { name: 'deliveryReqType', header: 'Delivery Req Type', defaultWidth: 180 },
        { name: 'transportReqType', header: 'Transport Req Type', defaultWidth: 180 },
        { name: 'origin', header: 'Origin', defaultWidth: 180 },
        { name: 'destination', header: 'Destination', defaultWidth: 180 },
        { name: 'orderRequestStatus', header: 'Order Status', defaultWidth: 180 },
        { name: 'cancelRemarks', header: 'Cancel Remarks', defaultWidth: 180 },
        { name: 'createBy', header: 'Created By', defaultWidth: 180 },
        {
            name: 'createDate',
            header: 'Created date',
            textAlign: 'center',
            defaultWidth: 180,
            render: ({ value }) => {
                return (
                    moment(value).format('DD-MM-YYYY')
                )
            }
        },
        {
            name: 'orderReqId',
            header: 'Action',
            defaultWidth: 100,
            textAlign: 'center',
            render: ({ value, cellProps }) => {
                console.log(cellProps.data.detail.visibleCancelledFunction)
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className='textBlue px-2'
                            title='Delete Order Request'
                            onClick={() =>
                                handleComponent("delete", value)
                            }
                        />
                        {cellProps.data.detail.visibleCancelledFunction !== 0 ?
                            <FontAwesomeIcon
                                icon={faClipboard}
                                className='textBlue'
                                title='Cancel Order Request'
                                onClick={() =>
                                    handleComponent("cancel", value)
                                }
                            />
                            : ''}
                    </>
                )
            }
        },
    ];

    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow className='m-3'>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Order Request
                            </h4>
                        </CCol>
                    </CRow>
                    <br />
                    <CRow className='m-3'>
                        <CCol sm={5}>
                            <h5 className="card-title mb-0">
                                {detailProject?.projectName} | {detailProject?.whName} | {detailProject?.whCode}
                            </h5>
                        </CCol>
                        <CCol className="d-none d-md-block text-end">
                            <CIcon
                                icon={cilPlus}
                                className="me-2 text-primary"
                                size="xl"
                                onClick={handleCreate}
                            />
                            <CIcon
                                icon={cilCloudUpload}
                                className="me-2 text-primary"
                                size="xl"
                            // onClick={handleCreate}
                            />
                        </CCol>
                    </CRow>
                    <br />
                    <CRow className='m-3'>
                        <CNav variant="tabs">
                            <CNavItem>
                                <CNavLink
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                >
                                    Order Request
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                >
                                    Order Req Bulk Upload Log
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                >
                                    Item Order Req Bulk Upload Log
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                    </CRow>
                    <CRow className='m-3'>
                        <CCol className="d-none d-md-block text-end">
                            <CIcon
                                icon={cilFile}
                                className="me-2 text-success"
                                size="xl"
                            // onClick={handleCreate}
                            />
                        </CCol>
                    </CRow>
                    <CRow className='m-3'>
                        <CCol className="d-none d-md-block text-end">
                            <CTabContent>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                    <SmartTable
                                        data={Dashboard?.listOrdeRequest}
                                        filterValue={filterValue}
                                        columns={columns}
                                        minHeight={500}
                                    />
                                </CTabPane>
                            </CTabContent>
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
                    <CModalTitle>Cancel Order Request</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        <CFormLabel className="col-sm-2 col-form-label">Remarks <code>(*)</code></CFormLabel>
                        <CCol sm={10}>
                            <CFormTextarea
                                rows={3}
                                name="remarks"
                                value={values?.remarks}
                                onChange={handleOnchange}
                            >
                            </CFormTextarea>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={handleClose} color="secondary">Close</CButton>
                    <CButton color="primary" onClick={handleCancel}>Save</CButton>
                </CModalFooter>
            </CModal>
            <ModalCreateOrderRequest
                open={openModalOrderRequest}
                setOpen={setOpenModalOrderRequest}
                projectId={projectId}
                detailProject={detailProject}
            />
        </>
    )
}

export default OrderRequest