import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid';

function TableListOutboundLog({
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
        { field: 'materialCode', headerName: 'Item Code', minWidth: 200 },
        { field: 'materialDesc', headerName: 'Item Desc', minWidth: 250 },
        { field: 'uom', headerName: 'UOM', minWidth: 100 },
        { field: 'packingList', headerName: 'Packing List', minWidth: 200 },
        { field: 'itemLocation', headerName: 'Item Location', minWidth: 250 },
        { field: 'qtyOut', headerName: 'Qty Out', minWidth: 150 },
        { field: 'custOrderReqNo', headerName: 'Cust Order Req No', minWidth: 250 }
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

export default TableListOutboundLog;
