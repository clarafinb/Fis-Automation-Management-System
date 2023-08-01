import React from 'react'

import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import DataGrid from 'src/components/custom/table/DataGrid'
import { formatStandartDate } from 'src/helper/globalHelper'

function TableListSku({
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
            minWidth: 150
        },
        {
            field: 'materialCode',
            headerName: 'MATERIAL CODE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'materialDesc',
            headerName: 'MATERIAL DESC',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'totalVolume',
            headerName: 'TOTAL VOLUME',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'uom',
            headerName: 'UOM',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'modifiedBy',
            headerName: 'LAST MODIFIED BY',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'modifiedDate',
            headerName: 'LAST MODIFIED DATE',
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

export default TableListSku;
