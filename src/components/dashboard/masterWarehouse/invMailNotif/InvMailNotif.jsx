import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import ModalCreateInvMailNotif from './ModalCreateInvMailNotif'
import TableListInvMailNotif from './TableListInvMailNotif'

function InvMailNotif({ open, setOpen, data }) {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreateInvMailNotif, setModalCreateInvMailNotif] = useState(false)

    useEffect(() => {
        if (Global?.user?.token && open) {
            dispatch(actions.getListInvMailNotif(data?.whId))
        }
    }, [open]);


    const handleCreate = () => {
        setModalCreateInvMailNotif(true)
    }

    const handleComponent = useCallback(
        (type, data) => {
            if (type === "delete") handleDeleteInvMailNotif(data?.invMailNotifId);
        }
    )

    const handleDeleteInvMailNotif = (invMailNotifId) => {
        dispatch(actions.deleteInvMailNotif(invMailNotifId))
            .then(resp => {
                if (resp === 'success') {
                    dispatch(actions.getListInvMailNotif(data?.whId))
                }
            })
    }

    return (
        <>
            <CModal
                size="xl"
                visible={open}
                onClose={() => setOpen(false)}
                backdrop="static"
                keyboard={false}
            >
                <CModalHeader>
                    <CModalTitle>Recipient Mail Register</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className='mb-2'>
                        <CCol className="d-none d-md-block text-end">
                            <CButton className="colorBtn-white" onClick={handleCreate}>
                                <CIcon icon={cilPlus} className="me-2 text-warning" />
                                ADD RECIPIENT MAIL
                            </CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <TableListInvMailNotif
                                data={Dashboard?.listInvMailNotif}
                                handleComponent={handleComponent}
                            />
                        </CCol>
                    </CRow>

                </CModalBody>
            </CModal>

            <ModalCreateInvMailNotif
                open={modalCreateInvMailNotif}
                setOpen={setModalCreateInvMailNotif}
                whId={data?.whId}
            />
        </>
    )
}

export default InvMailNotif;
