import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormLabel,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'

import * as actions from '../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import TableListCustomerOrderRequestList from 'src/components/dashboardOpsLead/waitingDispatch/TableListCustomerOrderRequestList'
import TableListTransportTypeAndDispatcher from 'src/components/dashboardOpsLead/waitingDispatch/TableListTransportTypeAndDispatcher'
import TableListServiceCharge from 'src/components/dashboardOpsLead/waitingDispatch/TableListServiceCharge'
import ModalAdditionalServiceCharge from 'src/components/dashboardOpsLead/waitingDispatch/ModalAdditionalServiceCharge'
import Select from 'react-select'
import Alert from 'src/components/custom/toast/Alert'

function TransportArragmentDetail() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [openModal, setOpenModal] = useState(false)
    const [openModalSc, setOpenModalSc] = useState(false)
    const [transportType, setTransportType] = useState([])
    const [dispatcher, setDispatcher] = useState([])
    const [param, setParam] = useState({})
    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)

    const [selectedTransportType, setSelectedTransportType] = useState({});
    const [selectedDispatcher, setSelectedDispatcher] = useState({});

    useEffect(() => {
        const split = window.location.href.split("/");
        setParam({
            transportArrangmentId: split[6],
            transportModeId: split[7],
            projectId: split[8],
            orderReqId: split[9],
            whId: split[10],
            url: `/${split[4]}/`
        })

        if (split[6] && Global?.user?.userID) {
            dispatch(actions.getOrderRequestTransportArrangment(split[6]))
            dispatch(actions.getTransportTypeArranged(split[6]))
            dispatch(actions.getTransportArrangmentServiceChargeList(split[6]))
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

    const handleCreateTransportArrangmentType = async () => {

        setSelectedDispatcher({})
        setSelectedTransportType({})

        let listTransportType = await dispatch(actions.getTransportTypeList(param?.transportModeId))
        let listDispatcher = await dispatch(actions.getDispatcherList(param?.transportArrangmentId, param?.projectId))

        setTransportType(listTransportType)
        setDispatcher(listDispatcher)

        setOpenModal(true)
    }

    const handleCreateServiceCharge = async () => {
        setOpenModalSc(true)
    }

    const handleAddTransportType = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            transportArrangmentId: param?.transportArrangmentId,
            transportTypeId: selectedTransportType?.value,
            mainDispatcherId: selectedDispatcher?.value,
            notes: "",
            LMBY: Global?.user?.userID
        }

        console.log(payload)

        const err = []

        if (payload.transportTypeId === undefined) err.push('Transport Type')
        if (payload.mainDispatcherId === undefined) err.push('Dispatcher')

        if (err.length > 0) {
            setErrMessage(err.join(' , '))
            setVisible(true)
        } else {
            dispatch(actions.addTransportArrangmentType(payload))
        }
    }

    const handleConfirm = (type) => {
        if (type == "confirm") {
            dispatch(actions.completeTransportArrangement(param?.transportArrangmentId, Global?.user?.userID))
            nav(param?.url + param?.projectId + "/" + param?.whId, { replace: true })
        } else {
            nav(param?.url + param?.projectId + "/" + param?.whId + "/detail/" + param?.orderReqId, { replace: true })
        }
    }

    const handleOnChangetransportType = (selectedTransportType) => {
        setSelectedTransportType(selectedTransportType);
    }

    const handleOnChangeDispatcher = (selectedDispatcher) => {
        setSelectedDispatcher(selectedDispatcher);
    }


    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                {["waiting-dispatch"].includes(param?.url)
                                    ? <span className='text-underline'>WAITING DELIVERY</span>
                                    : <span className='text-underline'>WAITING TRANSPORT ASSIGNMENT</span>
                                }

                            </h4>
                        </CCol>
                    </CRow>
                    <br />
                    <CRow>
                        <CCol>
                            <CRow>
                                <CCol>
                                    <h5 className="card-title mb-2">
                                        CUSTOMER ORDER REQUEST LIST
                                    </h5>
                                </CCol>
                            </CRow>
                            <TableListCustomerOrderRequestList
                                data={DashboardOpsLead?.listRequestTransportArragement}
                            />
                        </CCol>
                    </CRow>
                    <br />
                    <CRow className='py-2'>
                        <CCol>
                            <CRow>
                                <CCol>
                                    <h5 className="card-title mb-0">
                                        TRANSPORT TYPE AND DISPATCHER
                                    </h5>
                                </CCol>
                                <CCol className="d-none d-md-block text-end">
                                    <CButton
                                        className="colorBtn-white mb-2"
                                        onClick={handleCreateTransportArrangmentType}>
                                        <CIcon icon={cilPlus} className="me-2 text-warning" />
                                        ADD TRANSPORT TYPE AND DISPATCHER
                                    </CButton>
                                </CCol>
                            </CRow>
                            <TableListTransportTypeAndDispatcher
                                data={DashboardOpsLead?.listTransportArrangmentType}
                                handleComponent={handleComponent}
                            />
                        </CCol>
                    </CRow>
                    <br />
                    <CRow className='py-2'>
                        <CCol>
                            <CRow>
                                <CCol>
                                    <h5 className="card-title mb-0">
                                        SERVICE CHARGE
                                    </h5>
                                </CCol>
                                <CCol className="d-none d-md-block text-end">
                                    <CButton
                                        className="colorBtn-white mb-2"
                                        onClick={handleCreateServiceCharge}>
                                        <CIcon icon={cilPlus} className="me-2 text-warning" />
                                        ADD SERVICE CHARGE
                                    </CButton>
                                </CCol>
                            </CRow>
                            <TableListServiceCharge
                                data={DashboardOpsLead?.listTransportArragementSc}
                                handleComponent={handleComponent}
                            />
                        </CCol>
                    </CRow>
                    <br />
                    <CRow className='py-2'>
                        <CCol className='text-end'>
                            <ButtonSubmit
                                label='CONFIRM'
                                handleButton={() => handleConfirm("confirm")}
                                className='me-2'
                            />
                            <ButtonCancel
                                label='CANCEL'
                                handleButton={() => handleConfirm("cancel")}
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
                <CForm onSubmit={handleAddTransportType}>
                    <CModalHeader>
                        <CModalTitle>Add Transport Type and Dispatcher</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CRow className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label">Transport Type <code>(*)</code></CFormLabel>
                            <CCol sm={10}>
                                <Select
                                    className="input-select"
                                    options={transportType}
                                    isSearchable={true}
                                    value={selectedTransportType}
                                    onChange={handleOnChangetransportType}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label">Dispatcher <code>(*)</code></CFormLabel>
                            <CCol sm={10}>
                                <Select
                                    className="input-select"
                                    options={dispatcher}
                                    isSearchable={true}
                                    value={selectedDispatcher}
                                    onChange={handleOnChangeDispatcher}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <Alert
                                    message={errMessage}
                                    visible={visible}
                                    setVisible={setVisible}
                                />
                            </CCol>
                        </CRow>
                    </CModalBody>
                    <CModalFooter>
                        <ButtonSubmit type="submit" />
                    </CModalFooter>
                </CForm>
            </CModal>

            <ModalAdditionalServiceCharge
                open={openModalSc}
                setOpen={setOpenModalSc}
                data={param}
            />
        </>
    )
}

export default TransportArragmentDetail