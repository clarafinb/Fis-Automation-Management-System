import React from 'react'

import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataGrid from 'src/components/custom/table/DataGrid'
import CIcon from '@coreui/icons-react'
import { cilLocationPin, cilPencil } from '@coreui/icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

function TableListWarehouse({
    data,
    handleComponent,
    handleToogle
}) {

    const handleAction = (type, value, data) => {
        return (
            <>
                <CButton className='colorBtnIcon-black p-1 me-2'>
                    <CIcon
                        icon={type === "map" ? cilLocationPin : cilPencil}
                        className=""
                        onClick={() =>
                            handleComponent(type, value, data)
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
            filter: false,
        },
        {
            field: 'whName',
            headerName: 'WAREHOUSE NAME',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'whCode',
            headerName: 'WAREHOUSE CODE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'isMainWH',
            headerName: 'MAIN CWH',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'whType',
            headerName: 'WAREHOUSE TYPE',
        },
        {
            field: 'whSpace',
            headerName: 'WAREHOUSE SPACE',
        },
        {
            field: 'whAddress',
            headerName: 'ADDRESS',
        },
        {
            field: 'whId',
            headerName: 'MAP',
            minWidth: 80,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction("map", data.userId, data)
            }
        },
        {
            field: 'isActive',
            headerName: 'ACTIVE STATUS',
            minWidth: 80,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return toogle(data.isActive, data)
            }
        },
        {
            field: 'whId',
            headerName: 'ACTION',
            minWidth: 80,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction("edit", data.whId, data)
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

export default TableListWarehouse;
