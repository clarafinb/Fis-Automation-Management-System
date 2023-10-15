import React from 'react'

import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { separateComma } from 'src/utils/number'

function TableListMrsDetail({
    data,
    handleComponent,
}) {

    const handleAction = (data) => {
        return (
            <>
                {data.hasDeleteFunction !== 'no' ?
                    <CButton className='colorBtnIcon-black p-1 me-2'>
                        <CIcon
                            icon={cilTrash}
                            className=""
                            title='Delete Mrs Detail'
                            onClick={() =>
                                handleComponent("delete", data)
                            }
                        />
                    </CButton>
                    : ''}
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
            field: 'mrsName',
            headerName: 'MRS NAME',
            cellStyle: { textAlign: 'center' },
            minWidth: 200
        },
        {
            field: 'transportMode',
            headerName: 'TRANSPORT MODE',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200
        },
        {
            field: 'transportName',
            headerName: 'TRANSPORT TYPE',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200
        },
        {
            field: 'originProvinceName',
            headerName: 'ORIGIN PROVINCE',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200
        },
        {
            field: 'originSubdistrictName',
            headerName: 'ORIGIN SUBDISTRICT',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200
        },
        {
            field: 'destinationProvinceName',
            headerName: 'DESTINATION PROVINCE',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200
        },
        {
            field: 'destinationSubdistrictName',
            headerName: 'DESTINATION SUBDISTRICT',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200
        },
        {
            field: 'chargeRate',
            headerName: 'CHARGE FEE',
            headerStyle: { textAlign: 'center' },
            maxWidth: 200,
            cellRenderer: ({ value }) => {
                return (separateComma(value))
            }
        },
        {
            field: 'mrsDetailId',
            headerName: 'ACTION',
            maxWidth: 100,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction(data)
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

export default TableListMrsDetail;
