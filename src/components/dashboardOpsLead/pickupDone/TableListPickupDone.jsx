import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilPencil } from '@coreui/icons';
import DataGrid from 'src/components/custom/table/DataGrid';
import { formatStandartDate } from 'src/helper/globalHelper';

function TableListPickupDone({
    data,
    handleComponent,
}) {

    const handleAction = (data) => {
        return (
            <>
                <CButton className='colorBtnIcon-black p-1 me-2'>
                    <CIcon
                        icon={cilPencil}
                        title='Pickup Done and waiting HO Complete'
                        onClick={() =>
                            handleComponent("detail", data)
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
            headerStyle: { textAlign: 'center' },
            cellStyle: { textAlign: 'center' },
            filter: false,
            minWidth: 80,
        },
        {
            field: 'whCode',
            headerName: 'WH CODE',
        },
        {
            field: 'whName',
            headerName: 'WH NAME',
        },
        {
            field: 'custOrderRequest',
            headerName: 'CUST ORDER REQUEST',
        },
        {
            field: 'orderRequestDesc',
            headerName: 'ORDER REQ DESC',
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
            field: 'siteId',
            headerName: 'SITE ID',
        },
        {
            field: 'siteName',
            headerName: 'SITE NAME',
        },
        {
            field: 'taskAcceptDate',
            headerName: 'TASK ACCEPT DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.taskAcceptDate)
            }
        },
        {
            field: 'dispatcherName',
            headerName: 'DISPATCHER NAME',
        },
        {
            field: 'onsiteDate',
            headerName: 'ONSITE DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.onsiteDate)
            }
        },
        {
            field: 'pickupDate',
            headerName: 'PICKUP DATE',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.pickupDate)
            }
        },
        {
            field: 'orderReqId',
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

export default TableListPickupDone;
