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
    cilCode,
    cilPlus, cilSpreadsheet,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateAssetTruck from 'src/components/dashboard/settingManagement/AssetTruck/ModalCreateAssetTruck'
import TableListAssetTruck from 'src/components/dashboard/settingManagement/AssetTruck/TableListAssetTruck'
import { downloadFileConfig } from 'src/helper/globalHelper'

function AssetTruck() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [AssetTruckSelected, setAssetTruckSelected] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListMasterAssetTruck())
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setIsEdit(false)
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            dispatch(actions.setStatusActiveMasterAssetTruck(val, data.vehicleId, Global.user.userID))
        }, [Dashboard?.listMasterAssetTruck]
    )

    const handleComponent = useCallback(
        (type, val, data) => {
            setAssetTruckSelected(data)
            if (type === "edit") {
                setIsEdit(true)
                setModalCreate(true)
            }
        }
    )

    const handleExportExcel = () => {
        dispatch(
            actions.assetTruckExportExcel()
        ).then(resp => {
            downloadFileConfig(resp, 'asset_truck' + Date.now() + 'xlsx')
        })
    }

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>ASS</span>ET TRUCK
                    </h4>
                </CCol>
            </CRow>
            <br />
            <CRow>
                <CCol className="d-none d-md-block text-end mb-2">
                    <CButton className="colorBtn-white me-2" onClick={handleCreate}>
                        <CIcon icon={cilPlus} className="me-2 text-warning" />
                        ADD ASSET TRUCK
                    </CButton>
                    <CButton className="colorBtn-white me-2" onClick={handleCreate}>
                        <CIcon icon={cilCode} className="me-2 text-warning" />
                        PLATE CODE
                    </CButton>
                    {/* </CCol>
                <CCol className="d-none d-md-block text-end mb-2"> */}
                    <CButton className="colorBtn-white" onClick={handleExportExcel}>
                        <CIcon icon={cilSpreadsheet} className="me-2 text-success" />
                        EXPORT TO EXCEL
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CRow>
                <CCard>
                    <CCardBody>
                        <CCol>
                            <TableListAssetTruck
                                data={Dashboard?.listMasterAssetTruck}
                                handleToogle={handleToogle}
                                handleComponent={handleComponent}
                            />
                        </CCol>
                    </CCardBody>
                </CCard>
            </CRow>

            <ModalCreateAssetTruck
                open={modalCreate}
                setOpen={setModalCreate}
                isEdit={isEdit}
                dataEdit={AssetTruckSelected}
            />

            <ModalCreateAssetTruck
                open={modalCreate}
                setOpen={setModalCreate}
                isEdit={isEdit}
                dataEdit={AssetTruckSelected}
            />
        </>
    )
}

export default AssetTruck