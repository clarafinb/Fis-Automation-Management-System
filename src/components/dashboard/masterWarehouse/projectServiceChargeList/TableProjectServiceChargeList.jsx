import React from 'react'

import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import DataGrid from 'src/components/custom/table/DataGrid'
import { formatStandartDate } from 'src/helper/globalHelper'
import { separateComma } from 'src/utils/number'

function TableProjectServiceChargeList({
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

    const badge = (value) => {
        return (
            <CBadge
                className={value === "yes"
                    ? "badge-info"
                    : "badge-secondary"
                }
            >
                {value === "yes"
                    ? "YES"
                    : "NO"
                }
            </CBadge>
        )
    }

    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            cellStyle: { textAlign: 'center' },
            minWidth: 150,
            filter: false
        },
        {
            field: 'serviceCharge',
            headerName: 'SERVICE CHARGE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'serviceChargeCode',
            headerName: 'SERVICE CHARGE CODE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'hasFixedPrice',
            headerName: 'IS FIXED PRICE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ value }) => {
                return badge(value)
            }
        },
        {
            field: 'chargeFee',
            headerName: 'CHARGE FEE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ value }) => {
                return (separateComma(value))
            }
        },
        {
            field: 'currencyName',
            cellStyle: { textAlign: 'center' },
            headerName: 'CURRENCY',
        },
        {
            field: 'modifiedBy',
            headerName: 'modifiedBy',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'modifiedDate',
            headerName: 'LAST MODIFIED DATE',
            minWidth: 150,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.modifiedDate)
            }
        },
        {
            field: 'isActive',
            headerName: 'ACTIVE STATUS',
            minWidth: 80,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return toogle(data.isActive, data)
            },
            filter: false
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

export default TableProjectServiceChargeList
