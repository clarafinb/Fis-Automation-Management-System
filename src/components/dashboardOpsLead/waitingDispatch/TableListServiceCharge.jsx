import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react';
import DataGrid from 'src/components/custom/table/DataGrid';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

function TableListServiceCharge({
    data,
    handleComponent
}) {

    const handleAction = (transportTypeArrangementId) => {
        return (
            <>
                <CButton className='colorBtnIcon-red p-1'>
                    <CIcon
                        icon={cilTrash}
                        title='Delete Service Charge'
                        onClick={() =>
                            handleComponent("delServiceCharge", transportTypeArrangementId)
                        }
                    />
                </CButton>
            </>
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
            field: 'serviceChargeCode',
            headerName: 'SVC Code',
            minWidth: 150,
        },
        {
            field: 'serviceCharge',
            headerName: 'SVC Desc',
            flex: 1,
        },
        {
            field: 'uom',
            headerName: 'UOM',
            minWidth: 250,
        },
        {
            field: 'serviceQty',
            headerName: 'QTY',
            minWidth: 150,
        },
        {
            field: 'transportArrangementServiceId',
            headerName: 'Action',
            filter: false,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            maxWidth: 150,
            cellRenderer: ({ data }) => {
                return handleAction(data.transportArrangementServiceId)
            }
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

export default TableListServiceCharge;
