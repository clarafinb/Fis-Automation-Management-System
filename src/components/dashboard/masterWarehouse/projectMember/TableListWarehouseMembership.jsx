import React from 'react'

import {
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

function TableListWarehouseMembership({
    data,
    handleComponent,
    handleToogle
}) {

    const filterValue = [
        { name: 'whName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'isMainWH', operator: 'startsWith', type: 'string', value: '' }
    ];

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'whName', header: 'Warehouse', defaultFlex: 1 },
        { name: 'whCode', header: 'Warehouse Code', defaultFlex: 1 },
        { name: 'isMainWH', header: 'Main WH', defaultFlex: 1, textAlign: 'center' },
        {
            name: 'whMemberStatus',
            header: 'Action',
            defaultFlex: 1,
            textAlign: 'center',
            render: ({ value, cellProps }) => value === "notmember"
                ? <FontAwesomeIcon
                    icon={faCheck}
                    className='textBlue'
                    onClick={() =>
                        handleComponent(value, cellProps.data.detail.whId)} />
                : <FontAwesomeIcon
                    icon={faXmark}
                    className='textBlue'
                    onClick={() =>
                        handleComponent(value, cellProps.data.detail.whId)} />
        }
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

export default TableListWarehouseMembership
