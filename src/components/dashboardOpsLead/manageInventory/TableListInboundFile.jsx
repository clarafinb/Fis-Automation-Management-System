import React from 'react'
import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faFile } from '@fortawesome/free-solid-svg-icons'
import DataGrid from 'src/components/custom/table/DataGrid'
import { formatStandartDate } from 'src/helper/globalHelper'

function TableListInboundFile({
    data,
    handleComponent,
}) {

    const handleAction = (value, data) => {
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

    const handleBadge = (value) => {
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

    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            headerStyle: { textAlign: 'center' },
            cellStyle: { textAlign: 'center' },
            filter: false,
            minWidth: 80,
        },
        {
            field: 'openErrLog',
            headerName: 'Action',
            minWidth: 100,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction(data.openErrLog, data)
            }
        },
        {
            field: 'fileName',
            headerName: 'Filename',
        },
        {
            field: 'inboundType',
            headerName: 'Inbound Type', minWidth: 200,
        },
        {
            field: 'createBy',
            headerName: 'Create By', minWidth: 200,
        },
        {
            field: 'createDate',
            headerName: 'Create Date',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'totalRow',
            headerName: 'Total Row', minWidth: 150,
        },
        {
            field: 'rowSuccess',
            headerName: 'Row Success', minWidth: 150,
        },
        {
            field: 'rowError',
            headerName: 'Row Error', minWidth: 150,
        },
        {
            field: 'errMessage',
            headerName: 'Error Message', minWidth: 200,
        },
        {
            field: 'executeStatus',
            headerName: 'Excecute Status',
            minWidth: 200,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return handleBadge(data.executeStatus)
            }
        },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                    minHeight={600}
                />
            </CCol>
        </CRow>
    )
}

export default TableListInboundFile;
