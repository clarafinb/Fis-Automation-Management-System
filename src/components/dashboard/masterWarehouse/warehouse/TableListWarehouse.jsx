import React from 'react'

import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'

function TableListWarehouse({
    data, 
    handleComponent, 
    handleToogle 
}) {
    const filterValue = [
        { name: 'whName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'isMainWH', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whSpace', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whAddress', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'NO', defaultWidth: 80, type: 'number' },
        { name: 'whName', header: 'WAREHOUSE NAME', defaultWidth: 230, cellProps: { className: 'customTable' } },
        { name: 'whCode', header: 'WAREHOUSE CODE', defaultWidth: 230 },
        { name: 'isMainWH', header: 'MAIN CWH', defaultWidth: 130 },
        { name: 'whType', header: 'WAREHOUSE TYPE', defaultWidth: 180 },
        { name: 'whSpace', header: 'WAREHOUSE SPACE', defaultWidth: 180, textAlign: 'center' },
        { name: 'whAddress', header: 'ADDRESS', defaultWidth: 300 },
        {
            name: 'whId',
            header: 'MAP',
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value, data }) => {
                return (
                    <>  
                        <FontAwesomeIcon 
                            icon={faLocationDot} 
                            className='textBlue px-2'
                            size='sm'
                            title='Map'
                            onClick={() => handleComponent('map', value, data)}
                        />
                    </>
                )
            }
        },
        {
            name: 'isActive',
            header: 'ACTIVE STATUS',
            textAlign: 'center',
            defaultWidth: 180,
            render: ({ value, data }) => {
                return (
                    <>  
                        <ToggleSwitch 
                            checked={value} 
                            size="lg" 
                            handleChecked = {handleToogle} 
                            data={data}
                            className= "d-flex justify-content-center"  
                        />
                    </>
                )
            }
        },
        {
            name: 'whId',
            header: 'ACTION',
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

export default TableListWarehouse;
