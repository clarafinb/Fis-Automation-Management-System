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
import ModalCreateServiceChargeList from 'src/components/dashboard/settingManagement/serviceChargeList/ModalCreateServiceChargeList'
import TableServiceChargeList from 'src/components/dashboard/settingManagement/serviceChargeList/TableServiceChargeList'

function ServiceChargeList() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListServiceCharge())
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let serviceChargeId = data?.serviceChargeId
            dispatch(actions.setStatusActiveServiceCharge(val, serviceChargeId))

        }, [Dashboard.listServiceCharge]
    )

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>SE</span>RVICE CHARGE LIST
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
                        <b>ADD SERVICE CHARGE LIST</b>
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol>
                            <TableServiceChargeList
                                data={Dashboard?.listServiceCharge}
                                handleToogle={handleToogle}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateServiceChargeList open={modalCreate} setOpen={setModalCreate} />
        </>
    )
}

export default ServiceChargeList
