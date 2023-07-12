import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import moment from 'moment'

function TableListUom({
    data,
    handleComponent,
    handleToogle
}) {
    const filterValue = [
        { name: 'uom', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedDate', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number', textAlign: 'center', },
        { name: 'uom', header: 'UOM', textAlign: 'center', defaultFlex: 1 },
        { name: 'modifiedBy', header: 'LAST MODIFIED BY', textAlign: 'center', defaultFlex: 1 },
        {
            name: 'modifiedDate',
            header: 'LAST MODIFIED DATE',
            textAlign: 'center',
            defaultFlex: 1,
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        {
            name: 'isActive',
            header: 'ACTIVE STATUS',
            textAlign: 'center',
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

export default TableListUom
