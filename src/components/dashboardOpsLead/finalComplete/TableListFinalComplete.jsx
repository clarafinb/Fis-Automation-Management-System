import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilPencil } from '@coreui/icons';
import DataGrid from 'src/components/custom/table/DataGrid';
import { formatStandartDate } from 'src/helper/globalHelper';

function TableListFinalComplete({
    data,
    handleComponent,
}) {

    const handleAction = (data) => {
        return (
            <>
                <CButton className='colorBtnIcon-black p-1 me-2'>
                    <CIcon
                        icon={cilPencil}
                        title='Final Cost Transport Confirmed Detail'
                        onClick={() =>
                            handleComponent("detail", data)
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
            field: 'whCode',
            headerName: 'WH CODE',
        },
        {
            field: 'whName',
            headerName: 'WH NAME',
        },
        {
            field: 'transportArrangementNo',
            headerName: 'ARRANGEMENT NO',
        },
        {
            field: 'deliveryMode',
            headerName: 'DELIVERY MODE',
        },
        {
            field: 'transportMode',
            headerName: 'TRANSPORT MODE',
        },
        {
            field: 'transportCreateBy',
            headerName: 'CREATE BY',
        },
        {
            field: 'transportCreateDate',
            headerName: 'CREATE DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.transportCreateDate)
            }
        },
        {
            field: 'orderReqId',
            headerName: 'ACTION',
            maxWidth: 150,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction(data)
            }
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

export default TableListFinalComplete;
