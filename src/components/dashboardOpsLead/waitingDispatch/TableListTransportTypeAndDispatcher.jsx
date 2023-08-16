import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react';
import DataGrid from 'src/components/custom/table/DataGrid';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

function TableListTransportTypeAndDispatcher({
    data,
    handleComponent
}) {

    const handleAction = (transportTypeArrangementId) => {
        return (
            <>
                <CButton className='colorBtnIcon-red p-1'>
                    <CIcon
                        icon={cilTrash}
                        className=""
                        title='Delete Transport Type And Dispatcher'
                        onClick={() =>
                            handleComponent("delTransportType", transportTypeArrangementId)
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
            field: 'transportName',
            headerName: 'Transport Type',
        },
        {
            field: 'mainDispatcherName',
            headerName: 'Dispatcher',
        },
        {
            field: 'pickandpackCompleteDate',
            headerName: 'Create Date',
        },
        {
            field: 'transportTypeArrangementId',
            headerName: 'Action',
            filter: false,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return handleAction(data.transportTypeArrangementId)
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

export default TableListTransportTypeAndDispatcher;
