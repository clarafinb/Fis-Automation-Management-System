import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

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
    const { dispatch, Global } = useRedux()

    useEffect(() => {
        
    }, [Global?.user]);

    const filterValue = [
        { name: 'no', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'isMainWH', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whSpace', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whAddress', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number' },
        { name: 'whName', header: 'Warehouse Name', defaultWidth: 230, cellProps: { className: 'customTable' } },
        { name: 'whCode', header: 'Warehouse Code', defaultWidth: 230 },
        { name: 'isMainWH', header: 'Main CWH', defaultWidth: 130 },
        { name: 'whType', header: 'Warehouse Type', defaultWidth: 180 },
        { name: 'whSpace', header: 'Warehouse Space', defaultWidth: 180, textAlign: 'center' },
        { name: 'whAddress', header: 'Address', defaultWidth: 230 },
        {
            name: 'whId',
            header: 'Map',
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
            header: 'Active Status',
            textAlign: 'center',
            defaultWidth: 110,
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

export default TableListWarehouse;
