import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import { formatStandartDate } from 'src/helper/globalHelper'
import DataGrid from 'src/components/custom/table/DataGrid'
import CIcon from '@coreui/icons-react'
import { cilImage, cilPlus, cilReload } from '@coreui/icons'

function TableListCustomer({
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

    const handleAction = (data) => {
        const hiddenAdd = data?.hasLogo === 'no' ? '' : 'hidden';
        const hiddenView = data?.hasLogo === 'no' ? 'hidden' : '';
        const hiddenReset = data?.hasLogo === 'no' ? 'hidden' : '';

        return (
            <>

                <CButton
                    className='colorBtnIcon-blue p-1 me-2'
                    title='View Logo'
                    hidden={hiddenView}
                >
                    <CIcon
                        icon={cilImage}
                        title='View Logo'
                        onClick={() =>
                            handleComponent("view", data)
                        }
                    />
                </CButton>

                <CButton
                    className='colorBtnIcon-black p-1 me-2'
                    title='Add Logo'
                    hidden={hiddenAdd}
                >
                    <CIcon
                        icon={cilPlus}
                        title='Add Logo'
                        onClick={() =>
                            handleComponent("add", data)
                        }
                    />
                </CButton>

                <CButton
                    className='colorBtnIcon-red p-1 me-2'
                    title='Reset Logo'
                    hidden={hiddenReset}
                >
                    <CIcon
                        icon={cilReload}
                        title='Reset Logo'
                        onClick={() =>
                            handleComponent("reset", data)
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
            maxWidth: 100,
            filter: false,
        },
        {
            field: 'customer_name',
            headerName: 'CUSTOMER NAME',
            cellStyle: { textAlign: 'center' },
        },
        {
            field: 'customer_alias_name',
            headerName: 'CUSTOMER ALIAS NAME',
            cellStyle: { textAlign: 'center' },
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
            maxWidth: 150,
            cellStyle: { textAlign: 'center' },
            filter: false,
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return toogle(data.isActive, data)
            }
        },
        {
            field: 'customerId',
            headerName: 'ACTION',
            maxWidth: 150,
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

export default TableListCustomer
