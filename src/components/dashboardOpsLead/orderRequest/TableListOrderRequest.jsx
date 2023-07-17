import React from 'react'
import {
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function TableListOrderRequest({
    data,
    handleComponent,
    handleToogle
}) {
    const filterValue = [
        { name: 'whCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'custOrderRequest', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderRequestDesc', operator: 'startsWith', type: 'string', value: '' },
        { name: 'requestorName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderRequestDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'deliveryReqType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'transportReqType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'origin', operator: 'startsWith', type: 'string', value: '' },
        { name: 'destination', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderRequestStatus', operator: 'startsWith', type: 'string', value: '' },
        { name: 'cancelRemarks', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createDate', operator: 'startsWith', type: 'string', value: '' }
    ]

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number', textAlign: 'center' },
        {
            name: 'orderReqId',
            header: 'Action',
            defaultWidth: 100,
            textAlign: 'center',
            render: ({ value, cellProps }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className='textBlue px-2'
                            title='Delete Order Request'
                            onClick={() =>
                                handleComponent("delete", value)
                            }
                        />
                        {cellProps.data.detail.visibleCancelledFunction !== 0 ?
                            <FontAwesomeIcon
                                icon={faClipboard}
                                className='textBlue'
                                title='Cancel Order Request'
                                onClick={() =>
                                    handleComponent("cancel", value)
                                }
                            />
                            : ''}
                    </>
                )
            }
        },
        { name: 'whCode', header: 'WH Code', defaultWidth: 120 },
        { name: 'whName', header: 'WH Name', defaultWidth: 120 },
        { name: 'custOrderRequest', header: 'Cust Order Request', defaultWidth: 200 },
        { name: 'orderRequestDesc', header: 'Order Req Desc', defaultWidth: 200 },
        { name: 'requestorName', header: 'Requestor', defaultWidth: 150 },
        {
            name: 'orderRequestDate',
            header: 'Order Request Date',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value }) => {
                return (
                    moment(value).format('DD-MM-YYYY HH:mm:ss')
                )
            }
        },
        { name: 'deliveryReqType', header: 'Delivery Req Type', defaultWidth: 180 },
        { name: 'transportReqType', header: 'Transport Req Type', defaultWidth: 180 },
        { name: 'origin', header: 'Origin', defaultWidth: 180 },
        { name: 'destination', header: 'Destination', defaultWidth: 180 },
        { name: 'orderRequestStatus', header: 'Order Status', defaultWidth: 180 },
        { name: 'cancelRemarks', header: 'Cancel Remarks', defaultWidth: 180 },
        { name: 'createBy', header: 'Created By', defaultWidth: 180 },
        {
            name: 'createDate',
            header: 'Created date',
            textAlign: 'center',
            defaultWidth: 180,
            render: ({ value }) => {
                return (
                    moment(value).format('DD-MM-YYYY')
                )
            }
        },
    ];

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <SmartTable
                    data={data}
                    columns={columns}
                    filterValue={filterValue}
                    minHeight={600}
                />
            </CCol>
        </CRow>
    )
}

export default TableListOrderRequest;
