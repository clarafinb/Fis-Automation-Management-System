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
import ModalCreateUom from 'src/components/dashboard/settingManagement/unitOfMeasurement/ModalCreateUom'
import TableListUom from 'src/components/dashboard/settingManagement/unitOfMeasurement/TableListUom'

function Uom() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListUom())
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let uomId = data?.uomId
            dispatch(actions.setStatusUom(val, uomId))
        }, [Dashboard.listUom]
    )

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>UN</span>IT OF MEASUREMENT
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
                        <b>ADD UNIT OF MEASUREMENT</b>
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol>
                            <TableListUom
                                data={Dashboard?.listUom}
                                handleToogle={handleToogle}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateUom open={modalCreate} setOpen={setModalCreate} />
        </>
    )
}

export default Uom