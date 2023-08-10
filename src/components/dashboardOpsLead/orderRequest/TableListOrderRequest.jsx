import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import moment from 'moment';
import CIcon from '@coreui/icons-react';
import { cilClipboard, cilTrash } from '@coreui/icons';
import DataGrid from 'src/components/custom/table/DataGrid';
import { formatStandartDate } from 'src/helper/globalHelper';

function TableListOrderRequest({
    data,
    handleComponent,
    handleToogle
}) {

    const handleAction = (data) => {
        return (
            <>
                {data.detail.visibleCancelledFunction !== 0 ?
                    <CButton className='colorBtnIcon-black p-1 me-2'>
                        <CIcon
                            icon={cilClipboard}
                            className=""
                            title='Cancel'
                            onClick={() =>
                                handleComponent("cancel", data.orderReqId)
                            }
                        />
                    </CButton>
                    : ''}

                <CButton className='colorBtnIcon-red p-1'>
                    <CIcon
                        icon={cilTrash}
                        className=""
                        title='Delete'
                        onClick={() =>
                            handleComponent("delete", data.orderReqId)
                        }
                    />
                </CButton>
            </>
        )
    }

    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            headerStyle: { textAlign: 'center' },
            cellStyle: { textAlign: 'center' },
            filter: false,
            minWidth: 80,
        },
        {
            field: 'whCode',
            headerName: 'WH CODE',
        },
        {
            field: 'whName',
            headerName: 'WH NAME',
        },
        {
            field: 'custOrderRequest',
            headerName: 'CUST ORDER REQUEST',
        },
        {
            field: 'orderRequestDesc',
            headerName: 'ORDER REQ DESC',
        },
        {
            field: 'requestorName',
            headerName: 'REQUESTOR',
        },
        {
            field: 'orderRequestDate',
            headerName: 'ORDER REQUEST DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.orderRequestDate)
            }
        },
        {
            field: 'deliveryReqType',
            headerName: 'DELIVERY REQ TYPE',
        },
        {
            field: 'transportReqType',
            headerName: 'TRANSPORT REQ TYPE',
        },
        {
            field: 'origin',
            headerName: 'ORIGIN',
        },
        {
            field: 'destination',
            headerName: 'DESTINATION',
        },
        {
            field: 'orderRequestStatus',
            headerName: 'ORDER STATUS',
        },
        {
            field: 'cancelRemarks',
            headerName: 'CANCEL REMARKS',
        },
        {
            field: 'createBy',
            headerName: 'CREATE BY',
        },
        {
            field: 'createDate',
            headerName: 'CREATED DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'orderReqId',
            headerName: 'ACTION',
            minWidth: 100,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction(data)
            }
        },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                />
            </CCol>
        </CRow>
    )
}

export default TableListOrderRequest;
