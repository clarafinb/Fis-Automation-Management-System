import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import moment from 'moment'

function TableServiceChargeList({
    data,
    handleComponent,
    handleToogle
}) {
    const filterValue = [
        { name: 'serviceCharge', operator: 'startsWith', type: 'string', value: '' },
        { name: 'serviceChargeCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'uom', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedDate', operator: 'startsWith', type: 'string', value: '' }
    ]

    const columns = [
        { name: 'no', header: 'NO', defaultWidth: 80, type: 'number', textAlign: 'center', },
        { name: 'serviceCharge', header: 'SERVICE CHARGE', textAlign: 'center', defaultFlex: 1 },
        { name: 'serviceChargeCode', header: 'SERVICE CHARGE CODE', textAlign: 'center', defaultFlex: 1 },
        { name: 'uom', header: 'UOM', textAlign: 'center', defaultFlex: 1 },
        { name: 'modifiedBy', header: 'MODIFIED BY', textAlign: 'center', defaultFlex: 1 },
        {
            name: 'modifiedDate',
            header: 'MODIFIED DATE',
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

export default TableServiceChargeList
