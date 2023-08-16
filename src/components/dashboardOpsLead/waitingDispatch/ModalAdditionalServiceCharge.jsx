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
import TableListAddtionalServiceCharge from './TableListAddtionalServiceCharge'

function ModalAdditionalServiceCharge({
    open,
    setOpen,
    data,
}) {
    const { dispatch, Global, DashboardOpsLead } = useRedux()

    useEffect(() => {
        if (Global?.user?.token && open) {
            dispatch(actions.getServiceChargeList(data?.transportArrangmentId, data?.projectId))
        }
    }, [Global?.user, open]);

    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Additonal Service Charge</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol className="d-none d-md-block text-end">
                        <TableListAddtionalServiceCharge
                            data={DashboardOpsLead?.listOrdeRequestAdditionalService}
                            transportArrangmentId={data?.transportArrangmentId}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
        </CModal>
    )
}

export default ModalAdditionalServiceCharge;
