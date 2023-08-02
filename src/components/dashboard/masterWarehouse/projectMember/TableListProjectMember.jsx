import React from 'react'
import {
    CBadge,
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import DataGrid from 'src/components/custom/table/DataGrid'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

function TableListProjectMember({
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
                            handleComponent("whAccess", value)
                        }
                    />
                </CButton>
            </>
        )
    }

    const toogle = (value, data) => {
        return (
            <>
                <ToggleSwitch
                    checked={value}
                    size="lg"
                    handleChecked={handleToogle}
                    data={data}
                    className="d-flex justify-content-center"
                />
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
            field: 'whMembershipList',
            headerName: 'WH MEMBERSHIP',
        },
        {
            field: 'Name',
            headerName: 'NAME',
        },
        {
            field: 'role_name',
            headerName: 'ROLE',
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
            field: 'accountstatus',
            headerName: 'USER STATUS',
            minWidth: 150,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return badge(data.accountstatus)
            }
        },
        {
            field: 'userId',
            headerName: 'WAREHOUSE ACCEESS',
            minWidth: 80,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return handleAction(data.userId, data)
            }
        },
        {
            field: 'isActive',
            headerName: 'ACTIVE STATUS',
            minWidth: 80,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return toogle(data.isActive)
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

export default TableListProjectMember
