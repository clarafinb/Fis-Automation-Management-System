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
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateTransportType from 'src/components/dashboard/settingManagement/transportType/ModalCreateTransportType'
import TableListTransportType from 'src/components/dashboard/settingManagement/transportType/TableListTransportType'
import { cilPlus } from '@coreui/icons'

function TransportType() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListTransportType())
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let transportTypeId = data?.transportTypeId

            dispatch(actions.setStatusActiveTransportType(val, transportTypeId))

        }, [Dashboard.listTransportType]
    )

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>TR</span>ANSPORT TYPE
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
                        <b>ADD TRANSPORT TYPE</b>
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol>
                            <TableListTransportType
                                data={Dashboard?.listTransportType}
                                handleToogle={handleToogle}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateTransportType open={modalCreate} setOpen={setModalCreate} />
        </>
    )
}

export default TransportType