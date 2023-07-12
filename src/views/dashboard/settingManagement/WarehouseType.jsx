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
import ModalCreateWarehouseType from 'src/components/dashboard/settingManagement/warehouseType/ModalCreateWarehouseType'
import TableListWarehouseType from 'src/components/dashboard/settingManagement/warehouseType/TableListWarehouseType'

function WarehouseType() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [warehouseTypeSelected, setWarehouseTypeSelected] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListMasterWarehouseType())
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setIsEdit(false)
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            dispatch(actions.setStatusActiveMasterWarehouseType(val, data.whTypeId))
        }, [Dashboard?.listMasterWarehouseType]
    )

    const handleComponent = useCallback(
        (type, val, data) => {
            setWarehouseTypeSelected(data)
            if (type === "edit") {
                setIsEdit(true)
                setModalCreate(true)
            }
        }
    )

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>MA</span>STER WAREHOUSE TYPE
                    </h4>
                </CCol>
            </CRow>
            <br />
            <CRow>
                <CCol className="d-none d-md-block">
                    <CButton className="colorBtn-white" onClick={handleCreate}>
                        <CIcon icon={cilPlus} className="me-2 text-warning" />
                        ADD MASTER WAREHOUSE TYPE
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CRow>
                <CCard>
                    <CCardBody>
                        <CCol>
                            <TableListWarehouseType
                                data={Dashboard?.listMasterWarehouseType}
                                handleToogle={handleToogle}
                                handleComponent={handleComponent}
                            />
                        </CCol>
                    </CCardBody>
                </CCard>
            </CRow>

            <ModalCreateWarehouseType
                open={modalCreate}
                setOpen={setModalCreate}
                isEdit={isEdit}
                dataEdit={warehouseTypeSelected}
            />
        </>
    )
}

export default WarehouseType