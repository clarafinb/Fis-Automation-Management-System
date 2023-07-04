import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'

import * as actions from '../../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilFile, cilPlus } from '@coreui/icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

function TransportArragmentDetail() {
    const nav = useNavigate();
    const { dispatch, Global, Dashboard } = useRedux()
    const [openModal, setOpenModal] = useState(false)
    const [openModalSc, setOpenModalSc] = useState(false)
    const [transportType, setTransportType] = useState([])
    const [dispatcher, setDispatcher] = useState([])
    const [values, setValues] = useState({})
    const [param, setParam] = useState({})

    useEffect(() => {
        const split = window.location.href.split("/");

        setParam({
            transportArrangmentId: split[7],
            transportModeId: split[8],
            projectId: split[9],
            orderReqId: split[10]
        })

        if (split[7] && Global?.user?.userID) {
            dispatch(actions.getOrderRequestTransportArrangment(split[7]))
            dispatch(actions.getTransportTypeArranged(split[7]))
            dispatch(actions.getTransportArrangmentServiceChargeList(split[7]))
        }
    }, [Global?.user?.userID]);

    const handleComponent = useCallback(
        (action, id) => {
            if (action == "delServiceCharge") {
                dispatch(actions.deleteTransportArrangmentServiceCharge(id, Global?.user?.userID))
            } else {
                dispatch(actions.deleteTransportType(id, param?.transportArrangmentId))
            }

        }
    )

    const handleComponentQty = useCallback(
        (projectServiceChargeId) => {
            if (values[projectServiceChargeId]) {
                let payload = {
                    transportArrangmentId: param.transportArrangmentId,
                    projectServiceChargeId: projectServiceChargeId,
                    serviceQty: values[projectServiceChargeId],
                    LMBY: Global?.user?.userID
                }

                dispatch(actions.addTransportArrangmentServiceCharge(payload))
            } else {
                alert("Qty is Empty !")
            }
        }
    )

    const handleChangeQty = useCallback(
        (e, data) => {

            const { value } = e.target;

            setValues((prev) => ({
                ...prev,
                [data?.projectServiceChargeId]: value
            }));

        }, [setValues]
    )

    const filterValue = [
        { name: 'no', operator: 'startsWith', type: 'string', value: '' },
        { name: 'transportArrRefId', operator: 'startsWith', type: 'string', value: '' },
        { name: 'deliveryMode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'transportMode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderReqNo', operator: 'startsWith', type: 'string', value: '' },
        { name: 'requestorName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'transportReqType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'origin', operator: 'startsWith', type: 'string', value: '' },
        { name: 'destination', operator: 'startsWith', type: 'string', value: '' },
        { name: 'pickandpackcompletedate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'mainDispatcherName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'transportName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'serviceChargeCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'serviceCharge', operator: 'startsWith', type: 'string', value: '' },
        { name: 'uom', operator: 'startsWith', type: 'string', value: '' },
        { name: 'serviceQty', operator: 'startsWith', type: 'string', value: '' }
    ]

    const requestTransportArrangmentColumns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'transportArrRefId', header: 'Arrangement Ref Id', defaultFlex: 1 },
        { name: 'deliveryMode', header: 'Delivery Mode', defaultFlex: 1 },
        { name: 'transportMode', header: 'Transport Mode', defaultFlex: 1 },
        { name: 'orderReqNo', header: 'Cust Order Req No', defaultFlex: 1 },
        { name: 'requestorName', header: 'Customer Requestor', defaultFlex: 1 },
        { name: 'origin', header: 'Origin', defaultFlex: 1 },
        { name: 'destination', header: 'Destination', defaultFlex: 1 },
        { name: 'pickandpackCompleteDate', header: 'Pick And Pack Complete Date', defaultFlex: 1 },
    ]

    const transportTypeAndDispatcherColumns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'transportName', header: 'Transport Type', defaultFlex: 1 },
        { name: 'mainDispatcherName', header: 'Dispatcher', defaultFlex: 1 }, ,
        { name: 'pickandpackCompleteDate', header: 'Create Date', defaultFlex: 1 },
        {
            name: 'transportTypeArrangementId',
            header: 'Action',
            defaultFlex: 1,
            defaultWidth: 80,
            render: ({ value, cellProps }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className='textBlue px-2'
                            title='Order Request'
                            size='sm'
                            onClick={() =>
                                handleComponent("delTransportType", value)
                            }
                        />
                    </>
                )
            }
        }
    ]

    const serviceChargeColumns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'serviceChargeCode', header: 'SVC Code', defaultFlex: 1 },
        { name: 'serviceCharge', header: 'SVC Desc', defaultFlex: 1 },
        { name: 'uom', header: 'UOM', defaultFlex: 1 },
        { name: 'serviceQty', header: 'QTY', defaultFlex: 1 },
        {
            name: 'transportArrangementServiceId',
            header: 'Action',
            defaultFlex: 1,
            defaultWidth: 80,
            render: ({ value, cellProps }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className='textBlue px-2'
                            title='Order Request'
                            size='sm'
                            onClick={() =>
                                handleComponent("delServiceCharge", value)
                            }
                        />
                    </>
                )
            }
        }
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

    const handleCreateTransportArrangmentType = async () => {

        let listTransportType = await dispatch(actions.getTransportTypeList(param?.transportModeId))
        let listDispatcher = await dispatch(actions.getDispatcherList(param?.transportArrangmentId, param?.projectId))

        setTransportType(['Select Transport Type', ...listTransportType])
        setDispatcher(['Select Dispatcher', ...listDispatcher])

        setOpenModal(true)
    }

    const handleCreateServiceCharge = async () => {
        setOpenModalSc(true)

        dispatch(actions.getServiceChargeList(param?.transportArrangmentId, param?.projectId))
    }

    const handleAddTransportType = () => {
        let payload = {
            transportArrangmentId: param?.transportArrangmentId,
            transportTypeId: values?.transportType,
            mainDispatcherId: values?.dispatcher,
            notes: "",
            LMBY: Global?.user?.userID
        }

        if (!payload.transportTypeId || !payload.mainDispatcherId) {
            alert("Required Field is Empty !")
        } else {
            dispatch(actions.addTransportArrangmentType(payload))
        }

    }

    const handleOnchange = useCallback(
        (e) => {
            const { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleConfirm = (type) => {
        if (type == "confirm") {
            dispatch(actions.completeTransportArrangement(param?.transportArrangmentId, Global?.user?.userID))
            nav('/operation-lead/waiting-dispatch/' + param?.projectId + '/detail/' + param?.orderReqId)
        } else {
            nav('/operation-lead/waiting-dispatch/' + param?.projectId + '/detail/' + param?.orderReqId)
        }
    }


    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Waiting Delivery
                            </h4>
                        </CCol>
                    </CRow>
                    <br />
                    <CRow>
                        <CCol>
                            <CRow>
                                <CCol>
                                    <h5 className="card-title mb-0">
                                        Customer Order Request List
                                    </h5>
                                </CCol>
                            </CRow>
                            <SmartTable
                                data={Dashboard?.listRequestTransportArragement}
                                columns={requestTransportArrangmentColumns}
                                minHeight={200}
                            // filterValue={filterValue}
                            />
                        </CCol>
                    </CRow>
                    <br />
                    <CRow className='py-2'>
                        <CCol>
                            <CRow>
                                <CCol>
                                    <h5 className="card-title mb-0">
                                        Transport Type And Dispatcher
                                    </h5>
                                </CCol>
                                <CCol className="d-none d-md-block text-end">
                                    <CIcon
                                        icon={cilPlus}
                                        className="me-2 text-default"
                                        size="xl"
                                        onClick={handleCreateTransportArrangmentType}
                                    />
                                </CCol>
                            </CRow>
                            <SmartTable
                                data={Dashboard?.listTransportArragementType}
                                columns={transportTypeAndDispatcherColumns}
                                minHeight={200}
                            // filterValue={filterValue}
                            />
                        </CCol>
                    </CRow>
                    <br />
                    <br />
                    <CRow className='py-2'>
                        <CCol>
                            <CRow>
                                <CCol>
                                    <h5 className="card-title mb-0">
                                        Service Charge
                                    </h5>
                                </CCol>
                                <CCol className="d-none d-md-block text-end">
                                    <CIcon
                                        icon={cilPlus}
                                        className="me-2 text-default"
                                        size="xl"
                                        onClick={handleCreateServiceCharge}
                                    />
                                </CCol>
                            </CRow>
                            <SmartTable
                                data={Dashboard?.listTransportArragementSc}
                                columns={serviceChargeColumns}
                                minHeight={200}
                            // filterValue={filterValue}
                            />
                        </CCol>
                    </CRow>
                    <br />
                    <CRow className='py-2'>
                        <CCol className='text-end'>
                            <CButton onClick={() => handleConfirm("confirm")} color="success">Confirm</CButton>
                            <CButton onClick={() => handleConfirm("cancel")} color="secondary">Cancel</CButton>
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
                    <CModalTitle>Add Transport Type and Dispatcher</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        <CFormLabel className="col-sm-2 col-form-label">Transport Type <code>(*)</code></CFormLabel>
                        <CCol sm={10}>
                            <CFormSelect
                                name="transportType"
                                options={transportType}
                                onChange={handleOnchange}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-sm-2 col-form-label">Dispatcher <code>(*)</code></CFormLabel>
                        <CCol sm={10}>
                            <CFormSelect
                                name="dispatcher"
                                options={dispatcher}
                                onChange={handleOnchange}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={handleAddTransportType} color="secondary">Add</CButton>
                </CModalFooter>
            </CModal>
            <CModal
                size="lg"
                visible={openModalSc}
                onClose={() => setOpenModalSc(false)}
                alignment='center'
            >
                <CModalHeader>
                    <CModalTitle>Additonal Service Charge</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <SmartTable
                                data={Dashboard?.listOrdeRequestAdditionalService}
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

export default TransportArragmentDetail