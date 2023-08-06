import React from 'react'
import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import DataGrid from 'src/components/custom/table/DataGrid'
import { formatStandartDate } from 'src/helper/globalHelper'

function TableListEvidenceChecklist({
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

    const handleLabelMandatory = (value) => {
        let badge = "dark"
        if (value === 'false') badge = "danger"
        if (value === 'true') badge = "success"
        return (
            <CBadge
                color={badge}
            >
                {value}
            </CBadge>
        )
    }

    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            cellStyle: { textAlign: 'center' },
            filter: false,
            minWidth: 150,
        },
        {
            field: 'checklistName',
            headerName: 'Checklist Name',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'isMandatory',
            headerName: 'Mandatory',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return handleLabelMandatory(data?.isMandatory?.toString())
            }
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

export default TableListEvidenceChecklist
