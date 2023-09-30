import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react';
import DataGrid from 'src/components/custom/table/DataGrid';
import { formatStandartDate } from 'src/helper/globalHelper';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { useRedux } from 'src/utils/hooks'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'

function TableListCustomerOrderRequestList({
    data,
    transportArrangmentId
}) {

    const { dispatch, Global } = useRedux()
    const handleAction = (data) => {
        return (
            <>
                {data?.hasDeleteFunction?.toLowerCase() === 'yes' ?
                    <CButton className='colorBtnIcon-red p-1'>
                        <CIcon
                            icon={cilTrash}
                            className=""
                            title='Delete Order Request.'
                            onClick={() =>
                                handleComponent("delete", data)
                            }
                        />
                    </CButton>
                    : ''
                }
            </>
        )
    }

    const handleComponent = (action, data) => {
        if (action === 'delete') {
            const payload = {
                transportArrangmentId: transportArrangmentId,
                orderReqId: data.orderReqId,
                LMBY: Global?.user?.userID
            }
            dispatch(
                actions.transportArrangementDeleteOrderRequest(
                    payload
                )
            )
        }
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
            field: 'transportArrRefId',
            headerName: 'Arrangement Ref Id',
        },
        {
            field: 'deliveryMode',
            headerName: 'Delivery Mode',
        },
        {
            field: 'transportMode',
            headerName: 'Transport Mode',
        },
        {
            field: 'orderReqNo',
            headerName: 'Cust Order Req No',
        },
        {
            field: 'requestorName',
            headerName: 'Customer Requestor',
        },
        {
            field: 'origin',
            headerName: 'Origin',
        },
        {
            field: 'destination',
            headerName: 'Destination',
        },
        {
            field: 'pickandpackCompleteDate',
            headerName: 'Pick And Pack Complete Date',
            cellStyle: { textAlign: 'center' },
            cellRenderer: ({ data }) => {
                return formatStandartDate(data.pickandpackCompleteDate)
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
                    minHeight={350}
                />
            </CCol>
        </CRow>
    )
}

export default TableListCustomerOrderRequestList;
