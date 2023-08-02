import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow
} from '@coreui/react'
import {
    cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateProjectMember from 'src/components/dashboard/masterWarehouse/projectMember/ModalCreateProjectMember'
import TableListProjectMember from 'src/components/dashboard/masterWarehouse/projectMember/TableListProjectMember'
import ModalWarehouseMembership from 'src/components/dashboard/masterWarehouse/projectMember/ModalWarehouseMembership'

function ProjectMember() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [modalWhMember, setModalWhMember] = useState(false)
    const [projectId, setProjectId] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        if (Global?.user?.token) {
            const id = window.location.href.split("/").pop();
            setProjectId(id)
            dispatch(actions.getListProjectMember(id))
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            dispatch(actions.setStatusActiveProjectMember(val, data?.projectUserId, projectId))
        }, [Dashboard.listProjectMember]
    )

    const handleComponent = useCallback(
        (action, value, data) => {

            setUserId(value)
            setModalWhMember(true)
        }
    )

    return (
        <>
            <CContainer xl>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>PR</span>
                            OJECT USER MEMBERSHIP
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol sm={5}>
                        <CButton
                            className="colorBtn-white"
                            onClick={handleCreate}>
                            <CIcon icon={cilPlus}
                                className="me-2 text-warning" />
                            ADD PROJECT USER MEMBERSHIP
                        </CButton>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCard>
                        <CCardBody>
                            <CCol>
                                <TableListProjectMember
                                    data={Dashboard?.listProjectMember}
                                    handleToogle={handleToogle}
                                    handleComponent={handleComponent}
                                />
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CRow>
                <br />
            </CContainer >
            < ModalCreateProjectMember
                open={modalCreate}
                setOpen={setModalCreate}
                projectId={projectId}
            />
            {/*  open, setOpen, projectId, userId */}
            <ModalWarehouseMembership
                open={modalWhMember}
                setOpen={setModalWhMember}
                projectId={projectId}
                userId={userId}
            />
        </>
    )
}

export default ProjectMember