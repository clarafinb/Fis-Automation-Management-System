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

function TableListAssetTruck({
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
            filter:false
        },
        {
            field: 'transportType',
            headerName: 'TRANPORT TYPE',
            minWidth: 200,
        },
        {
            field: 'numberPlate',
            headerName: 'NUMBER PLATE',
            minWidth: 200,
        },
        {
            field: 'stnkNumber',
            headerName: 'STNK NUMBER',
        },
        {
            field: 'ownerName',
            headerName: 'OWNER NAME',
        },
        {
            field: 'stnkExpiryDate',
            headerName: 'STNK EXPIRY DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.stnkExpiryDate)
            }
        },
        {
            field: 'vehicleOwnership',
            headerName: 'OWNERSHIP',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'modifiedUser',
            headerName: 'MODIFY USER',
        },
        {
            field: 'modifyDate',
            headerName: 'MODIFIED DATE',
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
            filter:false,
            cellRenderer: ({ data }) => {
                return toogle(data.isActive, data)
            }
        },
        {
            field: 'vehicleId',
            headerName: 'ACTION',
            minWidth: 100,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter:false,
            cellRenderer: ({ data }) => {
                return handleAction(data.vehicleId, data)
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

export default TableListAssetTruck;
