import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

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

import * as actions from '../../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilFile, cilPlus } from '@coreui/icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faRefresh, faUpload } from '@fortawesome/free-solid-svg-icons'

function PickAndPack() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [detailProject, setDetailProject] = useState({})
    const [projectId, setProjectId] = useState("")
    const [openModal, setOpenModal] = useState(false)
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
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Order Request
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
                        <CCol className="d-none d-md-block text-end">
                            <CIcon
                                icon={cilPlus}
                                className="me-2 text-primary"
                                size="xl"
                            />
                            <CIcon
                                icon={cilCloudUpload}
                                className="me-2 text-primary"
                                size="xl"
                            />
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
            </CModal>
        </>
    )
}

export default PickAndPack