import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit} from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'

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
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number' },
        { name: 'fullname', header: 'Full Name', defaultWidth: 280},
        { name: 'roleName', header: 'Role', defaultWidth: 200},
        { name: 'email', header: 'Email', defaultWidth: 280},
        { name: 'phoneNo', header: 'Phone No', defaultWidth: 200},
        { name: 'userTitle', header: 'User Title', defaultWidth: 200},
        { name: 'employeeId', header: 'Employee ID', defaultWidth: 200},
        { name: 'accountStatus', header: 'Account Status', defaultWidth: 150},
        { name: 'createDate', header: 'Create Date', defaultWidth: 200},
        { name: 'modifiedDate', header: 'Modified Date', defaultWidth: 200},
        { name: 'modifiedBy', header: 'Modified By', defaultWidth: 200},
    
        {
            name: 'userId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 110,
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
