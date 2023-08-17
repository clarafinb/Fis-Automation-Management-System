import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import DataGrid from 'src/components/custom/table/DataGrid'
import { formatStandartDate } from 'src/helper/globalHelper'

function TableListHoDocument({
    data,
    handleComponent,
}) {

    const handleAction = (data) => {
        return (
            <>
                <FontAwesomeIcon
                    icon={faLocationDot}
                    className='textBlue px-2'
                    size='xl'
                    title='Open Map'
                    onClick={() => handleComponent('map', data)}
                />
                <FontAwesomeIcon
                    icon={faImage}
                    className='textBlue px-2'
                    size='xl'
                    title='Open Image'
                    onClick={() => handleComponent('image', data)}
                />
            </>
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
            field: 'transportName',
            headerName: 'Transport Name'
        },
        {
            field: 'assignedDate',
            headerName: 'Assign Date',
            defaultWidth: 230,
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'assignedBy',
            headerName: 'Assign By'
        },
        {
            field: 'actualRecipientName',
            headerName: 'Recipient Name'
        },
        {
            field: 'dispatchDate', headerName: 'Dispatch Date',
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'hoCompletedate', headerName: 'HO Complete Date',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'transportArrangementRefId',
            headerName: 'Action',
            minWidth: 100,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction(data)
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

export default TableListHoDocument;
