import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

function TableListSubDistrict({
    data,
    handleComponent,
    handleToogle
}) {
    const filterValue = [
        { name: 'subDistrictName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'provinceName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'mrsCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'postalCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'province', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifyName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifyDate', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number' },
        {
            name: 'isActive',
            header: 'ACTIVE STATUS',
            textAlign: 'center',
            defaultWidth: 180,
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
            header: 'ACTION',
            textAlign: 'center',
            defaultWidth: 150,
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
        { name: 'provinceName', header: 'PROVINCE NAME', defaultWidth: 200 },
        { name: 'subDistrictName', header: 'SUB DISTRICT', defaultWidth: 230, cellProps: { className: 'customTable' } },
        { name: 'postalCode', header: 'POSTAL CODE', defaultWidth: 200, textAlign: 'center' },
        { name: 'mrsCode', header: 'MRS CODE', defaultWidth: 230 },
        { name: 'modifyName', header: 'CREATE BY', defaultWidth: 250 },
        {
            name: 'modifyDate',
            header: 'CREATE DATE',
            defaultWidth: 250,
            textAlign: 'center',
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        }
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

export default TableListSubDistrict;
