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
import ModalCreateCustomer from 'src/components/dashboard/ModalCreateCustomer'

function Customer() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListCustomer())
        }
    }, [Global?.user]);

    const head = [
        "No",
        "Customer Name",
        "Customer Alias Name",
        "Last Modified By",
        "Last Modified Date",
        "Active Status",
    ]

    const searchFilter = {
        "Customer Name" : "customerName",
        "Customer Alias Name" : "customerAliasName"
    }

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, id) => {
            let data = Dashboard.listCustomer[id]
            let customerId = data.detail.customerId
            dispatch(actions.setStatusActiveCustomer(val,customerId))
        }, [Dashboard.listCustomer]
    )

    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Customer List
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
                                data={Dashboard?.listCustomer}
                                isToogle="status"
                                handleToogle={handleToogle}
                                hide={["detail"]}
                                searchFilter={searchFilter}
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