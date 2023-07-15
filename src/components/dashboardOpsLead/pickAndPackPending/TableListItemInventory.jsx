import React from 'react'
import {
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
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number', textAlign: 'center' },
        { name: 'itemCode', header: 'Item Code', defaultWidth: 200, textAlign: 'center' },
        { name: 'itemDesc', header: 'Item Desc', defaultWidth: 200, textAlign: 'center' },
        { name: 'uom', header: 'UOM', defaultWidth: 200, textAlign: 'center' },
        { name: 'itemQty', header: 'Req QTY', defaultWidth: 200, textAlign: 'center' },
        {
            name: 'balanceQTY',
            header: 'Balance QTY',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value }) => {
                return (value > 0) ?
                    <p className="text-success">{value}</p>
                    :
                    <p className="text-danger">{value}</p>
            }
        },
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
