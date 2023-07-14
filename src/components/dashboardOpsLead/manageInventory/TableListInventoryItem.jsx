import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'

function TableListInventoryItem({
    data,
    handleComponent,
    handleToogle
}) {
    const filterValue = [
        { name: 'materialCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'materialDesc', operator: 'startsWith', type: 'string', value: '' },
        { name: 'totalInboundQTY', operator: 'startsWith', type: 'string', value: '' },
        { name: 'onHandQTY', operator: 'startsWith', type: 'string', value: '' },
        { name: 'totalBookedQTY', operator: 'startsWith', type: 'string', value: '' },
        { name: 'totalOutboundQTY', operator: 'startsWith', type: 'string', value: '' },
        { name: 'balanceQTY', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number', textAlign: 'center' },
        { name: 'materialCode', header: 'Item Code', defaultWidth: 230, textAlign: 'center' },
        { name: 'materialDesc', header: 'Item Desc', defaultWidth: 230, textAlign: 'center' },
        { name: 'totalInboundQTY', header: 'Inbound QTY', defaultWidth: 250, textAlign: 'center' },
        { name: 'onHandQTY', header: 'On Hand QTY', defaultWidth: 230, textAlign: 'center' },
        { name: 'totalBookedQTY', header: 'Booked QTY', defaultWidth: 230, textAlign: 'center' },
        { name: 'totalOutboundQTY', header: 'Outbound QTY', defaultWidth: 250, textAlign: 'center' },
        { name: 'balanceQTY', header: 'Balance Qty', defaultWidth: 250, textAlign: 'center' },
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

export default TableListInventoryItem;
