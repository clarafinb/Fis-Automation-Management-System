import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

function TableListInvMailNotif({
    data,
    handleComponent,
    handleToogle
}) {
    const handleAction = (data) => {
        return (
            <CButton className='colorBtnIcon-black p-1 me-2'>
                <CIcon
                    icon={cilTrash}
                    className=""
                    onClick={() =>
                        handleComponent("delete", data)
                    }
                />
            </CButton>
        )
    }

    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            cellStyle: { textAlign: 'center' },
            maxWidth: 150,
            filter: false
        },
        {
            field: 'fullName',
            headerName: 'FULLNAME',
            cellStyle: { textAlign: 'left' },
        },
        {
            field: 'Email',
            headerName: 'EMAIL',
            cellStyle: { textAlign: 'left' },
        },
        {
            field: 'invMailNotifId',
            headerName: 'ACTION',
            minWidth: 100,
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

export default TableListInvMailNotif;
