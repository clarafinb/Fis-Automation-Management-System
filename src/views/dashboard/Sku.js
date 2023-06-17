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
import ModalCreateSku from 'src/components/dashboard/ModalCreateSku'

function Sku() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState()

    useEffect(() => {
        if (Global?.user?.token) {
            const id = window.location.href.split("/").pop();
            setProjectId(id)
            dispatch(actions.getListSku(id))
        }
    }, [Global?.user]);

    const head = [
        "No",
        "Material Code",
        "Material Desc",
        "UOM",
        "Last Modified By",
        "Last Modified Date",
        "Active Status"
    ]

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, id) => {
            let data = Dashboard.listSku[id]
            let skuId = data.detail.materialId
            
            dispatch(actions.setStatusActiveSku(val, skuId,projectId))

        }, [Dashboard.listSku]
    )

    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Project Master SKU
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
                                data={Dashboard?.listSku}
                                isToogle="status"
                                handleToogle={handleToogle}
                                hide={["detail"]}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateSku open={modalCreate} setOpen={setModalCreate} projectId={projectId} />
        </>
    )
}

export default Sku