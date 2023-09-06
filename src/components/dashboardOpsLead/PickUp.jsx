import { CBadge, CButton, CCard, CCardBody, CCardText, CCol, CRow } from '@coreui/react'
import React from 'react'
import DataGrid from '../custom/table/DataGrid'

function PickUp({ data, handleNavigator }) {
    const handleAction = (data) => {
        return (
            <>
                <CButton
                    className='colorBtnIcon-blue px-2 m-2'
                    onClick={() => handleNavigator(data?.key, data)}
                >
                    Detail
                </CButton>
            </>
        )
    }

    const badge = (data) => {
        return (
            <CBadge
                style={{
                    color: data?.color,
                    backgroundColor: `rgba(${parseInt(data?.color.slice(1, 3), 16)}, 
                    ${parseInt(data?.color.slice(3, 5), 16)}, 
                    ${parseInt(data?.color.slice(5, 7), 16)}, 
                    0.1)`,
                }}
            >
                {data?.totalTransaction} Transactions
            </CBadge>
        )
    }

    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            maxWidth: 80,
            filter: false,
            cellStyle: { textAlign: 'center' }
        },
        {
            field: 'totalTransaction',
            headerName: 'TOTAL TRANSACTION',
            minWidth: 250,
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return badge(data)
            }
        },
        {
            field: 'transaction',
            headerName: 'PICKUP NAME',
        },

        {
            field: 'key',
            headerName: 'ACTION',
            cellStyle: { textAlign: 'center' },
            minWidth: 100,
            // pinned: 'right',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction(data)
            }
        },
    ];

    return (
        <>
            <CRow>
                <CCol className="d-none d-md-block text-end">
                    <DataGrid
                        data={data}
                        columns={columns}
                        minHeight={560}
                    />
                </CCol>
            </CRow>
        </>
    )
}

export default PickUp
