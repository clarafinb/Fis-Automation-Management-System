import React from 'react'

import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import SmartTable from 'src/components/custom/table/SmartTable'
import moment from 'moment'

function TableListSku({
    data,
    handleComponent,
    handleToogle
}) {

    const filterValue = [
        { name: 'materialCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'materialDesc', operator: 'startsWith', type: 'string', value: '' },
        { name: 'totalVolume', operator: 'startsWith', type: 'string', value: '' },
        { name: 'uom', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedBy', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number', textAlign: 'center' },
        { name: 'materialCode', header: 'MATERIAL CODE', defaultWidth: 230,textAlign: 'center', cellProps: { className: 'customTable' } },
        { name: 'materialDesc', header: 'MATERIAL DESC', defaultWidth: 230, textAlign: 'center' },
        { name: 'totalVolume', header: 'TOTAL VOLUME', defaultWidth: 200, textAlign: 'center' },
        { name: 'uom', header: 'UOM', defaultWidth: 200, textAlign: 'center' },
        { name: 'modifiedBy', header: 'LAST MODIFIED BY', defaultWidth: 250, textAlign: 'center' },
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
            name: 'isActive',
            header: 'ACTIVE STATUS',
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

export default TableListSku;
