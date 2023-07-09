import React, { useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TableListSubDistrict({
    data,
    handleComponent,
    handleToogle
}) {
    const { dispatch, Global } = useRedux()

    useEffect(() => {

    }, [Global?.user]);

    const filterValue = [
        { name: 'subDistrictName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'mrsCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'postalCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'province', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifyName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifyDate', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number' },
        { name: 'subDistrictName', header: 'Sub District', defaultWidth: 230, cellProps: { className: 'customTable' } },
        { name: 'mrsCode', header: 'MRS Code', defaultWidth: 230 },
        { name: 'postalCode', header: 'Postal Code', defaultWidth: 200, textAlign: 'center' },
        { name: 'provinceName', header: 'province Name', defaultWidth: 200 },
        { name: 'modifyName', header: 'Modified By', defaultWidth: 250 },
        { name: 'modifyDate', header: 'Modified Date', defaultWidth: 250, textAlign: 'center' },
        {
            name: 'isActive',
            header: 'Active Status',
            textAlign: 'center',
            defaultWidth: 250,
            render: ({ value, data }) => {
                return (
                    <>
                        <ToggleSwitch
                            checked={value}
                            size="lg"
                            handleChecked={handleToogle}
                            data={data}
                            className="d-flex justify-content-center"
                        />
                    </>
                )
            }
        },
        {
            name: 'subDistrictId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 250,
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
                    minHeight={300}
                />
            </CCol>
        </CRow>
    )
}

export default TableListSubDistrict;
