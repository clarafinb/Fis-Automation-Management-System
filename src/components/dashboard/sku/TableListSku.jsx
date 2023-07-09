import React, { useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEdit, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'

function TableListWarehouse({
    data,
    handleComponent,
    handleToogle
}) {
    const { dispatch, Global } = useRedux()

    useEffect(() => {

    }, [Global?.user]);

    const filterValue = [
        { name: 'materialCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'materialDesc', operator: 'startsWith', type: 'string', value: '' },
        { name: 'totalVolume', operator: 'startsWith', type: 'string', value: '' },
        { name: 'uom', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'modifiedBy', operator: 'startsWith', type: 'string', value: '' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 80, type: 'number' },
        { name: 'materialCode', header: 'Material Code', defaultWidth: 230, cellProps: { className: 'customTable' } },
        { name: 'materialDesc', header: 'Material Desc', defaultWidth: 230 },
        { name: 'totalVolume', header: 'Total Volume', defaultWidth: 200, textAlign: 'center' },
        { name: 'uom', header: 'UOM', defaultWidth: 200 },
        { name: 'modifiedBy', header: 'Last Modified By', defaultWidth: 250 },
        { name: 'modifiedDate', header: 'Last Modified Date', defaultWidth: 250, textAlign: 'center' },
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

export default TableListWarehouse;
