import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import moment from 'moment';
import CIcon from '@coreui/icons-react';
import { cilClipboard, cilTrash } from '@coreui/icons';

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
            header: 'ACTION',
            defaultWidth: 100,
            textAlign: 'center',
            render: ({ value, cellProps }) => {
                return (
                    <>
                        {cellProps.data.detail.visibleCancelledFunction !== 0 ?

                            <CButton
                                className='colorBtnIcon-black p-1 me-2'
                            >
                                <CIcon
                                    icon={cilClipboard}
                                    className=""
                                    // size="sm"
                                    onClick={() =>
                                        handleComponent("cancel", value)
                                    }
                                />
                            </CButton>
                            : ''}

                        <CButton
                            className='colorBtnIcon-red p-1'
                        >
                            <CIcon
                                icon={cilTrash}
                                className=""
                                // size="sm"
                                onClick={() =>
                                    handleComponent("delete", value)
                                }
                            />
                        </CButton>
                    </>
                )
            }
        },
        { name: 'whCode', header: 'WH CODE', defaultWidth: 120 },
        { name: 'whName', header: 'WH NAME', defaultWidth: 120 },
        { name: 'custOrderRequest', header: 'CUST ORDER REQUEST', defaultWidth: 200 },
        { name: 'orderRequestDesc', header: 'ORDER REQ DESC', defaultWidth: 200 },
        { name: 'requestorName', header: 'REQUESTOR', defaultWidth: 150 },
        {
            name: 'orderRequestDate',
            header: 'ORDER REQUEST DATE',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value }) => {
                return (
                    moment(value).format('DD-MM-YYYY HH:mm:ss')
                )
            }
        },
        { name: 'deliveryReqType', header: 'DELIVERY REQ TYPE', defaultWidth: 180 },
        { name: 'transportReqType', header: 'TRANSPORT REQ TYPE', defaultWidth: 180 },
        { name: 'origin', header: 'ORIGIN', defaultWidth: 180 },
        { name: 'destination', header: 'DESTINATION', defaultWidth: 180 },
        { name: 'orderRequestStatus', header: 'ORDER STATUS', defaultWidth: 180 },
        { name: 'cancelRemarks', header: 'CANCEL REMARKS', defaultWidth: 180 },
        { name: 'createBy', header: 'CREATE BY', defaultWidth: 180 },
        {
            name: 'createDate',
            header: 'CREATED DATE',
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
