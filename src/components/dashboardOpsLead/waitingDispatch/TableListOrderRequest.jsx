import React from 'react'
import {
    CButton,
    CCol,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import { useRedux } from 'src/utils/hooks'
import SmartTable from 'src/components/custom/table/SmartTable'

function TableListAddtionalServiceCharge({
    data,
    transportArrangmentId,
}) {
    const { dispatch, Global } = useRedux()

    const handleSave = (orderReqId) => {
        let payload = {
            transportArrangmentId: transportArrangmentId,
            orderReqId: orderReqId,
            LMBY: Global?.user?.userID
        }
        dispatch(
            actions.transportArrangementAddOrderRequest(
                payload
            )
        )
    }

    const handleAction = (orderReqId) => {
        return (
            <>
                <CButton
                    className='colorBtnIcon-black px-2 m-2'
                >
                    <CIcon
                        icon={cilPlus}
                        onClick={() =>
                            handleSave(orderReqId)
                        }
                    />
                </CButton>
            </>
        )
    }

    const filter = [
        {
            name: 'orderRequestNo',
            operator: 'contains',
            type: 'string',
            value: ''
        }
    ]

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'orderRequestNo', header: 'Customer Order Request', defaultFlex: 1 },
        {
            name: 'orderReqId',
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
                <SmartTable
                    data={data}
                    columns={columns}
                    filterValue={filter}
                    minHeight={200}
                />
            </CCol>
        </CRow>
    )
}

export default TableListAddtionalServiceCharge
