import React from 'react'

import {
    CBadge,
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid'
import CIcon from '@coreui/icons-react'
import { cilFile, cilSpreadsheet } from '@coreui/icons'
import { formatStandartDate } from 'src/helper/globalHelper'

function TableListMrsDetailBulkUpload({
    data,
    handleComponent,
}) {

    const handleAction = (type, data) => {


        if (type === 'log') {
            return (
                <>
                    {data?.rowError > 0 ?
                        <CButton className='colorBtnIcon-red p-1 me-2' title='View Error Log'>
                            <CIcon
                                icon={cilFile}
                                className=""
                                title='View Error Log'
                                onClick={() =>
                                    handleComponent("download", data)
                                }
                            />
                        </CButton>
                        : ''}
                </>
            )
        }

        if (type === 'download') {
            return (
                <>
                    <CButton className='colorBtnIcon-white p-1 me-2' title='Download Uploaded Bulk File'>
                        <CIcon
                            icon={cilSpreadsheet}
                            className="text-success"
                            title='Download Uploaded Bulk File'
                            onClick={() =>
                                handleComponent("download", data)
                            }
                        />
                    </CButton>
                </>
            )
        }
    }

    const badge = (value) => {
        return (
            <CBadge
                className={value === "Pending"
                    ? "badge-secondary"
                    : "badge-info"
                }
            >
                {value.toUpperCase()}
            </CBadge>
        )
    }

    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            cellStyle: { textAlign: 'center' },
            minWidth: 80,
            filter: false
        },
        {
            field: 'mrsName',
            headerName: 'MRS NAME',
            cellStyle: { textAlign: 'center' },
            minWidth: 200
        },
        {
            field: 'fileName',
            headerName: 'FILE NAME',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200
        },
        {
            field: 'uploadBy',
            headerName: 'UPLOAD BY',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200
        },
        {
            field: 'uploadDate',
            headerName: 'UPLOAD DATE',
            headerStyle: { textAlign: 'center' },
            maxWidth: 150,
            cellRenderer: ({ data }) => {
                return data.uploadDate ?
                    formatStandartDate(data.uploadDate) :
                    ''
            }
        },
        {
            field: 'totalRow',
            headerName: 'TOTAL ROW',
            headerStyle: { textAlign: 'center' },
            maxWidth: 150
        },
        {
            field: 'rowSuccess',
            headerName: 'ROW SUCCESS',
            headerStyle: { textAlign: 'center' },
            maxWidth: 150
        },
        {
            field: 'rowError',
            headerName: 'ROW ERROR',
            headerStyle: { textAlign: 'center' },
            maxWidth: 150
        },
        {
            field: 'executeStatus',
            headerName: 'EXECUTE STATUS',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200,
            cellRenderer: ({ data }) => {
                return badge(data.executeStatus)
            }
        },
        {
            field: 'executeDate',
            headerName: 'EXECUTE DATE',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200,
            cellRenderer: ({ data }) => {
                return data.executeDate ?
                    formatStandartDate(data.executeDate) :
                    ''
            }
        },
        {
            field: 'mrsDetailId',
            headerName: 'ERROR LOG',
            maxWidth: 120,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction('log', data)
            }
        },
        {
            field: 'mrsDetailId',
            headerName: 'DOWNLOAD FILE',
            maxWidth: 150,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction('download', data)
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

export default TableListMrsDetailBulkUpload;
