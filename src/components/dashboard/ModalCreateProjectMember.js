import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCol,
    CRow,
    CFormInput,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormSelect
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'
import StandardTable from 'src/components/custom/table/StandardTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
        if(values?.role){
            dispatch(actions.getUserNotRegisteredYetBasedOnRoleAndProject(values.role,projectId))
        }
    }, [projectId, values?.role]);

    const handleCreateProjectServiceCharge = () => {
        // let payload = {
        //     projectId: projectId,
        //     serviceChargeId: values.serviceChargeId,
        //     currencyId: values.currencyId,
        //     chargeFee: values.chargeFee,
        //     LMBY: Global?.user?.userID
        // }
        // dispatch(actions.createProjectServiceCharge(payload))
    }

    const head = [
        "No",
        "Fullname",
        "Email",
        "Phone No",
        "User Status",
        ""
    ]

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
        (name, val, id) => {
            if(name === 'userId'){
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
                            <StandardTable
                                head={head}
                                data={Dashboard?.listUserNotRegisteredByRolePm}
                                hide={["detail"]}
                                isComponent={true}
                                component={[{
                                    name: "userId",
                                    type: "icon",
                                    label: <FontAwesomeIcon icon={faPlus} className='textBlue'/>
                                }]}
                                handleComponent={handleComponent}
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
