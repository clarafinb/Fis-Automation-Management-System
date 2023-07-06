import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import SmartTable from '../custom/table/SmartTable'
// import ModalCreateModalWarehouseMembership from 'src/components/dashboard/ModalCreateModalWarehouseMembership'

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
        (name, val, id) => {
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

    const filterValue = [
        { name: 'whName', operator: 'startsWith', type: 'string', value: '' },
        { name: 'whCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'isMainWH', operator: 'startsWith', type: 'string', value: '' }
    ];

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'whName', header: 'Warehouse', defaultFlex: 1 },
        { name: 'whCode', header: 'Warehouse Code', defaultFlex: 1 },
        { name: 'isMainWH', header: 'Main WH', defaultFlex: 1, textAlign: 'center' },
        {
            name: 'whMemberStatus',
            header: 'Action',
            defaultFlex: 1,
            textAlign: 'center',
            render: ({ value, cellProps }) => value === "notmember"
                ? <FontAwesomeIcon
                    icon={faCheck}
                    className='textBlue'
                    onClick={() =>
                        handleComponent("whMemberStatus", value, cellProps.data.detail.whId)} />
                : <FontAwesomeIcon
                    icon={faXmark}
                    className='textBlue'
                    onClick={() =>
                        handleComponent("whMemberStatus", value, cellProps.data.detail.whId)} />

        }
    ];


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
                            <SmartTable
                                data={Dashboard?.listWarehouseMembership}
                                filterValue={filterValue}
                                columns={columns}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        </>
    )
}

export default ModalWarehouseMembership