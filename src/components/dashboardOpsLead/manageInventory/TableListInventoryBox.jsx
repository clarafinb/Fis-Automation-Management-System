import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid';

function TableListInventoryBox({
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
        { field: 'materialCode', headerName: 'Item Code', minWidth: 200, },
        { field: 'materialDesc', headerName: 'Item Desc', minWidth: 200 },
        { field: 'totalInboundQTY', headerName: 'Inbound QTY', minWidth: 200 },
        { field: 'onHandQTY', headerName: 'On Hand QTY', minWidth: 200 },
        { field: 'totalBookedQTY', headerName: 'Booked QTY', minWidth: 200 },
        { field: 'totalOutboundQTY', headerName: 'Outbound QTY', minWidth: 200 },
        { field: 'balanceQTY', headerName: 'Balance Qty', minWidth: 200 },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                    minHeight={300}
                />
            </CCol>
        </CRow>
    )
}

export default TableListInventoryBox;
