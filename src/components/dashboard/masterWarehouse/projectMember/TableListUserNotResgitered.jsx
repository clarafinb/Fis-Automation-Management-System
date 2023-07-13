import React from 'react'

import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function TableListUserNotResgitered({
    data,
    handleComponent,
    handleToogle
}) {

    const filterValue = [
        { name: 'name', operator: 'startsWith', type: 'string' },
        { name: 'email', operator: 'startsWith', type: 'string' },
        { name: 'phoneNo', operator: 'startsWith', type: 'string' },
        { name: 'accountStatus', operator: 'startsWith', type: 'string' },
    ]

    const columns = [
        { name: 'no', header: 'NO', defaultVisible: true, defaultWidth: 80 },
        { name: 'name', header: 'NAME', defaultFlex: 1 },
        { name: 'email', header: 'EMAIL', defaultFlex: 1 },
        { name: 'phoneNo', header: 'PHONE NO', defaultFlex: 1 },
        {
            name: 'accountStatus',
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
            name: 'userId',
            header: 'ACTION',
            defaultFlex: 1,
            textAlign: 'center',
            render: ({ value }) => {
                return (
                    <FontAwesomeIcon
                        icon={faPlus}
                        className='textBlue'
                        onClick={() =>
                            handleComponent("userId", value)
                        }
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

export default TableListUserNotResgitered
