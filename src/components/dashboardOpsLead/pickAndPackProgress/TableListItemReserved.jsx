import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid';

function TableListItemReserved({
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
            headerName: 'Item Code',
            minWidth: 150,
        },
        {
            field: 'itemDesc',
            headerName: 'Item Desc',
            minWidth: 200,
        },
        {
            field: 'uom',
            headerName: 'UOM',
            minWidth: 100,
        },
        {
            field: 'packingList',
            headerName: 'Packing List',
            headerStyle: { textAlign: 'center' },
            minWidth: 150,
        },
        {
            field: 'itemLocation',
            headerName: 'Item Location',
            cellStyle: { textAlign: 'center' },
            minWidth: 150,
        },
        {
            field: 'qtyOut',
            headerName: 'QTY Out',
            cellStyle: { textAlign: 'center' },
            minWidth: 150,
        },
        {
            field: 'transactionStatus',
            headerName: 'Status',
            cellStyle: { textAlign: 'center' },
            minWidth: 150,
        }
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

export default TableListItemReserved;
