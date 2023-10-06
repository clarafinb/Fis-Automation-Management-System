import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid';
import { formatStandartDate } from 'src/helper/globalHelper'

function TableListInventoryDetailItem({
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
        {
            field: 'materialCode',
            headerName: 'Item Code',
            minWidth: 200,
        },
        {
            field: 'materialDesc',
            headerName: 'Item Desc',
            minWidth: 200
        },
        {
            field: 'packingList',
            headerName: 'Packing List',
            minWidth: 200
        },
        {
            field: 'itemLocation',
            headerName: 'Item Location',
            minWidth: 200
        },
        {
            field: 'transactionDate',
            headerName: 'Transaction Date',
            minWidth: 200,
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.transactionDate)
            }
        },
        {
            field: 'inboundQTY',
            headerName: 'Inbound QTY',
            minWidth: 200
        },
        {
            field: 'reservedQTY',
            headerName: 'Reserved Qty',
            minWidth: 200
        },
        {
            field: 'outboundQTY',
            headerName: 'Outbound Qty',
            minWidth: 200
        },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                    minHeight={500}
                />
            </CCol>
        </CRow>
    )
}

export default TableListInventoryDetailItem;
