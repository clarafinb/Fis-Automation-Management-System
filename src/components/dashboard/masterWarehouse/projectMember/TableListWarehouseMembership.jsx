import React from 'react'

import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid'
import { cilCheckAlt, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

function TableListWarehouseMembership({
    data,
    handleComponent,
    handleToogle
}) {
    const handleAction = (value, data) => {
        return (
            <>
                <CButton className='colorBtnIcon-black p-1 me-2'>
                    <CIcon
                        icon={value === "notmember" ? cilCheckAlt : cilX}
                        className=""
                        onClick={() =>
                            handleComponent(value, data?.whId)
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
            field: 'whName',
            headerName: 'WAREHOUSE NAME',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'whCode',
            headerName: 'WAREHOUSE CODE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'isMainWH',
            headerName: 'MAIN CWH',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'whMemberStatus',
            headerName: 'ACTION',
            minWidth: 80,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return handleAction(data.whMemberStatus, data)
            }
        }
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

export default TableListWarehouseMembership
