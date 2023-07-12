import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit} from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import moment from 'moment'

function TableListAccountManagement({
    data, 
    handleComponent, 
    handleToogle 
}) {
    const filterValue = [
        { name: 'fullname', operator: 'startsWith', type: 'string', value: '' },
        { name: 'roleName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'email', operator: 'startsWith', type: 'string', value: '' },
        { name: 'phoneNo', operator: 'startsWith', type: 'string', value: '' },
        { name: 'userTitle', operator: 'startsWith', type: 'string', value: '' },
        { name: 'employeeId', operator: 'startsWith', type: 'string', value: '' },
        { name: 'accountStatus', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedBy', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        {
            name: 'userId',
            header: 'ACTION',
            textAlign: 'center',
            defaultWidth: 150,
            render: ({ value, data }) => {
                return (
                    <>  
                        <FontAwesomeIcon 
                            icon={faEdit} 
                            className='textBlue px-2'
                            size='sm'
                            title='Edit'
                            onClick={() => handleComponent('edit', value, data)}
                        />
                    </>
                )
            }
        },
        { name: 'no', header: 'NO', defaultWidth: 80, type: 'number' },
        { name: 'fullname', header: 'FULL NAME', defaultWidth: 280},
        { name: 'roleName', header: 'ROLE', defaultWidth: 200},
        { name: 'email', header: 'EMAIL', defaultWidth: 280},
        { name: 'phoneNo', header: 'PHONE NO', defaultWidth: 200},
        { name: 'userTitle', header: 'USER TITLE', defaultWidth: 200},
        { name: 'employeeId', header: 'EMPLOYEE ID', defaultWidth: 200},
        { name: 'accountStatus', header: 'ACCOUNT STATUS', defaultWidth: 150},
        {
            name: 'createDate',
            header: 'CREATE DATE',
            defaultWidth: 200,
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        {
            name: 'modifiedDate',
            header: 'MODIFIED DATE',
            defaultWidth: 200,
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        { name: 'modifiedBy', header: 'MODIFIED BY', defaultWidth: 200},
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <SmartTable
                    data={data}
                    columns={columns}
                    filterValue={filterValue}
                />
            </CCol>
        </CRow>
    )
}

export default TableListAccountManagement
