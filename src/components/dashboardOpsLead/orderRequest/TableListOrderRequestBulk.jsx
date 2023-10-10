import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilClipboard, cilTrash } from '@coreui/icons';
import DataGrid from 'src/components/custom/table/DataGrid';
import { formatStandartDate } from 'src/helper/globalHelper';

function TableListOrderRequestBulk({
    data,
    handleComponent,
}) {

    const handleAction = (data) => {
        return (
            <>
                {data.detail.visibleCancelledFunction !== 0 ?
                    <CButton
                        className='colorBtnIcon-black p-1 me-2'
                        disabled
                    >
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

                <CButton
                    className='colorBtnIcon-red p-1'
                    disabled
                >
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
            field: 'custOrderRequest',
            headerName: 'ORDER REQUEST NO',
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
            field: 'siteId',
            headerName: 'SITE ID',
        },
        {
            field: 'transportReqType',
            headerName: 'TRANSPORT REQ TYPE',
        },
        {
            field: 'siteName',
            headerName: 'SITE NAME',
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
            field: 'orderReqId',
            headerName: 'ACTION',
            maxWidth: 100,
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

export default TableListOrderRequestBulk;
