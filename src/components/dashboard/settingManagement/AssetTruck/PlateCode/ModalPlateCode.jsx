import React, { useCallback, useEffect, useState } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CCard,
    CCardBody,
    CButton,
} from '@coreui/react'
import * as actions from '../../../../../config/redux/Dashboard/actions'
import TableListPlateCode from './TableListPlateCode'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ModalCreatePlateCode from './ModalCreatePlateCode'

function ModalPlateCode({ open, setOpen }) {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreatePlateCode, setModalCreatePlateCode] = useState(false)

    useEffect(() => {
        if (Global?.user?.token && open) {
            dispatch(actions.getListMasterPlateCode())
        }
    }, [Global?.user, open]);

    const handleToogle = useCallback(
        (val, data) => {
            dispatch(actions.setStatusActiveMasterPlateCode(val, data.platCodeId))
        }, [Dashboard?.listMasterAssetTruck]
    )

    const handleCreatePlateCode = () => {
        setModalCreatePlateCode(true)
    }

    return (
        <>
            <CModal
                size="lg"
                visible={open}
                onClose={() => setOpen(false)}
                backdrop="static"
                keyboard={false}
                alignment="center"
            >
                <CModalHeader>
                    <CModalTitle>PLATE CODE LIST</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol className="d-none d-md-block text-end mb-2">
                            <CButton className="colorBtn-white me-2" onClick={handleCreatePlateCode}>
                                <CIcon icon={cilPlus} className="me-2 text-warning" />
                                ADD PLATE CODE
                            </CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCard>
                            <CCardBody>
                                <CCol>
                                    <TableListPlateCode
                                        data={Dashboard?.listMasterPlateCode}
                                        handleToogle={handleToogle}
                                    />
                                </CCol>
                            </CCardBody>
                        </CCard>
                    </CRow>
                </CModalBody>
            </CModal>

            <ModalCreatePlateCode
                open={modalCreatePlateCode}
                setOpen={setModalCreatePlateCode}
            />
        </>
    )
}

export default ModalPlateCode;
