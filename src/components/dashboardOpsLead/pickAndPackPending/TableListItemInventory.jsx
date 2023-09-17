import React from 'react'
import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import DataGrid from 'src/components/custom/table/DataGrid';

function TableListItemInventory({
    data,
    handleComponent,
    handleToogle
}) {


    const handleBalanceQTY = (value) => {
        let badge = "dark"
        if (value < 0) badge = "danger"
        if (value > 0) badge = "success"
        return (
            <CBadge
                style={
                    { fontSize: 12 }
                }
                color={badge}
            >
                {value}
            </CBadge>
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
            minWidth: 100,
        },
        {
            field: 'itemQty',
            headerName: 'REQ QTY',
            headerStyle: { textAlign: 'center' },
            minWidth: 150,
        },
        {
            field: 'balanceQTY',
            headerName: 'BALANCE QTY',
            cellStyle: { textAlign: 'center' },
            minWidth: 200,
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return handleBalanceQTY(Number.parseInt(data?.balanceQTY))
            },
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

export default TableListItemInventory;
