import React, { useState } from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react';
import { formatStandartDate } from 'src/helper/globalHelper';
import CIcon from '@coreui/icons-react';
import { cilImage, cilLink, cilPencil, cilTrash } from '@coreui/icons';
import { useRedux } from 'src/utils/hooks'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import ExpandTable from 'src/components/custom/table/ExpandTable';
import Swal from 'sweetalert2'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile';

function TableListFinalCompleteCostTransportDelivery({
    data,
    transportArrangmentId
}) {
    const { dispatch, Global } = useRedux()
    const [modalUpload, setModalUpload] = useState(false)
    const [selectedData, setSelectedData] = useState({})

    const handleComponent = (action, data) => {
        setSelectedData(data)
        if (action === 'deleteCostTransport') {
            dispatch(
                actions.transportArrangementDeleteFinalCostTransport(
                    data.transportArrangementCostId,
                    Global?.user?.userID
                )
            ).then(resp => {
                dispatch(actions.getListFinalConfirmCostTransportDelivery(transportArrangmentId))
            })
        }

        if (action === 'unlinkCostTransport') {
            setModalUpload(true)

        }

        if (action === 'detailImage') {
            window.open(data.attachmentURL, '_blank');
        }

        if (action === 'deleteFile') {
            dispatch(
                actions.transportArrangementFinalCostTransportDeleteAttachment(
                    data.transportArrangementAddCostAttachmentId,
                    Global?.user?.userID
                )
            ).then(resp => {
                dispatch(actions.getListFinalConfirmCostTransportDelivery(transportArrangmentId))
            })
        }
    }

    const formatDetailData = (data = []) => {

        if (data.length === 0) return data

        const result = data.map((row, index) => {
            return {
                no: index + 1,
                ...row
            }
        })
        return result
    }

    const actionFormatter = (cell, row) => {
        return (
            <>
                <CButton
                    className='colorBtnIcon-blue p-1 me-2'
                >
                    <CIcon
                        icon={cilLink}
                        className=""
                        title='Add Attachment'
                        onClick={() =>
                            handleComponent("unlinkCostTransport", row)
                        }
                    />
                </CButton>
                <CButton
                    className='colorBtnIcon-red p-1 me-2'
                >
                    <CIcon
                        icon={cilTrash}
                        className=""
                        onClick={() =>
                            handleComponent("deleteCostTransport", row)
                        }
                    />
                </CButton>
            </>
        )
    }

    const actionFormatterDetail = (cell, row) => {
        return (
            <>
                <CButton
                    className='colorBtnIcon-black p-1 me-2'
                >
                    <CIcon
                        icon={cilImage}
                        className=""
                        onClick={() =>
                            handleComponent("detailImage", row)
                        }
                    />
                </CButton>
                <CButton
                    className='colorBtnIcon-red p-1 me-2'
                >
                    <CIcon
                        icon={cilTrash}
                        className=""
                        onClick={() =>
                            handleComponent("deleteFile", row)
                        }
                    />
                </CButton>
            </>
        )
    }

    const handleUploadFile = (formData) => {

        if (formData) {
            dispatch(actions.transportArrangementFinalCostTransportAddAttachment(
                formData,
                selectedData.transportArrangementCostId,
                Global?.user?.userID
            )).then(status => {
                if (status === 'success') {
                    dispatch(actions.getListFinalConfirmCostTransportDelivery(transportArrangmentId))
                }
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

    const columns = [
        {
            dataField: 'no',
            text: 'No',
            align: 'center',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: '#f8f8f8',
                width: '5%',
            },
        },
        {
            dataField: 'orderReqNo',
            text: 'Cust Order Request No',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: '#f8f8f8'
            }
        },
        {
            dataField: 'serviceCharge',
            text: 'Service Charge',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: '#f8f8f8'
            }

        },
        {
            dataField: 'serviceCost',
            text: 'Total Cost',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: '#f8f8f8'
            }

        },
        {
            dataField: 'transportArrangementCostId',
            text: 'Action',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: '#f8f8f8'
            },
            align: 'center',
            formatter: actionFormatter
        }
    ];

    const columnsExpand = [
        {
            dataField: 'no',
            text: 'No',
            align: 'center',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: '#f8f8f8',
                width: '5%',
            },
        },
        {
            dataField: 'fileName',
            text: 'Filename',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: '#f8f8f8'
            }
        },
        {
            dataField: 'modifiedUser',
            text: 'Upload By',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: '#f8f8f8'
            },
        },
        {
            dataField: 'lmdt',
            text: 'Upload Date',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: '#f8f8f8'
            },
            formatter: (row) => {
                return formatStandartDate(row.lmdt)
            }
        },
        {
            dataField: 'transportArrangementAddCostAttachmentId',
            text: 'Action',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: '#f8f8f8'
            },
            align: 'center',
            formatter: actionFormatterDetail
        }
    ]

    const expandRow = {
        renderer: row => (
            <div>
                <CRow>
                    <CCol className="d-none d-md-block text-start">
                        <ExpandTable
                            columns={columnsExpand}
                            data={formatDetailData(row.getAttachmentList)}
                        />
                    </CCol>
                </CRow>
            </div >
        ),
        showExpandColumn: true,
        expandByColumnOnly: true
    };

    return (
        <>
            <CRow>
                <CCol className="d-none d-md-block text-start">
                    <ExpandTable
                        columns={columns}
                        data={data}
                        expandRow={expandRow}
                    />
                </CCol>
            </CRow>

            <ModalUploadFile
                open={modalUpload}
                setOpen={setModalUpload}
                handleUpload={handleUploadFile}
                useTemplate={false}
            />
        </>
    )
}

export default TableListFinalCompleteCostTransportDelivery;
