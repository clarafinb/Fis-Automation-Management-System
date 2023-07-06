import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCol,
    CRow,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormSelect
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import SmartTable from '../custom/table/SmartTable'

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
            dispatch(actions.getUserNotRegisteredYetBasedOnRoleAndProject(values.role, projectId))
        }
    }, [projectId, values?.role]);

    const filterValue = [
        { name: 'name', operator: 'startsWith', type: 'string' },
        { name: 'email', operator: 'startsWith', type: 'string' },
        { name: 'phoneNo', operator: 'startsWith', type: 'string' },
        { name: 'userStatus', operator: 'startsWith', type: 'string' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80 },
        { name: 'fullname', header: 'Fullname', defaultFlex: 1 },
        { name: 'email', header: 'Email', defaultFlex: 1 },
        { name: 'phoneNo', header: 'Phone No', defaultFlex: 1 },
        { name: 'userStatus', header: 'User Status', defaultFlex: 1, textAlign: 'center' },
        {
            name: 'userId',
            header: 'Action',
            defaultFlex: 1,
            textAlign: 'center',
            render: ({ value }) => {
                return (
                    <FontAwesomeIcon
                        icon={faPlus}
                        className='textBlue'
                        onClick={() =>
                            handleComponent("userId", value)
                        }
                    />
                )
            }
        },
    ];

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
                    <CFormLabel className="col-sm-2 col-form-label">Roles <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
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
                        <CCol className="d-none d-md-block text-end">
                            <SmartTable
                                data={Dashboard?.listUserNotRegisteredByRolePm}
                                filterValue={filterValue}
                                columns={columns}
                            />
                        </CCol>
                    )}

                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateProjectMember;
