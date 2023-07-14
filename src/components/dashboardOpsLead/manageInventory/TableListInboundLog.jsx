import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import moment from 'moment'

function TableListInboundLog({
    data,
    handleComponent,
    handleToogle
}) {
    const filterValue = [
        { name: 'inboundFilename', operator: 'startsWith', type: 'string', value: '' },
        { name: 'inboundType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'recordDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'referenceNo', operator: 'startsWith', type: 'string', value: '' },
        { name: 'custOrderReqNo', operator: 'startsWith', type: 'string', value: '' },
        { name: 'materialCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'materialDesc', operator: 'startsWith', type: 'string', value: '' },
        { name: 'packingList', operator: 'startsWith', type: 'string', value: '' },
        { name: 'receivedQTY', operator: 'startsWith', type: 'string', value: '' },
        { name: 'totalVolume', operator: 'startsWith', type: 'string', value: '' },
        { name: 'uploadBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'uploadDate', operator: 'startsWith', type: 'string', value: '' }
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number' },
        { name: 'inboundFilename', header: 'Filename', defaultWidth: 230 },
        { name: 'inboundType', header: 'Inbound Type', defaultWidth: 230 },
        { name: 'createBy', header: 'Create By', defaultWidth: 250 },
        {
            name: 'createDate',
            header: 'Create Date',
            defaultWidth: 300,
            textAlign: 'center',
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        {
            name: 'recordDate',
            header: 'Record Date',
            defaultWidth: 300,
            textAlign: 'center',
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        { name: 'referenceNo', header: 'Reference Now', defaultWidth: 230 },
        { name: 'custOrderReqNo', header: 'Cust. Order Req No', defaultWidth: 230 },
        { name: 'materialCode', header: 'Item Code', defaultWidth: 230 },
        { name: 'materialDesc', header: 'Item Desc', defaultWidth: 230 },
        { name: 'packingList', header: 'Packing List', defaultWidth: 230 },
        { name: 'receivedQTY', header: 'Recieved Qty', defaultWidth: 230 },
        { name: 'totalVolume', header: 'Total Volume', defaultWidth: 230 },
        { name: 'uploadBy', header: 'Upload By', defaultWidth: 230 },
        {
            name: 'uploadDate',
            header: 'Upload Date',
            defaultWidth: 300,
            textAlign: 'center',
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
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

export default TableListInboundLog;
