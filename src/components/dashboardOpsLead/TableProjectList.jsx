import React from 'react'

import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import CIcon from '@coreui/icons-react'
import { cilSend } from '@coreui/icons'

function TableProjectList({
    data,
    handleComponent
}) {
    const filterValue = [
        { name: 'projectName', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'NO', defaultWidth: 80, type: 'number', textAlign: 'center' },
        { name: 'projectName', header: 'PROJECT NAME', defaultWidth: 280,textAlign: 'center' },
        {
            name: 'projectId',
            header: 'ACTION',
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value, data }) => {
                return (
                    <>
                        <CButton
                            className='colorBtnIcon-black px-2 m-2'
                        >
                            <CIcon
                                icon={cilSend}
                                className="rotate-icon"
                                // size="sm"
                                onClick={() => handleComponent('pilih', value, data)}
                            />
                        </CButton>
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
