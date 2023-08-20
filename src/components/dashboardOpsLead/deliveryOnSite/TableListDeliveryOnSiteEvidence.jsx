import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid';
import CIcon from '@coreui/icons-react';
import { cilFile, cilTrash } from '@coreui/icons';

function TableListDeliveryOnSiteEvidence({
    data,
    handleComponent
}) {

    const handleAction = (data) => {
        return (
            <>
                <CButton className='colorBtnIcon-red p-1'>
                    <CIcon
                        icon={cilTrash}
                        className=""
                        title='Delete'
                        onClick={() =>
                            handleComponent("delete", data)
                        }
                    />
                </CButton>
            </>
        )
    }

    const handleDonwloadFile = (data) => {
        return (
            <>
                <CButton className="colorBtn-yellow me-3">
                    <CIcon
                        icon={cilFile}
                        className=""
                        title='Download'
                        onClick={() =>
                            handleComponent("download", data)
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
            minWidth: 100,
        },
        {
            field: 'fileName',
            headerName: 'FILENAME'
        },
        {
            field: 'filePath',
            headerName: 'DOWNLOAD',
            headerStyle: { textAlign: 'center' },
            cellStyle: { textAlign: 'center' },
            filter: false,
            minWidth: 100,
            cellRenderer: ({ data }) => {
                return handleDonwloadFile(data)
            }
        },
        {
            field: 'orderReqId',
            headerName: 'ACTION',
            minWidth: 100,
            cellStyle: { textAlign: 'center' },
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
                    minHeight={300}
                />
            </CCol>
        </CRow>
    )
}

export default TableListDeliveryOnSiteEvidence;
