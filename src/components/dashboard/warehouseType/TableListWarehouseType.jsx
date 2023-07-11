import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'

function TableListWarehouseType({
    data,
    handleComponent,
    handleToogle
}) {
    const { dispatch, Global } = useRedux()

    useEffect(() => {

    }, [Global?.user]);

    const filterValue = [
        { name: 'whType', operator: 'startsWith', type: 'string' },
        { name: 'typeDescription', operator: 'startsWith', type: 'string' },
        { name: 'modifyBy', operator: 'startsWith', type: 'string' },
        { name: 'modifyDate', operator: 'startsWith', type: 'string' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80 },
        { name: 'whType', header: 'Warehouse Type', defaultWidth: 200 },
        { name: 'typeDescription', header: 'Description', defaultWidth: 210, textAlign: 'center' },
        { name: 'modifyBy', header: 'Modified By', defaultWidth: 200, textAlign: 'center' },
        { name: 'modifyDate', header: 'Modified Date', defaultWidth: 310 },
        {
            name: 'isActve',
            header: 'Active Status',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value, data }) => {
                return (
                    < ToggleSwitch
                        checked={value}
                        size="lg"
                        handleChecked={handleToogle}
                        data={data}
                        className="d-flex justify-content-center"
                    />
                )
            }
        },
        {
            name: 'whTypeId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 100,
            render: ({ value, data }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faEdit}
                            className='textBlue px-2'
                            size='sm'
                            title='Edit'
                            onClick={() => handleComponent('edit', value, data)}
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

export default TableListWarehouseType;
