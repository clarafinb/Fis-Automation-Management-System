import React, { useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
} from '@coreui/react'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import TableListOrderRequest from './TableListOrderRequest'

function ModalListOrderRequest({
    open,
    setOpen,
    data,
}) {
    const { dispatch, Global, DashboardOpsLead } = useRedux()

    useEffect(() => {
        if (Global?.user?.token && open) {
            dispatch(actions.getOrderRequestNeedGroupWithoutAssignmentYet(
                data?.orderReqId,
                data?.deliveryModeId,
                data?.whId
            ))
        }
    }, [Global?.user, open]);

    return (
        <CModal
            size="lg"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Add Customer Order Request</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol className="d-none d-md-block text-end">
                        <TableListOrderRequest
                            data={DashboardOpsLead?.listOrdeRequestAdditionalService}
                            transportArrangmentId={data?.transportArrangmentId}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
        </CModal>
    )
}

export default ModalListOrderRequest;
