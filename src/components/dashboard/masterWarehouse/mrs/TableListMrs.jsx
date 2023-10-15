import React from 'react'

import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import DataGrid from 'src/components/custom/table/DataGrid'
import { formatStandartDate } from 'src/helper/globalHelper'
import CIcon from '@coreui/icons-react'
import { cilMoney, cilPencil } from '@coreui/icons'

function TableListMrs({
    data,
    handleComponent,
    handleToogle
}) {

    const handleAction = (value, data) => {
        return (
            <>
                <CButton className='colorBtnIcon-black p-1 me-2' disabled>
                    <CIcon
                        icon={cilPencil}
                        className=""
                        onClick={() =>
                            handleComponent("edit", value, data)
                        }
                    />
                </CButton>
                <CButton className='colorBtn-yellow p-1 me-2'  title='View List of MRS'>
                    <CIcon
                        icon={cilMoney}
                        className=""
                        onClick={() =>
                            handleComponent("detail", value, data)
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
            minWidth: 80,
            filter: false
        },
        {
            field: 'MRSName',
            headerName: 'MRS NAME',
            cellStyle: { textAlign: 'center' },
            minWidth: 350
        },
        {
            field: 'totalDetailCount',
            headerName: 'TOTAL MRS',
            cellStyle: { textAlign: 'left' },
            headerStyle: { textAlign: 'center' },
            maxWidth: 150
        },
        {
            field: 'createDate',
            headerName: 'CREATE DATE',
            cellStyle: { textAlign: 'center' },
            minWidth: 350,
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.createDate)
            }
        },
        {
            field: 'modifyBy',
            headerName: 'MODIFIED BY',
            cellStyle: { textAlign: 'center' },
            minWidth: 350
        },
        {
            field: 'modifyDate',
            headerName: 'MODIFIED DATE',
            cellStyle: { textAlign: 'center' },
            minWidth: 350,
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.modifyDate)
            }
        },
        {
            field: 'inUse',
            headerName: 'IS IN USE',
            maxWidth: 95,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return toogle(data.inUse, data)
            }
        },
        {
            field: 'mrsId',
            headerName: 'ACTION',
            maxWidth: 150,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction(data.mrsId, data)
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

export default TableListMrs;
