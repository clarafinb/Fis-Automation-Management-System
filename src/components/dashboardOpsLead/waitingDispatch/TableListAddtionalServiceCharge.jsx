import React, { useCallback, useState } from 'react'
import {
    CButton,
    CCol,
    CFormInput,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import DataGrid from 'src/components/custom/table/DataGrid'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import { useRedux } from 'src/utils/hooks'
import SmartTable from 'src/components/custom/table/SmartTable'

function TableListAddtionalServiceCharge({
    data,
    transportArrangmentId
}) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})

    const handleComponentQty = useCallback(
        (projectServiceChargeId) => {
            if (values[projectServiceChargeId]) {
                let payload = {
                    transportArrangmentId: transportArrangmentId,
                    projectServiceChargeId: projectServiceChargeId,
                    serviceQty: values[projectServiceChargeId],
                    LMBY: Global?.user?.userID
                }

                dispatch(actions.addTransportArrangmentServiceCharge(payload))
            } else {
                alert("Qty is Empty !")
            }
        }
    )

    const handleChangeQty = useCallback(
        (e, data) => {
            const { value } = e.target;
            setValues((prev) => ({
                ...prev,
                [data?.projectServiceChargeId]: value
            }));

        }, [setValues]
    )

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
                    className='form-control'
                    style={{ "border-radius": 0 }}
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
            editable: true,
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

    const additionalServiceChargeColumn = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'serviceChargeCode', header: 'SVC Code', defaultFlex: 1 },
        { name: 'serviceCharge', header: 'SVC Desc', defaultFlex: 1 },
        { name: 'uom', header: 'UOM', defaultFlex: 1 },
        {
            name: 'serviceQty',
            header: 'QTY',
            defaultFlex: 1,
            defaultWidth: 80,
            render: ({ data }) => {
                return handleInputQty(data)
            }
        }, {
            name: 'projectServiceChargeId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value }) => {
                return handleAction(value)
            }
        },
    ]

    return (
        <CRow>
            <CCol className="d-none d-md-block text-end">
                {/* <DataGrid
                    data={data}
                    columns={columns}
                    minHeight={400}
                /> */}
                <SmartTable
                    data={data}
                    columns={additionalServiceChargeColumn}
                    minHeight={200}
                />
            </CCol>
        </CRow>
    )
}

export default TableListAddtionalServiceCharge
