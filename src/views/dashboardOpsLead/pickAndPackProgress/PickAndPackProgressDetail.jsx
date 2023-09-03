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
    CInputGroupText,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane
} from '@coreui/react'

import * as actions_dashboard from '../../../config/redux/Dashboard/actions'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSpreadsheet } from '@coreui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import Alert from 'src/components/custom/toast/Alert'
import { downloadFileConfig, handleDecimalsOnValue } from 'src/helper/globalHelper'
import ModalListItem from 'src/components/dashboardOpsLead/pickAndPackProgress/ModalListItem'
import OrderRequestDetailPickAndPackProgressDetail from 'src/components/dashboardOpsLead/pickAndPackProgress/OrderRequestDetailPickAndPackProgress'
import ModalAdditionalService from 'src/components/dashboardOpsLead/pickAndPackProgress/ModalAdditionalService'
import TableListAddtionalServiceCharge from 'src/components/dashboardOpsLead/pickAndPackProgress/TableListAddtionalServiceCharge'
import TableListItemInventory from 'src/components/dashboardOpsLead/pickAndPackProgress/TableListItemInventory'
import TableListItemReserved from 'src/components/dashboardOpsLead/pickAndPackProgress/TableListItemReserved'

function PickAndPackProgressDetail() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [orderReqId, setOrderReqId] = useState("")
    const [warehouseId, setWarehouseId] = useState("");
    const [openModal, setOpenModal] = useState(false)
    const [itemOrderRequestData, setItemOrderRequestData] = useState([])
    const [transportMode, setTrasportMode] = useState([])
    const [deliveryRequest, setDeliveryRequest] = useState([])
    const [selectedTransportMode, setSelectedTransportMode] = useState({});
    const [selectedDeliveryRequest, setSelectedDeliveryRequest] = useState({});
    const [openModalAdditionalService, setOpenModalAdditionalService] = useState(false)
    const [serviceChargeData, setServiceChargeData] = useState([])
    const [values, setValues] = useState({})
    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)
    const { pathname } = useLocation();
    const [activeKey, setActiveKey] = useState(1)
    const [btnConfirm, setBtnConfirm] = useState(false)
    const [itemReservedData, setItemReservedData] = useState([])

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const orId = pathname.split('/')[5]

        setOrderReqId(orId)
        setProjectId(pId)
        setWarehouseId(wId)

        if (Global?.user?.userID) {

            dispatch(
                actions_dashboard.getSelectActiveTransport()
            ).then(result => {
                setTrasportMode(result)
            })
            dispatch(
                actions.getReservedStatusComplete(orId)
            ).then(result => {
                if (result[0].hasReservedStatus === 'Completed') {
                    setBtnConfirm(true)
                }
            })

            dispatch(actions.getOrderRequestServiceCharge(orId))


            dispatch(
                actions.getOrderRequestItemList(orId)
            ).then(result => {
                setItemOrderRequestData(result)
            })


            dispatch(
                actions.getOrderRequestDetail(orId)
            ).then(result => {
                setOrderReqDetail(result[0])
            })

            dispatch(
                actions.getItemReservedData(orId)
            ).then(result => {
                setItemReservedData(result)
            })

        }
    }, [Global?.user?.userID, activeKey]);

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

    const handleBack = () => {
        nav("/pick-pack-progress/" + projectId + "/" + warehouseId, { replace: true })
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

    const handleModalDetailItem = (orderReqId) => {
        dispatch(actions.getOrderRequestItemList(orderReqId))
            .then(result => {
                setItemOrderRequestData(result)
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

    const handleOnchange = useCallback(
        (e) => {
            let { value, name } = e.target;
            if (name === 'totalVolume' || name === 'totalCollies') {
                value = handleDecimalsOnValue(value)
            }
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleExportExcelItemRequest = () => {
        dispatch(
            actions.orderRequestItemExcel(orderReqId, orderReqDetail?.custOrderRequest)
        ).then(resp => {
            downloadFileConfig(resp, 'item_request_' + Date.now() + 'xlsx')
        })
    }

    const handleExportExcelItemReserved = () => {
        dispatch(
            actions.orderRequestItemReservedExcel(orderReqId, orderReqDetail?.custOrderRequest)
        ).then(resp => {
            downloadFileConfig(resp, 'item_reserved_' + Date.now() + 'xlsx')
        })
    }

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

                            <CNav variant="tabs" className='mb-4'>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                    >
                                        Order Request Detail
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                    >
                                        Item Request
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 3}
                                        onClick={() => setActiveKey(3)}
                                    >
                                        Item Reserved
                                    </CNavLink>
                                </CNavItem>
                            </CNav>


                            <CTabContent>

                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                    <OrderRequestDetailPickAndPackProgressDetail
                                        data={orderReqDetail}
                                    />
                                </CTabPane>

                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                                    <CButton className="colorBtn-white mb-2" onClick={handleExportExcelItemRequest}>
                                        <CIcon icon={cilSpreadsheet} className="me-2 text-success" />
                                        EXPORT TO EXCEL
                                    </CButton>
                                    <TableListItemInventory
                                        data={itemOrderRequestData}
                                    />
                                </CTabPane>

                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                                    <CButton className="colorBtn-white mb-2" onClick={handleExportExcelItemReserved}>
                                        <CIcon icon={cilSpreadsheet} className="me-2 text-success" />
                                        EXPORT TO EXCEL
                                    </CButton>
                                    <TableListItemReserved
                                        data={itemReservedData}
                                    />
                                </CTabPane>

                            </CTabContent>

                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol>
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
                                                className="col-form-label">Total Item Request
                                            </CFormLabel>
                                            <CCol md={3}>
                                                <CInputGroup>
                                                    <CFormInput
                                                        readOnly
                                                        disabled
                                                        value={orderReqDetail?.totalItem}
                                                    />
                                                    <CInputGroupText>
                                                        <CButton color="black" size='sm'>
                                                            <FontAwesomeIcon
                                                                icon={faSearch}
                                                                className='px-2'
                                                                title='Item List'
                                                                size='lg'
                                                                onClick={() =>
                                                                    handleModalDetailItem(orderReqId)
                                                                }
                                                            />
                                                        </CButton>
                                                    </CInputGroupText>
                                                </CInputGroup>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-4">
                                            <CFormLabel className="col-form-label">Transport Mode Final</CFormLabel>
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
                                                    type="text"
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
                                                    type="text"
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
                                                <CButton className="colorBtn-white mb-3" onClick={handleCreateAdditionalService}>
                                                    <CIcon icon={cilPlus} className="me-2 text-warning" />
                                                    ADD ADDTIONAL SERVICE CHARGE
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                        <CCol className="d-none d-md-block text-end">
                                            <TableListAddtionalServiceCharge
                                                data={DashboardOpsLead?.listOrdeRequestAdditionalService}
                                                handleDeleteAddService={handleDeleteAddService}
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
                                                {
                                                    btnConfirm ?
                                                        <ButtonSubmit
                                                            label='CONFIRM'
                                                            type="submit"
                                                            className='me-2'
                                                        />
                                                        :
                                                        ''
                                                }
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

            <ModalAdditionalService
                open={openModalAdditionalService}
                setOpen={setOpenModalAdditionalService}
                serviceChargeData={serviceChargeData}
                handleChangeQty={handleChangeQty}
                handleComponentQty={handleComponentQty}
            />

            <ModalListItem
                open={openModal}
                setOpen={setOpenModal}
                data={itemOrderRequestData}
            />
        </>
    )
}

export default PickAndPackProgressDetail