import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate, useLocation } from 'react-router-dom'

import {
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow
} from '@coreui/react'

import * as actions from '../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faImage } from '@fortawesome/free-solid-svg-icons'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'
import Swal from 'sweetalert2'
import ModalEvidenceImage from 'src/components/dashboardOpsLead/waitingDispatch/ModalEvidenceImage'
import TableListCustomerOrderRequest from 'src/components/dashboardOpsLead/waitingDispatch/TableListCustomerOrderRequest'
import TableListHoEvidence from 'src/components/dashboardOpsLead/waitingDispatch/TableListHoEvidence'

function TransportHandCarryDetail() {
    const nav = useNavigate();
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [openModalUpload, setOpenModalUpload] = useState(false)
    const [modalImage, setModalImage] = useState(false)
    const [values, setValues] = useState({})
    const [param, setParam] = useState({})
    const [selectedEvidence, setSelectedEvidence] = useState({})
    const [selectedEvidenceImage, setSelectedEvidenceImage] = useState([])
    const [myLocation, setMyLocation] = useState({})
    const { pathname } = useLocation();

    useEffect(() => {
        const transArrId = pathname.split('/')[4]
        const transModId = pathname.split('/')[5]
        const pId = pathname.split('/')[6]
        const oId = pathname.split('/')[7]
        const wId = pathname.split('/')[8]
        getLocation()

        setParam({
            transportArrangementId: transArrId,
            transportModeId: transModId,
            projectId: pId,
            orderReqId: oId,
            whId: wId,
        })

        if (transArrId && Global?.user?.userID) {
            dispatch(actions.getOrderRequestTransportArrangment(transArrId))
            dispatch(actions.getTransportArrangementEvidenceCheclist(transArrId))
        }
    }, [Global?.user?.userID]);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    const showPosition = (position) => {
        setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
    }

    const handleModalImage = (data) => {
        setSelectedEvidenceImage(data)
        setModalImage(true)
    }

    const evidenceChecklistColumns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'checklistName', header: 'Checklist Name', defaultFlex: 2 },
        {
            name: 'checklistType',
            header: 'Evidence Collection',
            defaultFlex: 1,
            textAlign: 'center',
            render: ({ data }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faImage}
                            className='textBlue px-2'
                            title='Image Evidence'
                            size='xl'
                            onClick={() =>
                                handleModalImage(data.getEvidenceChecklists)
                            }
                        />
                    </>
                )
            }
        },
        {
            name: 'transportArrangementId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 200,
            render: ({ data }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faArrowUpFromBracket}
                            className='textBlue px-2'
                            title='Upload Evidence'
                            size='xl'
                            onClick={() =>
                                handleUpload(data)
                            }
                        />
                    </>
                )
            }
        },
    ]

    const handleOnchange = useCallback(
        (e) => {
            const { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleCreateEvidence = () => {
        const payload = {
            transportArrangementId: param.transportArrangementId,
            projectId: param.projectId,
            LMBY: Global.user.userID
        }
        dispatch(actions.transportArrangementCreateEvidence(payload))
    }

    const handleUpload = (data) => {
        setSelectedEvidence(data)
        setOpenModalUpload(true)
    }

    const handleUploadFile = (formData) => {
        if (formData) {
            const params = {
                transportArrangementId: selectedEvidence.transportArrangementId,
                assignmentId: selectedEvidence.assignmentId,
                deliveryEvidenceChecklistId: selectedEvidence.deliveryEvidenceChecklistId
            }

            dispatch(
                actions.transportAssignmentDeliveryEvidenceUpload(
                    params,
                    formData
                )
            )
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'File Empty !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const handleCancel = () => {
        nav("/dashboard-ops-lead/waiting-dispatch/" + param?.projectId + "/" + param?.whId + "/detail/" + param?.orderReqId, { replace: true })
    }

    const handleConfirm = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const payload = {
            transportArrangmentId: param?.transportArrangementId,
            LMBY: Global?.user?.userID,
            actualRecipientName: values?.actualRecipientName,
            notes: values?.notes,
            confirmLongitude: myLocation?.longitude?.toString(),
            confirmLatitude: myLocation?.latitude?.toString()
        }
        dispatch(
            actions.actDeliveryCompleteWithoutAssignment(payload)
        ).then(() => {
            nav("/dashboard-ops-lead/waiting-dispatch/" + param?.projectId + "/" + param?.whId + "/detail/" + param?.orderReqId, { replace: true })
        })
    }


    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Waiting Dispatch Hand Carry Detail
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
                            <TableListCustomerOrderRequest
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
                                        HO Evicence
                                    </h5>
                                </CCol>
                                <CCol className="d-none d-md-block text-end">
                                    {
                                        DashboardOpsLead.listEvidenceChecklist == 0 ?
                                            <CIcon
                                                icon={cilPlus}
                                                className="me-2 text-default"
                                                size="xl"
                                                onClick={handleCreateEvidence}
                                            />
                                            :
                                            ''
                                    }
                                </CCol>
                            </CRow>
                            <CCol>
                                {/* <SmartTable
                                    data={DashboardOpsLead?.listEvidenceChecklist}
                                    columns={evidenceChecklistColumns}
                                    minHeight={200}
                                /> */}
                                <TableListHoEvidence
                                    data={DashboardOpsLead?.listEvidenceChecklist}
                                    handleUpload={handleUpload}
                                    handleModalImage={handleModalImage}
                                />
                            </CCol>
                        </CCol>
                    </CRow>
                    <br />
                    <CForm onSubmit={handleConfirm}>
                        <CRow className='py-2'>
                            <CCol sm={6}>
                                <CRow>
                                    <CCol>
                                        <h5 className="card-title mb-0">
                                            Reciepent Info
                                        </h5>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol>
                                        <CRow className="mb-4">
                                            <CFormLabel
                                                className="col-form-label">Recipient Name <code>(*)</code>
                                            </CFormLabel>
                                            <CCol>
                                                <CFormInput
                                                    type="text"
                                                    name="actualRecipientName"
                                                    value={values?.actualRecipientName}
                                                    onChange={handleOnchange}
                                                    required
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-4">
                                            <CFormLabel
                                                className="col-form-label">Notes <code>(*)</code>
                                            </CFormLabel>
                                            <CCol>
                                                <CFormTextarea
                                                    rows={3}
                                                    name="notes"
                                                    value={values?.notes}
                                                    onChange={handleOnchange}
                                                    required
                                                />
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>

                            </CCol>
                        </CRow>
                        <br />
                        <CRow className='py-2'>
                            <CCol className='text-end'>
                                <ButtonSubmit
                                    label='CONFIRM'
                                    type='submit'
                                    // handleButton={() => handleConfirm("confirm")}
                                    className='me-2'
                                />
                                <ButtonCancel
                                    label='CANCEL'
                                    handleButton={handleCancel}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
            {/* modal */}
            <ModalUploadFile
                open={openModalUpload}
                setOpen={setOpenModalUpload}
                // handleDownloadTemplate={handleDownloadTemplate}
                // templateName={templateName}
                handleUpload={handleUploadFile}
            />

            {/* MODAL IMAGES */}
            <ModalEvidenceImage
                open={modalImage}
                setOpen={setModalImage}
                data={selectedEvidenceImage}
            />
        </>
    )
}

export default TransportHandCarryDetail