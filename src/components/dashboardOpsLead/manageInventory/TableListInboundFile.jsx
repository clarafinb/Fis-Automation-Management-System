import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faFile } from '@fortawesome/free-solid-svg-icons'

function TableListInboundFile({
    data,
    handleComponent,
    handleToogle
}) {
    const filterValue = [
        { name: 'fileName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'inboundType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'totalRow', operator: 'startsWith', type: 'string', value: '' },
        { name: 'rowSuccess', operator: 'startsWith', type: 'string', value: '' },
        { name: 'rowError', operator: 'startsWith', type: 'string', value: '' },
        { name: 'errMessage', operator: 'startsWith', type: 'string', value: '' },
        { name: 'executeStatus', operator: 'startsWith', type: 'string', value: '' }
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number' },
        {
            name: 'openErrLog',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value, data }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faDownload}
                            className='textBlue px-2'
                            size='lg'
                            title='Download File'
                            onClick={() => handleComponent('downloadFile', value, data)}
                        />
                        {(value === 'yes') ?
                            <FontAwesomeIcon
                                icon={faFile}
                                className='textBlue px-2'
                                size='lg'
                                title='Download Row Error Log'
                                onClick={() => handleComponent('downloadErr', value, data)}
                            />
                            : ''}
                    </>
                )
            }
        },
        { name: 'fileName', header: 'Filename', defaultWidth: 230 },
        { name: 'inboundType', header: 'Inbound Type', defaultWidth: 230 },
        { name: 'createBy', header: 'Create By', defaultWidth: 250 },
        {
            name: 'createDate',
            header: 'Create Date',
            defaultWidth: 300,
            textAlign: 'center',
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        { name: 'totalRow', header: 'Total Row', defaultWidth: 230 },
        { name: 'rowSuccess', header: 'Row Success', defaultWidth: 230 },
        { name: 'rowError', header: 'Row Error', defaultWidth: 230 },
        { name: 'errMessage', header: 'Err Message', defaultWidth: 230 },
        { name: 'executeStatus', header: 'Excecute Status', defaultWidth: 230 },
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

export default TableListInboundFile;
