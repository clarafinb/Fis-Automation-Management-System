import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow
} from '@coreui/react'
import {
    cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateProjectServiceCharge from 'src/components/dashboard/masterWarehouse/projectServiceChargeList/ModalCreateProjectServiceCharge'
import TableProjectServiceChargeList from 'src/components/dashboard/masterWarehouse/projectServiceChargeList/TableProjectServiceChargeList'

function ProjectServiceCharge() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState()

    useEffect(() => {
        if (Global?.user?.token) {
            const id = window.location.href.split("/").pop();
            setProjectId(id)
            dispatch(actions.getListProjectServiceCharge(id))
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let projectServiceChargeId = data.projectServiceChargeId
            dispatch(actions.setStatusActiveProjectServiceCharge(val, projectServiceChargeId, projectId))
        }, [Dashboard.listProjectServiceCharge]
    )

    return (
        <>
            <CRow className='mb-4'>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>PR</span>
                        OJECT SERVICE CHARGE LIST
                    </h4>
                </CCol>
            </CRow>
            <CRow className='mb-4'>
                <CCol sm={5}>
                    <CButton
                        className="colorBtn-white"
                        onClick={handleCreate}>
                        <CIcon icon={cilPlus}
                            className="me-2 text-warning" />
                        ADD PROJECT SERVICE CHARGE
                    </CButton>
                </CCol>
            </CRow>
            <CRow>
                <CCard>
                    <CCardBody>
                        <CCol>
                            <TableProjectServiceChargeList
                                data={Dashboard?.listProjectServiceCharge}
                                handleToogle={handleToogle}
                            />
                        </CCol>
                    </CCardBody>
                </CCard>
            </CRow>

            <ModalCreateProjectServiceCharge
                open={modalCreate}
                setOpen={setModalCreate}
                projectId={projectId} />
        </>
    )
}

export default ProjectServiceCharge