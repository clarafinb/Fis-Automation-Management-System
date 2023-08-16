import React from 'react'
import {
    CButton,
    CCol,
    CFormInput,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import DataGrid from 'src/components/custom/table/DataGrid'

function TableListAddtionalServiceCharge({
    data,
    handleChangeQty,
    handleComponentQty
}) {

    const handleAction = (projectServiceChargeId) => {
        return (
            <>
                <CButton
                    className='colorBtnIcon-black px-2 m-2'
                >
                    <CIcon
                        icon={cilPlus}
                        onClick={() =>
                            handleComponentQty(projectServiceChargeId)
                        }
                    />
                </CButton>
            </>
        )
    }

    const handleInputQty = (selectedData) => {
        return (
            <>
                <CFormInput
                    className='form-control mt-1'
                    type="text"
                    name="qty"
                    onChange={(e) => handleChangeQty(e, selectedData)}
                />
            </>
        )
    }

    const columns = [
        { field: 'no', headerName: 'NO', minWidth: 100, filter: false },
        { field: 'serviceChargeCode', headerName: 'SVC CODE', minWidth: 200, },
        { field: 'serviceCharge', headerName: 'SVC DESC', minWidth: 200, },
        { field: 'uom', headerName: 'UOM', minWidth: 200, },
        {
            field: 'serviceQty',
            headerName: 'QTY',
            cellStyle: { textAlign: 'center' },
            filter: false,
            cellRenderer: ({ data }) => {
                return handleInputQty(data)
            }
        },
        {
            field: 'projectServiceChargeId',
            headerName: 'ACTION',
            cellStyle: { textAlign: 'center' },
            minWidth: 80,
            filter: false,
            cellRenderer: ({ data }) => {
                return handleAction(data?.projectServiceChargeId)
            }
        },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                    minHeight={400}
                />
            </CCol>
        </CRow>
    )
}

export default TableListAddtionalServiceCharge
