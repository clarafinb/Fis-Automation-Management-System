import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import DataGrid from 'src/components/custom/table/DataGrid'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { formatStandartDate } from 'src/helper/globalHelper'

function TableListSubDistrict({
    data,
    handleComponent,
    handleToogle
}) {
    const handleAction = (value, data) => {
        return (
            <>
                <CButton className='colorBtnIcon-black p-1 me-2'>
                    <CIcon
                        icon={cilPencil}
                        className=""
                        onClick={() =>
                            handleComponent("edit", value, data)
                        }
                    />
                </CButton>
            </>
        )
    }

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
            field: 'provinceName',
            headerName: 'PROVINCE NAME',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'subDistrictName',
            headerName: 'SUB DISTRICT',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'postalCode',
            headerName: 'POSTAL CODE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'mrsCode',
            headerName: 'MRS CODE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'modifyName',
            headerName: 'CREATE BY',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'modifyDate',
            headerName: 'CREATE DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.modifyDate)
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
        {
            field: 'subDistrictId',
            headerName: 'ACTION',
            minWidth: 100,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return handleAction(data.subDistrictId, data)
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

export default TableListSubDistrict;
