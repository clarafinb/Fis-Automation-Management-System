import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react';
import DataGrid from 'src/components/custom/table/DataGrid';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilUser } from '@coreui/icons';
import { formatStandartDate } from 'src/helper/globalHelper';

function TableListTransportTypeAndDispatcher({
    data,
    handleComponent
}) {

    const handleAction = (data, transportTypeArrangementId) => {
        return (
            <>
                {data?.hasDeleteFunction?.toLowerCase() === 'no' ? '' :
                    <CButton className='colorBtnIcon-red p-1 me-2'>
                        <CIcon
                            icon={cilTrash}
                            className=""
                            title='Delete Dispatcher'
                            onClick={() =>
                                handleComponent("delTransportType", transportTypeArrangementId)
                            }
                        />
                    </CButton>
                }


                {data?.hasReassignFunction?.toLowerCase() === 'yes' ?
                    <CButton className='colorBtnIcon-black p-1'>
                        <CIcon
                            icon={cilUser}
                            className=""
                            title='Re-assign Dispatcher.'
                            onClick={() =>
                                handleComponent("reAssignTransportType", transportTypeArrangementId)
                            }
                        />
                    </CButton>
                    : ''}
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
            field: 'createDate',
            headerName: 'Create Date',
            headerStyle: { textAlign: 'center' },
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'transportTypeArrangementId',
            headerName: 'Action',
            filter: false,
            pinned: 'right',
            maxWidth: 150,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return handleAction(data, data.transportTypeArrangementId)
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
