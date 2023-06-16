import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCard,
    CCardBody,
    CCol,
    CRow
} from '@coreui/react'
import {
    cilMedicalCross,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import StandardTable from 'src/components/custom/table/StandardTable'
import * as actions from '../../config/redux/Dashboard/actions'
import ModalCreateProjectServiceCharge from 'src/components/dashboard/ModalCreateProjectServiceCharge'

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

    const head = [
        "No",
        "Service Charge",
        "Service Charge Code",
        "Charge Fee",
        "Currency",
        "Last Modified By",
        "Last Modified Date",
        "Active Status"
    ]

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, id) => {
            let data = Dashboard.listProjectServiceCharge[id]
            let projectServiceChargeId = data.detail.projectServiceChargeId

            dispatch(actions.setStatusActiveProjectServiceCharge(val, projectServiceChargeId,projectId))

        }, [Dashboard.listProjectServiceCharge]
    )

    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Project Service Charge List
                            </h4>
                        </CCol>
                    </CRow>
                    <br />
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <CIcon
                                icon={cilMedicalCross}
                                className="me-2 text-warning"
                                size="xl"
                                onClick={handleCreate}
                            />
                        </CCol>
                    </CRow>
                    <br />
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <StandardTable
                                head={head}
                                data={Dashboard?.listProjectServiceCharge}
                                isToogle="status"
                                handleToogle={handleToogle}
                                hide={["detail"]}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateProjectServiceCharge open={modalCreate} setOpen={setModalCreate} projectId={projectId} />
        </>
    )
}

export default ProjectServiceCharge