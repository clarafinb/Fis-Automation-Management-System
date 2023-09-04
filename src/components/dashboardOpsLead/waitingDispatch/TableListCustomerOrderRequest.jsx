import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid';
import { formatStandartDate } from 'src/helper/globalHelper';

function TableListCustomerOrderRequest({
    data,
    handleComponent,
    handleToogle
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
            field: 'transportArrRefId',
            headerName: 'Arrangement Ref Id',
        },
        {
            field: 'deliveryMode',
            headerName: 'Delivery Mode',
        },
        {
            field: 'transportMode',
            headerName: 'Transport Mode',
        },
        {
            field: 'orderReqNo',
            headerName: 'Cust Order Req No',
        },
        {
            field: 'requestorName',
            headerName: 'Customer Requestor',
        },
        {
            field: 'origin',
            headerName: 'Origin',
        },
        {
            field: 'destination',
            headerName: 'Destination',
        },
        {
            field: 'pickandpackCompleteDate',
            headerName: 'Pick And Pack Complete Date',
            headerStyle: { textAlign: 'center' },
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.pickandpackCompleteDate)
            }
        },
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

export default TableListCustomerOrderRequest;
