import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
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
import { faPlay, faRefresh, faUpload } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/moment'

function PickAndPackProgressDetail() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [orderReqId, setOrderReqId] = useState()
    const [custOrderRequest, setCustOrderRequest] = useState(null)
    const [itemOrderRequest, setItemOrderRequest] = useState([])
    const [itemOrderRequestData, setItemOrderRequestData] = useState([])
    useEffect(() => {
        const splitUri = window.location.href.split("/");
        setProjectId(splitUri[7])
        setOrderReqId(splitUri[9])
        if (Global?.user?.userID) {
            dispatch(
                actions.getOrderRequestDetail(splitUri[9])
            ).then(result => {
                setOrderReqDetail(result[0])
                // dispatch(actions.getListPickAndPackPending(id, result[0].whId, Global?.user?.userID))
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
                dispatch(actions.resetPickAndPack(projectId, detailProject.whId, Global.user.userID))
            } else {
                // TODO insert action
            }
        }
    )

    const handleClose = () => {
        setOpenModal(false)
    }


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
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'whCode', header: 'WH Code', defaultFlex: 1 },
        { name: 'custOrderRequest', header: 'Customer Order Request', defaultFlex: 1 },
        { name: 'orderRequestDesc', header: 'Order Req Desc', defaultFlex: 1 },
        { name: 'requestorName', header: 'Requestor', defaultFlex: 1 },
        { name: 'orderRequestDate', header: 'Order Request Date', defaultFlex: 1, textAlign: 'center' },
        { name: 'deliveryReqType', header: 'Delivery Req Type', defaultFlex: 1 },
        { name: 'transportReqType', header: 'Transport Req Type', defaultFlex: 1 },
        { name: 'origin', header: 'Origin', defaultFlex: 1 },
        { name: 'destination', header: 'Destination', defaultFlex: 1 },
        {
            name: 'totalItem',
            header: 'Total Item Request',
            defaultFlex: 1,
            textAlign: 'center',
            render: ({ value, cellProps }) => {
                return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                        title='Detail Item List'
                        onClick={() => handleModalDetailItem(cellProps.data)}>
                        {value}
                    </a>
                )
            }
        },
        { name: 'createBy', header: 'Created By', defaultFlex: 1 },
        { name: 'createDate', header: 'Created date', defaultFlex: 1 },
        {
            name: 'orderReqId',
            header: 'Action',
            // defaultFlex: 1,
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
                            <pre>
                                {JSON.stringify(orderReqDetail)}
                            </pre>
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
                                                name="materialCode"
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
                                                name="materialCode"
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
                                                name="materialCode"
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
                                                name="materialCode"
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
                                                name="materialCode"
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
                                                name="materialCode"
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
                                                name="materialCode"
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
                                                name="materialCode"
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
                                                name="materialCode"
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
                                                name="materialCode"
                                            />
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {/* <CModal
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
                                // filterValue={filterValue}
                                columns={itemOrderRequest}
                                minHeight={200}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={handleClose} color="secondary">Close</CButton>
                </CModalFooter>
            </CModal> */}
        </>
    )
}

export default PickAndPackProgressDetail