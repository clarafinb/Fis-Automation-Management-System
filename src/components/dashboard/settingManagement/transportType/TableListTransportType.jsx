import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import { formatStandartDate } from 'src/helper/globalHelper'
import DataGrid from 'src/components/custom/table/DataGrid'

function TableListTransportType({
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
            minWidth: 80,
            filter: false
        },
        {
            field: 'transportMode',
            headerName: 'TRANSPORT TYPE',
            minWidth: 300,
        },
        {
            field: 'transportName',
            headerName: 'TRANSPORT NAME',
            maxWidth: 300,
        },
        {
            field: 'createName',
            headerName: 'CREATE BY',
            maxWidth: 200,
        },
        {
            field: 'createDate',
            headerName: 'CREATE DATE',
            cellStyle: { textAlign: 'center' },
            maxWidth: 200,
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'modifiedBy',
            headerName: 'MODIFIED BY',
            maxWidth: 200,
        },
        {
            field: 'modifiedDate',
            headerName: 'MODIFIED DATE',
            maxWidth: 250,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.modifiedDate)
            }
        },
        {
            field: 'isActive',
            headerName: 'ACTIVE STATUS',
            minWidth: 100,
            filter: false,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
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

export default TableListTransportType
