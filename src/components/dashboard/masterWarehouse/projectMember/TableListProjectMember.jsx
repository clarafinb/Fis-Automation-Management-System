import React from 'react'

import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import SmartTable from 'src/components/custom/table/SmartTable'
import moment from 'moment'

function TableListProjectMember({
    data,
    handleComponent,
    handleToogle
}) {

    const filterValue = [
        { name: 'Name', operator: 'startsWith', type: 'string' },
        { name: 'role_name', operator: 'startsWith', type: 'string' },
        { name: 'email', operator: 'startsWith', type: 'string' },
        { name: 'phoneNo', operator: 'startsWith', type: 'string' },
        { name: 'accountstatus', operator: 'startsWith', type: 'string' },
    ]

    const columns = [
        { name: 'no', header: 'NO', defaultVisible: true, defaultWidth: 80 },
        { name: 'Name', header: 'NAME', defaultFlex: 1 },
        { name: 'role_name', header: 'ROLE', defaultFlex: 1 },
        { name: 'email', header: 'EMAIL', defaultFlex: 1 },
        { name: 'phoneNo', header: 'PHONE NO', defaultFlex: 1 },
        {
            name: 'accountstatus',
            header: 'USER STATUS',
            defaultFlex: 1,
            textAlign: 'center',
            render: ({ value }) => {
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
        },
        {
            name: 'isActive',
            header: 'ACTIVE STATUS',
            defaultFlex: 1,
            textAlign: 'center',
            render: ({ value, data }) => {
                return (
                    < ToggleSwitch
                        checked={value}
                        size="lg"
                        handleChecked={handleToogle}
                        data={data}
                        className="d-flex justify-content-center"
                    />
                )
            }
        },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <SmartTable
                    data={data}
                    columns={columns}
                    filterValue={filterValue}
                    minHeight={300}
                />
            </CCol>
        </CRow>
    )
}

export default TableListProjectMember
