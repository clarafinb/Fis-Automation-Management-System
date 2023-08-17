import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid';
import { formatStandartDate } from 'src/helper/globalHelper';

function TableListInboundLog({
    data,
}) {
    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            headerStyle: { textAlign: 'center' },
            cellStyle: { textAlign: 'center' },
            filter: false,
            minWidth: 80,
        },
        { field: 'inboundFilename', headerName: 'Filename' },
        { field: 'inboundType', headerName: 'Inbound Type', minWidth: 150 },
        { field: 'createBy', headerName: 'Create By', minWidth: 200 },
        {
            field: 'createDate',
            headerName: 'Create Date',
            minWidth: 200,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'recordDate',
            headerName: 'Record Date',
            minWidth: 200,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.recordDate)
            }
        },
        { field: 'referenceNo', headerName: 'Reference Now', minWidth: 230 },
        { field: 'custOrderReqNo', headerName: 'Cust. Order Req No', minWidth: 230 },
        { field: 'materialCode', headerName: 'Item Code', minWidth: 230 },
        { field: 'materialDesc', headerName: 'Item Desc', minWidth: 230 },
        { field: 'packingList', headerName: 'Packing List', minWidth: 230 },
        { field: 'receivedQTY', headerName: 'Recieved Qty', minWidth: 150 },
        { field: 'totalVolume', headerName: 'Total Volume', minWidth: 150 },
        { field: 'uploadBy', headerName: 'Upload By', minWidth: 230 },
        {
            field: 'uploadDate',
            headerName: 'Upload Date',
            minWidth: 300,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.uploadDate)
            }
        },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                    minHeight={600}
                />
            </CCol>
        </CRow>
    )
}

export default TableListInboundLog;
