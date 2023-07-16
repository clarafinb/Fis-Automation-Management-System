import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'

import * as actions from '../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilFile } from '@coreui/icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faTable } from '@fortawesome/free-solid-svg-icons'

function PickAndPackProgress() {
    const nav = useNavigate();
    const { dispatch, Global, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [projectId, setProjectId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [openModalUpload, setOpenModalUpload] = useState(false)
    const [orderReqId, setOrderReqId] = useState()
    const [custOrderRequest, setCustOrderRequest] = useState(null)
    const [itemOrderRequest, setItemOrderRequest] = useState([])
    const [itemOrderRequestData, setItemOrderRequestData] = useState([])
    useEffect(() => {
        const id = window.location.href.split("/").pop();
        setProjectId(id)
        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, id)
            ).then(result => {
                setDetailProject(result[0])
                dispatch(actions.getListPickAndPackProgress(id, result[0].whId, Global?.user?.userID))
            })
        }
    }, [Global?.user?.userID]);

    const handleComponent = useCallback(
        (action, orderReqId) => {
            setOrderReqId(orderReqId)
            nav(`detail/${orderReqId}`)
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
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        {
            name: 'orderReqId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value, cellProps }) => {
                return (
                    <>
                        {
                            cellProps.data.totalItem > 0 ?
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className='textBlue px-2'
                                    title='Order Request'
                                    size='sm'
                                    onClick={() =>
                                        handleComponent('detail', value)
                                    }
                                /> : ''
                        }
                    </>
                )
            }
        },
        { name: 'whCode', header: 'WH Code', defaultWidth: 200 },
        { name: 'custOrderRequest', header: 'Customer Order Request', defaultWidth: 230 },
        { name: 'orderRequestDesc', header: 'Order Req Desc', defaultWidth: 200 },
        { name: 'requestorName', header: 'Requestor', defaultWidth: 200 },
        { name: 'orderRequestDate', header: 'Order Request Date', defaultWidth: 200, textAlign: 'center' },
        { name: 'deliveryReqType', header: 'Delivery Req Type', defaultWidth: 200 },
        { name: 'transportReqType', header: 'Transport Req Type', defaultWidth: 200 },
        { name: 'origin', header: 'Origin', defaultWidth: 200 },
        { name: 'destination', header: 'Destination', defaultWidth: 350 },
        {
            name: 'totalItem',
            header: 'Total Item Request',
            defaultWidth: 200,
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
        { name: 'createBy', header: 'Created By', defaultWidth: 200 },
        { name: 'createDate', header: 'Created date', defaultWidth: 200 },
    ];

    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Pick And Pack Progress
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
                                data={Dashboard?.listPickAndPackProgress}
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
        </>
    )
}

export default PickAndPackProgress