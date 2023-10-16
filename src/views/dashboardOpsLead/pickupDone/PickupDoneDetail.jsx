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
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane
} from '@coreui/react'

import * as actions from '../../../config/redux/DashboardOpsLead/actions'

import { useLocation, useNavigate } from 'react-router-dom'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import { handleDecimalsOnValue } from 'src/helper/globalHelper'
import OrderRequestDetailPickupDoneDetail from 'src/components/dashboardOpsLead/pickupDone/OrderRequestDetailPickAndPackProgressDetail'
import TableListItemInventory from 'src/components/dashboardOpsLead/pickupDone/TableListItemInventory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRefresh, faUpload } from '@fortawesome/free-solid-svg-icons'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'
import ModalBoxRequest from 'src/components/dashboardOpsLead/pickAndPackPending/ModalBoxRequest'
import Swal from 'sweetalert2'
import DeliveryArrangement from 'src/components/dashboardOpsLead/pickupDone/DeliveryArrangement'

import ModalOpenMap from 'src/components/dashboard/masterWarehouse/warehouse/ModalOpenMap'
import TableListHoDocument from 'src/components/dashboardOpsLead/deliveryComplete/TableListHoDocument'
import ModalImageHo from 'src/components/dashboardOpsLead/deliveryComplete/ModalImageHo'

function PickupDoneDetail() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [orderReqDetail, setOrderReqDetail] = useState({})
    const [projectId, setProjectId] = useState("")
    const [orderReqId, setOrderReqId] = useState("")
    const [warehouseId, setWarehouseId] = useState("");

    const [values, setValues] = useState({})

    const { pathname } = useLocation();
    const [activeKey, setActiveKey] = useState(1)

    const [openModalUpload, setOpenModalUpload] = useState(false)

    const [confirmStatus, setConfirmStatus] = useState(false)

    const [templateUrl, setTemplateUrl] = useState("")
    const [templateName, setTemplateName] = useState("")

    const [openModalBoxRequest, setOpenModalBoxRequest] = useState(false)

    const [mapKey, setMapKey] = useState(Date.now())
    const [modalImage, setModalImage] = useState(false)
    const [modalMap, setModalMap] = useState(false)

    const [url, setUrl] = useState("")

    const [selectedData, setSelectedData] = useState({})

    useEffect(() => {
        const pId = pathname.split('/')[2]
        const wId = pathname.split('/')[3]
        const orId = pathname.split('/')[5]
        const uri = pathname.split('/')[1]

        setOrderReqId(orId)
        setProjectId(pId)
        setWarehouseId(wId)
        setUrl(uri)


        if (Global?.user?.userID) {
            refreshData(orId, wId, DashboardOpsLead?.listOrderReqItemWithInventory)

            if (activeKey === 3) dispatch(actions.getListHoDocument(orId))

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        Global?.user?.userID,
        activeKey,
        DashboardOpsLead?.listOrderReqItemWithInventory.length
    ]);


    const refreshData = (orderReqId, whId, listItem) => {
        dispatch(
            actions.getOrderRequestDetail(orderReqId)
        ).then(result => {
            setOrderReqDetail(result[0])
            dispatch(actions.getOrderRequestItemListWithInventory(
                orderReqId,
                whId,
                result[0]?.inboundType
            )).then(() => {
                validateBtnConfirmStatus(listItem)
            })
        })
    }

    const validateBtnConfirmStatus = (listItem = []) => {
        if (listItem.length > 0) {
            const res = listItem
                .filter(row => row.balanceQTY < 0)

            if (res.length > 0 && listItem.length === 0) {
                setConfirmStatus(false)
            }

            if (res.length === 0 && listItem.length === 0) {
                setConfirmStatus(false)
            }

            if (res.length === 0 && listItem.length > 0) {
                setConfirmStatus(true)
            }

        } else {
            setConfirmStatus(false)
        }
    }

    const handleBack = () => {
        nav("/" + url + "/" + projectId + "/" + warehouseId, { replace: true })
    }

    const handleComponent = useCallback(
        (action, orderReqId) => {

            switch (action) {
                case 'reset':

                    dispatch(
                        actions.resetPickAndPackprogress(orderReqId, projectId, warehouseId, Global.user.userID)
                    ).then(() => {
                        refreshData(orderReqId, warehouseId)
                    })
                    break;

                case 'upload':

                    setOpenModalUpload(true)
                    dispatch(
                        actions.getMassUploadTemplateOrderReqItemBulkUpload()
                    ).then(response => {
                        setTemplateName(response?.templateName)
                        setTemplateUrl(response?.templateURL)
                    })
                    break;

                case 'addBoxRequest':
                    handleOpenModalBoxRequest()
                    break;

                default:
                    alert('undifined actions')
                    break;
            }
        }
    )

    const handleComponentHoDocument = useCallback(
        (type, data) => {
            setSelectedData(data)
            if (type === "map") {
                setModalMap(true)
                setMapKey(Date.now())
            } else if (type === "image") {
                setModalImage(true)
            }
        }
    )

    const handleDownloadTemplate = () => {
        window.open(templateUrl, '_blank')
    }

    const handleConfirm = (event) => {

        event.preventDefault()
        event.stopPropagation()

        const payload = {
            orderReqId: orderReqId,
            totalCollies: values?.totalCollies,
            totalVolume: values?.totalVolume,
            LMBY: Global?.user?.userID
        }

        dispatch(actions.completePickupDone(payload))
            .then(status => {
                if (status === 'success') handleBack()
            })
    }

    const handleUploadFile = (formData) => {
        if (formData) {
            dispatch(
                actions.uploadOrderReqItemPickAndPackProgress(
                    formData,
                    orderReqId
                )
            ).then(() => {
                refreshData(orderReqId, warehouseId)
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'File Empty !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const handleOpenModalBoxRequest = () => {
        setOpenModalBoxRequest(true)
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

    return (
        <>
            <CRow className='py-2'>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>PI</span>CKUP DONE & WAITING FINAL HO
                    </h4>
                </CCol>
            </CRow>
            <CCard className='mt-3 mb-3'>
                <CCardBody>
                    <CRow className='m-2'>
                        <CCol sm={8}>
                            <CNav variant="underline" className='mb-3'>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                    >
                                        <p className={activeKey === 1 ? 'text-underline-tab' : ''}>PICKUP REQUEST DETAIL</p>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                    >
                                        <p className={activeKey === 2 ? 'text-underline-tab' : ''}>DELIVERY ARRANGEMENT</p>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeKey === 3}
                                        onClick={() => setActiveKey(3)}
                                    >
                                        <p className={activeKey === 3 ? 'text-underline-tab' : ''}>HO COMPLETE</p>
                                    </CNavLink>
                                </CNavItem>
                            </CNav>


                            <CTabContent>

                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                    <OrderRequestDetailPickupDoneDetail
                                        data={orderReqDetail}
                                    />
                                </CTabPane>

                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                                    <DeliveryArrangement
                                        data={orderReqDetail}
                                    />
                                </CTabPane>

                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                                    <TableListHoDocument
                                        data={DashboardOpsLead?.listHoDocument}
                                        handleComponent={handleComponentHoDocument}
                                    />
                                </CTabPane>

                            </CTabContent>
                        </CCol >
                        <CCol>
                            <CRow className='ms-1 mb-3 mt-2'>
                                <CCol>
                                    <p className="card-title mb-0">
                                        <span className='text-underline'>TO</span>TAL ITEM REQUEST
                                    </p>
                                </CCol>
                            </CRow>
                            <CForm onSubmit={handleConfirm}>
                                <CRow className='ms-1'>
                                    <CCol>
                                        <CRow className="mb-4">
                                            <CCol md={2}>
                                                <CFormInput
                                                    type="text"
                                                    name="totalItem"
                                                    value={orderReqDetail?.totalItem}
                                                    readOnly
                                                    disabled
                                                />
                                            </CCol>
                                            {
                                                orderReqDetail?.inboundType === 'ITEM' ?
                                                    <CCol>
                                                        {
                                                            orderReqDetail?.totalItem > 0 ?
                                                                <CButton className='colorBtnIcon-black p-1 me-2'>
                                                                    <FontAwesomeIcon
                                                                        icon={faRefresh}
                                                                        className='textWhite px-2 mt-1'
                                                                        title='Reset'
                                                                        size='lg'
                                                                        onClick={() =>
                                                                            handleComponent('reset', orderReqId)
                                                                        }
                                                                    />
                                                                </CButton>
                                                                : ''
                                                        }
                                                        <CButton className='colorBtnIcon-black p-1'>
                                                            <FontAwesomeIcon
                                                                icon={faUpload}
                                                                className='textWhite px-1 mt-1'
                                                                title='Upload'
                                                                size='lg'
                                                                onClick={() =>
                                                                    handleComponent('upload')
                                                                }
                                                            />
                                                        </CButton>
                                                    </CCol>
                                                    : ''
                                            }
                                            {
                                                orderReqDetail?.inboundType === 'BOX' ?
                                                    <CCol>
                                                        <CButton className='colorBtnIcon-black p-1 me-2'>
                                                            <FontAwesomeIcon
                                                                icon={faPlus}
                                                                className='textWhite px-1 mt-1'
                                                                title='Add Box Request'
                                                                size='lg'
                                                                onClick={() =>
                                                                    handleComponent('addBoxRequest')
                                                                }
                                                            />
                                                        </CButton>
                                                        {
                                                            orderReqDetail?.totalItem > 0 ?
                                                                <CButton className='colorBtnIcon-black p-1 me-2'>
                                                                    <FontAwesomeIcon
                                                                        icon={faRefresh}
                                                                        className='textWhite px-2 mt-1'
                                                                        title='Reset'
                                                                        size='lg'
                                                                        onClick={() =>
                                                                            handleComponent('reset', orderReqId)
                                                                        }
                                                                    />
                                                                </CButton>
                                                                : ''
                                                        }
                                                    </CCol>
                                                    : ''
                                            }
                                        </CRow>
                                        <CRow>
                                            <CCol>
                                                <p className="card-title mb-0">
                                                    <span className='text-underline'>IT</span>EM LIST
                                                </p>
                                            </CCol>
                                        </CRow>
                                        <CCol className="d-none d-md-block text-end py-3">
                                            <TableListItemInventory
                                                data={DashboardOpsLead?.listOrderReqItemWithInventory}
                                            />
                                        </CCol>
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
                                        <CRow className='mt-3'>
                                            <CCol className="d-none d-md-block text-end" md={12}>
                                                {
                                                    confirmStatus === true ?
                                                        <>
                                                            <ButtonSubmit
                                                                label='CONFIRM'
                                                                type='submit'
                                                                className='me-2'
                                                            />
                                                        </>
                                                        : ''
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
                        </CCol >
                    </CRow >
                </CCardBody>
            </CCard>

            <ModalUploadFile
                open={openModalUpload}
                setOpen={setOpenModalUpload}
                handleDownloadTemplate={handleDownloadTemplate}
                templateName={templateName}
                handleUpload={handleUploadFile}
            />

            <ModalBoxRequest
                open={openModalBoxRequest}
                setOpen={setOpenModalBoxRequest}
                whId={warehouseId}
                orderReqId={orderReqId}
                refreshData={refreshData}
            />

            {/* MODAL MAP */}
            <ModalOpenMap
                open={modalMap}
                setOpen={setModalMap}
                data={selectedData}
                key={mapKey}
            />
            {/* MODAL IMAGES */}
            <ModalImageHo
                open={modalImage}
                setOpen={setModalImage}
                data={selectedData}
            />
        </>
    )
}

export default PickupDoneDetail