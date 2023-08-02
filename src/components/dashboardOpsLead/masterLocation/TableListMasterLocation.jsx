import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import DataGrid from 'src/components/custom/table/DataGrid';
import { formatStandartDate } from 'src/helper/globalHelper';

function TableListMasterLocation({
    data,
    handleComponent,
    handleToogle
}) {

    const handleAction = (value) => {
        return (
            <>
                <CButton className='colorBtnIcon-black p-1 me-2'>
                    <CIcon
                        icon={cilTrash}
                        className=""
                        onClick={() =>
                            handleComponent("delete", value)
                        }
                    />
                </CButton>
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
            field: 'pointCode',
            headerName: 'POINT CODE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'address',
            headerName: 'ADDRESS',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'longitude',
            headerName: 'LONGITUDE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'latitude',
            headerName: 'LATITUDE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'routeTypeCode',
            headerName: 'ROUTE TYPE',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'defineBy',
            headerName: 'DEFINE BY',
        },
        {
            field: 'defineDate',
            headerName: 'DEFINE DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.defineDate)
            }
        },
        {
            field: 'pointCodeId',
            headerName: 'ACTION',
            minWidth: 100,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return handleAction(data.pointCodeId)
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

export default TableListMasterLocation
