import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilMedicalCross, cilPlus,
} from '@coreui/icons'
import StandardTable from 'src/components/custom/table/StandardTable'
import * as actions from '../../config/redux/Dashboard/actions'
import ModalCreateAccountManagement from 'src/components/dashboard/ModalCreateAccountManagement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

function AccountManagementList() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [userSelected, setUserSelected] = useState({})

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListAccountManagement())
        }
    }, [Global?.user]);

    const head = [
        "No",
        "Full Name",
        "Role",
        "Email",
        "Phone No",
        "User Title",
        "Employee ID",
        "Account Status",
        "Create Date",
        "Modified Date",
        "Modified By",
        "Action"
    ]

    const searchFilter = {
        "Full Name": "fullname",
        "Role": "roleName",
        "Email": "email",
        "Phone No": "phoneNo",
        "User Title": "userTitle",
        "Employee ID": "employeeId"
    }

    const handleCreate = () => {
        setModalCreate(true)
        setIsEdit(false)
    }

    const handleComponent = useCallback(
        (name, val) => {
            let temp = Dashboard?.listAccountManagement.find(e => e.userId === val)
            setUserSelected(temp)
            setIsEdit(true)
            setModalCreate(true)
        }
    )

    return (
        <>
            {/* <CCard>
                <CCardBody> */}
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                User Account
                            </h4>
                        </CCol>
                    </CRow>
                    <br />
                    <CRow>
                        <CCol className="">
                            <CButton
                                className="colorBtn-white px-1"
                                onClick={handleCreate}>
                                <CIcon icon={cilPlus}
                                    className="me-2 text-warning"
                                />
                                <b>ADD USER</b>
                            </CButton>
                        </CCol>
                    </CRow>
                    <br />
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <StandardTable
                                head={head}
                                data={Dashboard?.listAccountManagement}
                                isToogle="status"
                                hide={["detail"]}
                                isComponent={true}
                                component={[{
                                    name: "userId",
                                    type: "icon",
                                    label: <FontAwesomeIcon icon={faEdit} className='textBlue' />
                                }]}
                                handleComponent={handleComponent}
                                searchFilter={searchFilter}
                            />
                        </CCol>
                    </CRow>
                {/* </CCardBody>
            </CCard> */}
            <ModalCreateAccountManagement
                open={modalCreate}
                setOpen={setModalCreate}
                dataEdit={userSelected}
                isEdit={isEdit}
            />
        </>
    )
}

export default AccountManagementList
