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
import ModalCreateCustomer from 'src/components/dashboard/settingManagement/customer/ModalCreateCustomer'
import TableListCustomer from 'src/components/dashboard/settingManagement/customer/TableListCustomer'

function Customer() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListCustomer())
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let customerId = data?.customerId
            dispatch(actions.setStatusActiveCustomer(val, customerId))
        }, [Dashboard.listCustomer]
    )

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>CU</span>STOMER
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
                        <b>ADD CUSTOMER</b>
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol>
                            <TableListCustomer
                                data={Dashboard?.listCustomer}
                                handleToogle={handleToogle}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateCustomer open={modalCreate} setOpen={setModalCreate} />
        </>
    )
}

export default Customer