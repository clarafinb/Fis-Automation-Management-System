import React from 'react'

import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import DataGrid from 'src/components/custom/table/DataGrid'
import { formatStandartDate } from 'src/helper/globalHelper'

function TableListBulkUploadSku({
    data,
    handleComponent,
    handleToogle
}) {

    const handleStatus = (value) => {
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

    const downloadFile = (data) => {
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

    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            cellStyle: { textAlign: 'center' },
            minWidth: 150
        },
        {
            field: 'fileName',
            headerName: 'FILE NAME',
            cellStyle: { textAlign: 'left' },
        },
        {
            field: 'modifiedUser',
            headerName: 'UPLOAD BY',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'lmdt',
            headerName: 'UPLOAD DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'compileStatus',
            headerName: 'STATUS',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return handleStatus(data.compileStatus)
            }
        },
        {
            field: 'filePath',
            headerName: 'ACTION',
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return downloadFile(data)
            }
        },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                />
            </CCol>
        </CRow>
    )
}

export default TableListBulkUploadSku;
