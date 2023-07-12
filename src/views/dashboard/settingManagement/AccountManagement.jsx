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
    cilPlus,
} from '@coreui/icons'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateAccountManagement from 'src/components/dashboard/settingManagement/accountManagement/ModalCreateAccountManagement'
import TableListAccountManagement from 'src/components/dashboard/settingManagement/accountManagement/TableListAccountManagement'

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
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>US</span>ER ACCOUNT
                    </h4>
                </CCol>
            </CRow>
            <br />
            <CRow>
                <CCol className="">
                    <CButton
                        className="colorBtn-white"
                        onClick={handleCreate}>
                        <CIcon icon={cilPlus}
                            className="me-2 text-warning"
                        />
                        <b>ADD USER</b>
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <TableListAccountManagement
                                data={Dashboard?.listAccountManagement}
                                handleComponent={handleComponent}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
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
