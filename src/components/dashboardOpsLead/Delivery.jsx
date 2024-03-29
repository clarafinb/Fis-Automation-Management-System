import { CBadge, CButton, CCol, CRow } from '@coreui/react'
import React from 'react'
import DataGrid from '../custom/table/DataGrid';

function Delivery({ data, handleNavigator }) {

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
                    fontSize: 13
                }}
            >
                {
                    data?.totalTransaction && data?.totalTransaction > 1 ?
                        data.totalTransaction + ' TRANSACTIONS'
                        :
                        data.totalTransaction + ' TRANSACTION' || 0 + ' TRANSACTION'
                }
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
            headerName: 'DELIVERY NAME',
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
                        minHeight={530}
                    />
                </CCol>
            </CRow>
        </>
    )
}

export default Delivery
