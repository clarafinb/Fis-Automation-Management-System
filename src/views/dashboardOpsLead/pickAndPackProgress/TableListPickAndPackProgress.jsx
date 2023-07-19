import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import CIcon from '@coreui/icons-react';
import { cilPencil } from '@coreui/icons';

function TableListPickAndPackProgress({
    data,
    handleComponent,
    handleToogle
}) {

    const filterValue = [
        { name: 'whCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'custOrderRequest', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderRequestDesc', operator: 'startsWith', type: 'string', value: '' },
        { name: 'requestorName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'orderRequestDate', operator: 'startsWith', type: 'string', value: '' },
        { name: 'deliveryReqType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'transportReqType', operator: 'startsWith', type: 'string', value: '' },
        { name: 'origin', operator: 'startsWith', type: 'string', value: '' },
        { name: 'destination', operator: 'startsWith', type: 'string', value: '' },
        { name: 'totalItem', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'createDate', operator: 'startsWith', type: 'string', value: '' }
    ]

    const columns = [
        { name: 'no', header: 'No', defaultWidth: 70, type: 'number' },
        {
            name: 'orderReqId',
            header: 'ACTION',
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value, data }) => {
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
        },
        { name: 'whCode', header: 'WH CODE', defaultWidth: 120 },
        { name: 'custOrderRequest', header: 'CUSTOMER ORDER REQUEST', defaultWidth: 300 },
        { name: 'orderRequestDesc', header: 'ORDER REQ DESC', defaultWidth: 230 },
        { name: 'requestorName', header: 'REQUESTOR', defaultWidth: 230 },
        {
            name: 'orderRequestDate',
            header: 'ORDER REQUEST DATE',
            defaultWidth: 200,
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        { name: 'deliveryReqType', header: 'DELIVERY REQ TYPE', defaultWidth: 230 },
        { name: 'transportReqType', header: 'TRANSPORT REQ TYPE', defaultWidth: 230 },
        { name: 'origin', header: 'ORIGIN', defaultWidth: 200 },
        { name: 'destination', header: 'DESTINATION', defaultWidth: 350 },
        {
            name: 'totalItem',
            header: 'TOTAL ITEM REQUEST',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value, data }) => {
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
        },
        { name: 'createBy', header: 'CREATED BY', defaultWidth: 250 },
        {
            name: 'createDate',
            header: 'CREATED DATE',
            defaultWidth: 200,
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
            }
        },
    ]

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                <SmartTable
                    data={data}
                    columns={columns}
                    filterValue={filterValue}
                    minHeight={300}
                />
            </CCol>
        </CRow>
    )
}

export default TableListPickAndPackProgress
