import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormSelect
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import TableListUserNotResgitered from './TableListUserNotResgitered'

function ModalCreateProjectMember({ open, setOpen, projectId }) {
    const { dispatch, Global, Dashboard } = useRedux()
    const [values, setValues] = useState({})
    const [role, setRole] = useState([])

    useEffect(() => {
        setValues({})
        if (Global?.user?.token) {
            dispatch(actions.getSelectRoleWhGroup()).then(e => {
                setRole(e)
            })
        }
    }, [projectId, open]);

    useEffect(() => {
        if (values?.role) {
            let param = {
                roleId: values.role,
                projectId: projectId
            }
            dispatch(actions.getUserNotRegisteredYetBasedOnRoleAndProject(param))
        }
    }, [projectId, values?.role]);

    const handleOnchange = useCallback(
        (e) => {
            const { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleComponent = useCallback(
        (name, val) => {
            if (name === 'userId') {
                let payload = {
                    roleId: values?.role,
                    projectId: projectId,
                    userId: val,
                    LMBY: Global?.user?.userID
                }

                dispatch(actions.createProjectMember(payload))
                setOpen(false)
            }
        }
    )

    return (
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Add Membership</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className=" col-form-label">Roles <code>*</code></CFormLabel>
                    <CCol>
                        <CFormSelect
                            name="role"
                            options={role}
                            onChange={handleOnchange}
                        />
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    {values?.role && (
                        <CCol>
                            <TableListUserNotResgitered
                                data={Dashboard?.listUserNotRegisteredByRolePm}
                                handleComponent={handleComponent}
                            />
                        </CCol>
                    )}

                </CRow>
            </CModalBody>
        </CModal>
    )
}

export default ModalCreateProjectMember;
