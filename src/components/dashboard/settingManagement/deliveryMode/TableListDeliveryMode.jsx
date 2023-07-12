import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'

function TableListDeliveryMode({
    data, 
    handleComponent, 
    handleToogle 
}) {
    const filterValue = [
        { name: 'deliveryMode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'deliveryCode', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number', textAlign: 'center', },
        { name: 'deliveryMode', header: 'DELIVERY MODE', textAlign: 'center', defaultFlex: 1},
        { name: 'deliveryCode', header: 'DELIVERY CODE', textAlign: 'center',defaultFlex: 1},
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
                            handleChecked = {handleToogle} 
                            data={data}
                            className= "d-flex justify-content-center"  
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

export default TableListDeliveryMode
