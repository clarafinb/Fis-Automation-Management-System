import React from 'react'
import {
    CBadge,
    CCol,
    CRow,
} from '@coreui/react'
import DataGrid from 'src/components/custom/table/DataGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faImage } from '@fortawesome/free-solid-svg-icons';

function TableListHoEvidence({
    data,
    handleUpload,
    handleModalImage
}) {

    const handleAction = (data) => {
        return (
            <>
                <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    className='textBlue px-2'
                    title='Upload Evidence'
                    size='xl'
                    onClick={() =>
                        handleUpload(data)
                    }
                />
            </>
        )
    }

    const handleThumbImage = (data) => {
        return (
            <>
                {data.getEvidenceChecklists.length > 0 ?
                    <FontAwesomeIcon
                        icon={faImage}
                        className='textBlue px-2'
                        title='Image Evidence'
                        size='xl'
                        onClick={() =>
                            handleModalImage(data.getEvidenceChecklists)
                        }
                    />
                    : ''}
            </>

        )
    }

    const handleBadge = (value) => {
        return (
            <CBadge
                className={value === true
                    ? "badge-success"
                    : "badge-secondary"
                }
            >
                {value === true
                    ? "UPLOADED"
                    : "NOT UPLOADED"
                }
            </CBadge>
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
            field: 'checklistName',
            headerName: 'Checklist Name',
            filter: true,
        },
        {
            field: 'checklistType',
            headerName: 'Evidence Collection',
            cellStyle: { textAlign: 'center' },
            minWidth: 100,
            filter: false,
            cellRenderer: ({ data }) => {
                return handleThumbImage(data)
            }
        },
        {
            field: 'uploadStatus',
            cellStyle: { textAlign: 'center' },
            minWidth: 100,
            headerName: 'Upload Status',
            filter: false,
            cellRenderer: ({ data }) => {
                return handleBadge(data.uploadStatus)
            }
        },
        {
            field: 'transportArrangementId',
            cellStyle: { textAlign: 'center' },
            headerName: 'Action',
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

export default TableListHoEvidence;
