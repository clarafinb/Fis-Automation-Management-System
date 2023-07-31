import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid'
import { formatStandartDate } from 'src/helper/globalHelper'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'

function TableListAccountManagement({
    data,
    handleComponent,
    handleToogle
}) {
    const handleAction = (value, data) => {
        return (
            <>
                <CButton className='colorBtnIcon-black p-1 me-2'>
                    <CIcon
                        icon={cilPencil}
                        className=""
                        onClick={() =>
                            handleComponent("edit", value, data)
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
            cellStyle: { textAlign: 'center' },
            minWidth: 150,
        },
        {
            field: 'fullname',
            headerName: 'FULL NAME',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'roleName',
            headerName: 'ROLE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'email',
            headerName: 'EMAIL',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'phoneNo',
            headerName: 'PHONE NO',
        },
        {
            field: 'userTitle',
            headerName: 'USER TITLE',
        },
        {
            field: 'employeeId',
            headerName: 'EMPLOYEE ID',
        },
        {
            field: 'accountStatus',
            headerName: 'ACCOUNT STATUS',
        },
        {
            field: 'createDate',
            headerName: 'CREATE DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'modifiedDate',
            headerName: 'DESTINATION',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.modifiedDate)
            }
        },
        {
            field: 'modifiedBy',
            headerName: 'MODIFIED BY',
        },
        {
            field: 'userId',
            headerName: 'ACTION',
            minWidth: 100,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return handleAction(data.userId, data)
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

export default TableListAccountManagement
