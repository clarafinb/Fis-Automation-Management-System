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
import * as actions from '../../config/redux/Dashboard/actions'
import ModalCreateProjectMember from 'src/components/dashboard/ModalCreateProjectMember'
import ModalWarehouseMembership from 'src/components/dashboard/ModalWarehouseMembership'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'

function ProjectMember() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState()
    const [modalWarehouse, setModalWarehouse] = useState(false)
    const [projectUserId, setProjectUserId] = useState(false)
    const [userId, setUserId] = useState(null)


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
        (val, id) => {
            dispatch(actions.setStatusActiveProjectMember(val, id, projectId))
        }, [Dashboard.listProjectMember]
    )

    const handleComponent = useCallback(
        (name, userId) => {
            setUserId(userId)
            setModalWarehouse(true)
        }
    )

    const filterValue = [
        { name: 'name', operator: 'startsWith', type: 'string' },
        { name: 'role', operator: 'startsWith', type: 'string' },
        { name: 'email', operator: 'startsWith', type: 'string' },
        { name: 'phoneNo', operator: 'startsWith', type: 'string' },
        { name: 'isActive', operator: 'startsWith', type: 'string' },
        { name: 'whMembershipList', operator: 'startsWith', type: 'string' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80 },
        { name: 'name', header: 'Fullname', defaultFlex: 1 },
        { name: 'role', header: 'Role', defaultFlex: 1 },
        { name: 'email', header: 'Email', defaultFlex: 1 },
        { name: 'phoneNo', header: 'Phone No', defaultFlex: 1 },
        { name: 'isActive', header: 'User Status', defaultFlex: 1, textAlign: 'center' },
        { name: 'whMembershipList', header: 'WH Membership', defaultFlex: 1 },
        {
            name: 'whMemberStatus',
            header: 'Warehouse Access',
            defaultFlex: 1,
            textAlign: 'center',
            render: ({ cellProps }) => {
                return (
                    <FontAwesomeIcon
                        icon={faPlus}
                        className='textBlue'
                        onClick={() =>
                            handleComponent("projectUserId", cellProps.data.detail.userId)
                        }
                    />
                )
            }
        },
        {
            name: 'status',
            header: 'Active Status',
            defaultFlex: 1,
            textAlign: 'center',
            render: ({ cellProps }) => {
                return (
                    < ToggleSwitch
                        checked={() => cellProps.data.detail.isActive}
                        size="lg"
                        handleChecked={handleToogle}
                        id={cellProps.data.detail.projectUserId}
                        className="d-flex justify-content-center"
                    />
                )
            }
        },
    ];

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
                            <SmartTable
                                data={Dashboard?.listProjectMember}
                                filterValue={filterValue}
                                columns={columns}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateProjectMember
                open={modalCreate}
                setOpen={setModalCreate}
                projectId={projectId}
            />
            <ModalWarehouseMembership
                open={modalWarehouse}
                setOpen={setModalWarehouse}
                projectId={projectId}
                // projectUserId={projectUserId}
                userId={userId}
            />
        </>
    )
}

export default ProjectMember