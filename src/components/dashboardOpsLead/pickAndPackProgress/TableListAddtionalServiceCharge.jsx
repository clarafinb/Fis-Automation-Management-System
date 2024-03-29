import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TableListAddtionalServiceCharge({
    data,
    handleDeleteAddService
}) {

    const handleAction = (custOrderRequestServiceChargeId) => {
        return (
            <>
                <CButton className='colorBtnIcon-red p-1'>
                    <FontAwesomeIcon
                        icon={faTrash}
                        className='textWhite px-1'
                        title='Delete Addtional Service'
                        onClick={() => handleDeleteAddService(custOrderRequestServiceChargeId)}
                    />
                </CButton>
            </>
        )
    }

    const columns = [
        {
            field: 'no',
            headerName: 'NO',
            headerStyle: { textAlign: 'center' },
            cellStyle: { textAlign: 'center' },
            filter: false,
            minWidth: 80,
        },
        {
            field: 'serviceChargeCode',
            headerName: 'SVC Code',
            minWidth: 150,
        },
        {
            field: 'serviceCharge',
            headerName: 'SVC Desc',
            minWidth: 150,
        },
        {
            field: 'uom',
            headerName: 'UOM',
            minWidth: 100,
        },
        {
            field: 'serviceQty',
            headerName: 'QTY',
            headerStyle: { textAlign: 'center' },
            minWidth: 150,
        },
        {
            field: 'custOrderRequestServiceChargeId',
            headerName: 'Action',
            filter: false,
            pinned: 'right',
            cellStyle: { textAlign: 'center' },
            maxWidth: 80,
            cellRenderer: ({ data }) => {
                return handleAction(data.custOrderRequestServiceChargeId)
            }
        }
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <DataGrid
                    data={data}
                    columns={columns}
                    minHeight={250}
                />
            </CCol>
        </CRow>
    )
}

export default TableListAddtionalServiceCharge;
