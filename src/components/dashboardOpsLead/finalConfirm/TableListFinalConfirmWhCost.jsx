import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react';
import DataGrid from 'src/components/custom/table/DataGrid';

function TableListFinalConfirmWhCost({
    data,
    transportArrangmentId
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
            field: 'orderReqNo',
            headerName: 'Cust Order Request No',
        },
        {
            field: 'serviceCharge',
            headerName: 'Service Charge',
        },
        {
            field: 'serviceChargeCode',
            headerName: 'Service Charge Code',
        },
        {
            field: 'chargeFee',
            headerName: 'Charge Fee',
        },
        {
            field: 'qty',
            headerName: 'QTY',
        },
        {
            field: 'totalCharge',
            headerName: 'Total Charge',
        },

    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                    minHeight={350}
                />
            </CCol>
        </CRow>
    )
}

export default TableListFinalConfirmWhCost;
