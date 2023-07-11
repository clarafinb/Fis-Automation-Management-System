import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import moment from 'moment'

function TableListHoDocument({
    data,
    handleComponent,
    handleToogle
}) {
    const filterValue = [
        { name: 'transportName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'assignedDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'assignedBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'actualRecipientName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'dispatchDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'hoCompletedate', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number' },
        { name: 'transportName', header: 'Transport Name', defaultWidth: 230, cellProps: { className: 'customTable' } },
        {
            name: 'assignedDate',
            header: 'Assign Date',
            defaultWidth: 230,
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        { name: 'assignedBy', header: 'Assign By', defaultWidth: 160 },
        { name: 'actualRecipientName', header: 'Recipient Name', defaultWidth: 180 },
        { name: 'dispatchDate', header: 'Dispatch Date', defaultWidth: 180, textAlign: 'center' },
        { name: 'hoCompletedate', header: 'HO Complete Date', defaultWidth: 180 },
        {
            name: 'transportArrangementRefId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 180,
            render: ({ data }) => {
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

export default TableListHoDocument;
