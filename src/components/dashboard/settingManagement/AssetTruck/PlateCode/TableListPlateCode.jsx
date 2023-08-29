import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import DataGrid from 'src/components/custom/table/DataGrid'

function TableListPlateCode({
    data,
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
            filter:false
        },
        {
            field: 'platCode',
            headerName: 'PLATE CODE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'isActive',
            headerName: 'ACTIVE STATUS',
            minWidth: 100,
            cellStyle: { textAlign: 'center' },
            filter:false,
            cellRenderer: ({ data }) => {
                return toogle(data.isActive, data)
            }
        }
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                    minHeight={400}
                />
            </CCol>
        </CRow>
    )
}

export default TableListPlateCode;
