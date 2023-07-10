import React from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'

function TableProjectList({
    data, 
    handleComponent, 
    handleToogle 
}) {
    const { dispatch, Global } = useRedux()

    const filterValue = [
        { name: 'projectName', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number' },
        { name: 'projectName', header: 'Project Name', defaultWidth: 280},
        {
            name: 'projectId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value, data }) => {
                return (
                    <>  
                        <FontAwesomeIcon 
                            icon={faArrowRight} 
                            className='textBlue px-2'
                            size='sm'
                            title='Pilih Project'
                            onClick={() => handleComponent('pilih', value, data)}
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
                    minHeight={300}
                />
            </CCol>
        </CRow>
    )
}

export default TableProjectList
