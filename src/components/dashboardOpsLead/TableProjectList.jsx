import React from 'react'

import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSend } from '@coreui/icons'
import DataGrid from '../custom/table/DataGrid'

function TableProjectList({
    data,
    handleComponent
}) {

    const handleAction = (action, data) => {
        return (
            <>
                <CButton
                    className='colorBtnIcon-black px-2 m-2'
                >
                    <CIcon
                        icon={cilSend}
                        className="rotate-icon"
                        // size="sm"
                        onClick={() => handleComponent(action, data.projectId, data)}
                    />
                </CButton>
            </>
        )
    }

    const columns = [
        { field: 'no', headerName: 'NO', minWidth: 100, filter: false },
        { field: 'projectName', headerName: 'PROJECT NAME',},
        { field: 'processGroup', headerName: 'PROCESS GROUP'},
        { field: 'customerName', headerName: 'CUSTOMER'},
        {
            field: 'projectId',
            headerName: 'ACTION',
            cellStyle: { textAlign: 'center' },
            minWidth: 80,
            // pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction('pilih', data)
            }
        },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                    minHeight={400}
                />
            </CCol>
        </CRow>
    )
}

export default TableProjectList
