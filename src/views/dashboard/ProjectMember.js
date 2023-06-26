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
import ModalCreateProjectMember from 'src/components/dashboard/ModalCreateProjectMember'

function ProjectMember() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState()

    useEffect(() => {
        if (Global?.user?.token) {
            const id = window.location.href.split("/").pop();
            setProjectId(id)
            dispatch(actions.getListProjectMember(id))
        }
    }, [Global?.user]);

    const head = [
        "No",
        "Fullname",
        "Role",
        "Email",
        "Phone No",
        "User Status",
        "Active Status"
    ]

    const searchFilter = {
        "Fullname" : "name",
        "Role" : "role",
        "Email" : "email",
        "Phone No" : "phoneNo"
    }

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, id) => {
            let data = Dashboard.listProjectMember[id]
            let projectUserId = data.detail.projectUserId
            dispatch(actions.setStatusActiveProjectMember(val, projectUserId,projectId))

        }, [Dashboard.listProjectMember]
    )

    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Project User Membership
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
                                data={Dashboard?.listProjectMember}
                                isToogle="status"
                                handleToogle={handleToogle}
                                hide={["detail"]}
                                searchFilter={searchFilter}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateProjectMember open={modalCreate} setOpen={setModalCreate} projectId={projectId} />
        </>
    )
}

export default ProjectMember