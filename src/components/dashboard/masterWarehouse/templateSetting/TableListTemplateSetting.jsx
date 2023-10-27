import React from 'react'

import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import DataGrid from 'src/components/custom/table/DataGrid'

function TableListTemplateSetting({
    data,
    handleComponent,
    handleToogle
}) {

    const toogle = (value, data) => {
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

    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            cellStyle: { textAlign: 'center' },
            maxWidth: 80,
            filter: false
        },
        {
            field: 'processName',
            headerName: 'Process Name',
            cellStyle: { textAlign: 'left' },
            headerStyle: { textAlign: 'center' },
            maxWidth: 250
        },
        {
            field: 'templateName',
            headerName: 'Template Name',
            cellStyle: { textAlign: 'left' },
            headerStyle: { textAlign: 'center' },
            minWidth: 350
        },
        {
            field: 'templateURL',
            headerName: 'Template URL',
            cellStyle: { textAlign: 'center' },
            minWidth: 350
        },
        {
            field: 'isActive',
            headerName: 'IS ACTIVE',
            maxWidth: 200,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return toogle(data.isActive, data)
            }
        },
    ];


    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                />
            </CCol>
        </CRow>
    )
}

export default TableListTemplateSetting;
