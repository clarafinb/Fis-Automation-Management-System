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
import ModalCreateWarehouse from 'src/components/dashboard/ModalCreateWarehouse'

function Warehouse() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState()
    
    useEffect(() => {
        if (Global?.user?.token) {
            const id = window.location.href.split("/").pop();
            setProjectId(id)
            dispatch(actions.getListWarehouse(id))
        }
    }, [Global?.user]);

    const head = [
        "No",
        "Warehouse Name",
        "Warehouse Code",
        "Main CWH",
        "Warehouse Type",
        "Address",
        "Map",
        "Active Status"
    ]

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, id) => {
            let data = Dashboard.listWarehouse[id]
            let whId = data.detail.whId
            let projectId = data.detail.projectId

            dispatch(actions.setStatusActiveWarehouse(val, whId, projectId))

        }, [Dashboard.listWarehouse]
    )

    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Warehouse List
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
                                data={Dashboard?.listWarehouse}
                                isToogle="status"
                                handleToogle={handleToogle}
                                hide={["detail"]}
                                isComponent="map"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateWarehouse open={modalCreate} setOpen={setModalCreate} projectId={projectId} />
        </>
    )
}

export default Warehouse