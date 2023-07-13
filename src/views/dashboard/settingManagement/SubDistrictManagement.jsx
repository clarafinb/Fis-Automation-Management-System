import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'
import {
    cilFile,
    cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateSubDistrict from 'src/components/dashboard/settingManagement/subDistrictManagement/ModalCreateSubDistrict'
import TableListSubDistrict from 'src/components/dashboard/settingManagement/subDistrictManagement/TableListSubDistrict'

function SubDistrictManagement() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [subDistrictSelected, setSubDistrictSelected] = useState({})

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListSubDistrict())
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setIsEdit(false)
        setModalCreate(true)
    }

    const handleExportExcel = () => {

    }

    const handleToogle = useCallback(
        (val, { subDistrictId }) => {
            dispatch(actions.setStatusActiveSubDistrict(val, subDistrictId))
        }, [Dashboard.listSubDistrict]
    )

    const handleComponent = useCallback(
        (type, val, data) => {
            let temp = Dashboard?.listSubDistrict.find(e => e.subDistrictId === val)
            setSubDistrictSelected(temp)
            if (type === "edit") {
                setIsEdit(true)
                setModalCreate(true)
            }
        }
    )

    return (
        <>
            <CContainer>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>MA</span>STER SUB DISTRICT
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol className="d-none d-md-block">
                        <CButton className="colorBtn-white" onClick={handleCreate}>
                            <CIcon icon={cilPlus} className="me-2 text-warning" />
                            ADD MASTER SUB DISTRICT
                        </CButton>
                    </CCol>
                </CRow>
                <br />
                <CCard className="">
                    <CCardBody>
                        <CRow className=''>
                            <CCol className="d-none d-md-block text-end">
                                <CIcon
                                    icon={cilFile}
                                    className="me-2 text-success"
                                    size="xl"
                                    onClick={handleExportExcel}
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol className="d-none d-md-block text-end">
                                <TableListSubDistrict
                                    data={Dashboard?.listSubDistrict}
                                    handleToogle={handleToogle}
                                    handleComponent={handleComponent}
                                />
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer >

            <ModalCreateSubDistrict
                open={modalCreate}
                setOpen={setModalCreate}
                isEdit={isEdit}
                dataEdit={subDistrictSelected}
            />
        </>
    )
}

export default SubDistrictManagement