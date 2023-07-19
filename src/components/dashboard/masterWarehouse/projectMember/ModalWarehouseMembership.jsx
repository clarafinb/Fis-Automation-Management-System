import React, { useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import TableListWarehouseMembership from './TableListWarehouseMembership'

function ModalWarehouseMembership({ open, setOpen, projectId, userId }) {
    const { dispatch, Global, Dashboard } = useRedux()
    useEffect(() => {
        if (Global?.user?.token) {
            if (projectId && userId && open) {
                dispatch(actions.getListWarehouseMembership(projectId, userId))
            }
        }
    }, [open]);

    const handleComponent = useCallback(
        (val, id) => {
            let payload = {
                "whId": id,
                "userId": userId,
                "LMBY": Global?.user?.userId
            }
            if (val === "notmember") {
                dispatch(actions.setWhProjectMembership(payload, projectId))
            } else {
                dispatch(actions.deleteWhProjectMembership(payload, projectId))
            }
        }
    )

    return (
        <>
            <CModal
                size="lg"
                visible={open}
                onClose={() => setOpen(false)}
                alignment='center'
            >
                <CModalHeader>
                    <CModalTitle>Warehouse Membership</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <TableListWarehouseMembership
                                data={Dashboard?.listWarehouseMembership}
                                handleComponent={handleComponent}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        </>
    )
}

export default ModalWarehouseMembership