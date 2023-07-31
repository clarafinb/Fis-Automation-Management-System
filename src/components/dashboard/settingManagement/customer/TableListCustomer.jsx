import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import { formatStandartDate } from 'src/helper/globalHelper'
import DataGrid from 'src/components/custom/table/DataGrid'

function TableListCustomer({
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
            minWidth: 150,
        },
        {
            field: 'customer_name',
            headerName: 'CUSTOMER NAME',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'customer_alias_name',
            headerName: 'CUSTOMER ALIAS NAME',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'modifiedBy',
            headerName: 'MODIFIED BY',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'modifiedDate',
            headerName: 'MODIFIED DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.modifiedDate)
            }
        },
        {
            field: 'isActive',
            headerName: 'ACTIVE STATUS',
            minWidth: 100,
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

export default TableListCustomer
