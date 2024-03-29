import React, { useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import TableProjectList from './TableProjectList'

function ModalProjectList({ open, setOpen, handleProject }) {
    const { dispatch, Global, Dashboard } = useRedux()

    useEffect(() => {
        if (Global?.user?.userID && open) {
            dispatch(actions.getListProjectByUser(Global?.user?.userID))
        }
    }, [Global?.user, open]);

    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
            alignment="center"
        >
            <div className='m-3'>
                <CModalHeader>
                    <CModalTitle>LIST PROJECT</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <TableProjectList
                        data={Dashboard?.listProject}
                        handleComponent={handleProject}
                    />
                </CModalBody>
            </div>

        </CModal>
    )
}

export default ModalProjectList
