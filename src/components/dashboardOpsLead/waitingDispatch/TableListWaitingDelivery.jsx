import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import CIcon from '@coreui/icons-react';
import { cilPencil } from '@coreui/icons';
import DataGrid from 'src/components/custom/table/DataGrid';
import { formatStandartDate } from 'src/helper/globalHelper';

function TableListWaitingDelivery({
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
                            handleComponent("detail", value, data)
                        }
                    />
                </CButton>
            </>
        )
    }

    const hadleTotalItem = (value, data) => {
        return (
            <>
                <CButton
                    className='colorBtnIcon-black'
                    onClick={() => handleComponent("item", value, data)}
                >
                    <span>{value} ITEM </span>
                    <FontAwesomeIcon
                        icon={faEye}
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
            minWidth: 80,
            filter: false
        },
        {
            field: 'whCode',
            headerName: 'WH CODE',
        },
        {
            field: 'custOrderRequest',
            headerName: 'CUSTOMER ORDER REQUEST',
        },
        {
            field: 'orderRequestDesc',
            headerName: 'ORDER REQUEST DESC',
        },
        {
            field: 'requestorName',
            headerName: 'REQUESTOR',
        },
        {
            field: 'orderRequestDate',
            headerName: 'ORDER REQUEST DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.orderRequestDate)
            }
        },
        {
            field: 'deliveryReqType',
            headerName: 'DELIVERY REQ TYPE',
        },
        {
            field: 'transportReqType',
            headerName: 'TRANSPORT REQ TYPE',
        },
        {
            field: 'origin',
            headerName: 'ORIGIN',
        },
        {
            field: 'destination',
            headerName: 'DESTINATION',
        },
        {
            field: 'totalItem',
            headerName: 'TOTAL ITEM REQUEST',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return hadleTotalItem(data.totalItem, data)
            }
        },
        {
            field: 'rfpConfirmBy',
            headerName: 'PICK AND PACK DONE BY',
        },
        {
            field: 'pickandpackcompletedate',
            headerName: 'PICK AND PACK COMPLETE DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.pickandpackcompletedate)
            }
        },
        {
            field: 'orderReqId',
            headerName: 'ACTION',
            maxWidth: 100,
            filter: false,
            cellStyle: { textAlign: 'center' },
            pinned: 'right',
            cellRenderer: ({ data }) => {
                return handleAction(data.orderReqId, data)
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

export default TableListWaitingDelivery
