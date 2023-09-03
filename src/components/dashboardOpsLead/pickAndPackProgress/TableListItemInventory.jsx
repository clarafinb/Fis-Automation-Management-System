import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid';

function TableListItemInventory({
    data
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
            field: 'itemCode',
            headerName: 'ITEM CODE',
            minWidth: 150,
        },
        {
            field: 'itemDesc',
            headerName: 'ITEM DESC',
            minWidth: 200,
        },
        {
            field: 'uom',
            headerName: 'UOM',
            minWidth: 150,
        },
        {
            field: 'itemQty',
            headerName: 'QTY REQUEST',
            minWidth: 150,
        },
        {
            field: 'totalQtyReserved',
            headerName: 'QTY RESERVED',
            cellStyle: { textAlign: 'center' },
            minWidth: 150,
        },
        {
            field: 'totalQtyOut',
            headerName: 'QTY OUT',
            headerStyle: { textAlign: 'center' },
            minWidth: 150,
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

export default TableListItemInventory;
