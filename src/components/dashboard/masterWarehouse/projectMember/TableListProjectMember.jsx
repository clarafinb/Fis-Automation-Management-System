import React from 'react'

import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
        { name: 'whMembershipList', operator: 'startsWith', type: 'string' },
    ]

    const columns = [
        { name: 'no', header: 'NO', defaultVisible: true, defaultWidth: 80 },
        {
            name: 'isActive',
            header: 'ACTIVE STATUS',
            defaultWidth: 200,
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
        {
            name: 'accountstatus',
            header: 'USER STATUS',
            defaultWidth: 200,
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
            name: 'userId',
            header: 'WAREHOUSE ACCEESS',
            defaultWidth: 210,
            textAlign: 'center',
            render: ({ value, data }) => {
                return (
                    <FontAwesomeIcon
                        icon={faPlus}
                        className='textBlue'
                        onClick={() =>
                            handleComponent("whAccess", value)
                        }
                    />
                )
            }
        },
        { name: 'whMembershipList', header: 'WH MEMBERSHIP', defaultWidth: 300 },
        { name: 'Name', header: 'NAME', defaultWidth: 200 },
        { name: 'role_name', header: 'ROLE', defaultWidth: 200 },
        { name: 'email', header: 'EMAIL', defaultWidth: 200 },
        { name: 'phoneNo', header: 'PHONE NO', defaultWidth: 200 },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <SmartTable
                    data={data}
                    columns={columns}
                    filterValue={filterValue}
                    minHeight={600}
                />
            </CCol>
        </CRow>
    )
}

export default TableListProjectMember
