import React from 'react'

import {
    CBadge,
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

function TableListUserNotResgitered({
    data,
    handleComponent,
    handleToogle
}) {
    const badge = (value) => {
        return (
            <CBadge
                className={value === "Active"
                    ? "badge-info"
                    : "badge-secondary"
                }
            >
                {value === "Active"
                    ? "ACTIVE"
                    : "DEACTIVE"
                }
            </CBadge>
        )
    }

    const handleAction = (value) => {
        return (
            <>
                <CButton className='colorBtnIcon-black p-1 me-2'>
                    <CIcon
                        icon={cilPlus}
                        className=""
                        onClick={() =>
                            handleComponent("userId", value)
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
            field: 'name',
            headerName: 'NAME',
        },
        {
            field: 'email',
            headerName: 'EMAIL',
        },
        {
            field: 'phoneNo',
            headerName: 'PHONE NO',
        },
        {
            field: 'accountStatus',
            headerName: 'USER STATUS',
            minWidth: 150,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return badge(data.accountStatus)
            }
        },
        {
            field: 'userId',
            headerName: 'ACTION',
            minWidth: 80,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return handleAction(data.userId)
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

export default TableListUserNotResgitered
