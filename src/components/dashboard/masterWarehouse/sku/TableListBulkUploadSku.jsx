import React from 'react'

import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faFileExcel } from '@fortawesome/free-solid-svg-icons'

function TableListBulkUploadSku({
    data,
    handleComponent,
    handleToogle
}) {

    const filterValue = [
        { name: 'fileName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedUser', operator: 'startsWith', type: 'string', value: '' },
        { name: 'lmdt', operator: 'startsWith', type: 'string', value: '' },
        { name: 'compileStatus', operator: 'startsWith', type: 'string', value: '' }
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number', textAlign: 'center' },
        { name: 'fileName', header: 'FILE NAME', defaultWidth: 500, textAlign: 'center', cellProps: { className: 'customTable' } },
        { name: 'modifiedUser', header: 'UPLOAD BY', defaultWidth: 230, textAlign: 'center' },
        {
            name: 'lmdt',
            header: 'UPLOAD DATE',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        {
            name: 'compileStatus',
            header: 'STATUS',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value }) => {
                let badge = "dark"
                if (value === 'Failed') badge = "danger"
                if (value === 'Success') badge = "success"
                return (
                    <CBadge
                        color={badge}
                    >
                        {value}
                    </CBadge>
                )
            }
        },
        {
            name: 'filePath',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 250,
            render: ({ data }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faFileArrowDown}
                            className='textBlue px-2'
                            title='Download File'
                            size='xl'
                            onClick={() =>
                                handleComponent('download', data)
                            }
                        />
                        {data.rowError > 0 ?
                            <FontAwesomeIcon
                                icon={faFileExcel}
                                className='textBlue px-2'
                                title='Download Error List'
                                size='xl'
                                onClick={() =>
                                    handleComponent('downloadError', data)
                                }
                            />
                            : ''
                        }
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
                    minHeight={600}
                />
            </CCol>
        </CRow>
    )
}

export default TableListBulkUploadSku;
