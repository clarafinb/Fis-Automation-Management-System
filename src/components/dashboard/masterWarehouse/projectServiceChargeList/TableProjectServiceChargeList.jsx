import React from 'react'

import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import SmartTable from 'src/components/custom/table/SmartTable'

function TableProjectServiceChargeList({
    data, 
    handleComponent, 
    handleToogle 
}) {
    const filterValue = [
        { name: 'serviceCharge', operator: 'startsWith', type: 'string' },
        { name: 'serviceChargeCode', operator: 'startsWith', type: 'string' },
        { name: 'chargeFee', operator: 'startsWith', type: 'string' },
        { name: 'currencyName', operator: 'startsWith', type: 'string' },
        { name: 'modifiedBy', operator: 'startsWith', type: 'string' },
        { name: 'modifiedDate', operator: 'startsWith', type: 'string' },
    ]

    const columns = [
        { name: 'no', header: 'NO', defaultVisible: true, defaultWidth: 80 },
        { name: 'serviceCharge', header: 'SERVICE CHARGE', defaultWidth: 200 },
        { name: 'serviceChargeCode', header: 'SERVICE CHARGE CODE', defaultWidth: 200, textAlign: 'center' },
        {
            name: 'chargeFee',
            header: 'Charge Fee',
            defaultWidth: 200,
            textAlign: 'end',
            render: ({ value }) => {
                return (separateComma(value ? value.toString() : 0))
            }
        },
        { name: 'currencyName', header: 'CURRENCY', defaultWidth: 200, textAlign: 'center' },
        { name: 'modifiedBy', header: 'LAST MODIFIED BY', defaultWidth: 200 },
        {
            name: 'modifiedDate',
            header: 'LAST MODIFIED DATE	',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        {
            name: 'status',
            header: 'ACTIVE STATUS',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value, data }) => {
                return (
                    <ToggleSwitch 
                            checked={value} 
                            size="lg" 
                            handleChecked = {handleToogle} 
                            data={data}
                            className= "d-flex justify-content-center"  
                        />
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

export default TableProjectServiceChargeList
