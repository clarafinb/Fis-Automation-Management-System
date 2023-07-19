import React from 'react'
import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'

function TableListItemInventory({
    data,
    handleComponent,
    handleToogle
}) {
    const filterValue = [
        { name: 'itemCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'itemDesc', operator: 'startsWith', type: 'string', value: '' },
        { name: 'uom', operator: 'startsWith', type: 'string', value: '' },
        { name: 'itemQty', operator: 'startsWith', type: 'string', value: '' },
        { name: 'balanceQTY', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'NO', defaultWidth: 80, type: 'number', textAlign: 'center' },
        { name: 'itemCode', header: 'ITEM CODE', defaultWidth: 120, textAlign: 'center' },
        { name: 'itemDesc', header: 'ITEM DESC', defaultFlex: 1, textAlign: 'center' },
        { name: 'uom', header: 'UOM', defaultWidth: 100, textAlign: 'center' },
        { name: 'itemQty', header: 'REQ QTY', defaultWidth: 120, textAlign: 'center' },
        { name: 'balanceQTY', header: 'BALANCE QTY', defaultWidth: 140, textAlign: 'center' }
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <SmartTable
                    data={data}
                    columns={columns}
                    filterValue={filterValue}
                    minHeight={300}
                />
            </CCol>
        </CRow>
    )
}

export default TableListItemInventory;
