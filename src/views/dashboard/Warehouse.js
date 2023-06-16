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
import ModalOpenMap from 'src/components/dashboard/ModalOpenMap'

function Warehouse() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [modalMap, setModalMap] = useState(false)
    const [projectId, setProjectId] = useState()
    const [warehouseSelected, setWhSelected] = useState({})
    
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

    const handleComponent = useCallback(
        (val, id) => {
            console.log(val, id)
            console.log(Dashboard)
            let temp = Dashboard?.listWarehouse[id]

            setWhSelected(temp)
            setModalMap(true)
        }
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
                                component={{
                                    type: "button",
                                    label: "map"
                                }}
                                handleComponent={handleComponent}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateWarehouse open={modalCreate} setOpen={setModalCreate} projectId={projectId} />
            <ModalOpenMap open={modalMap} setOpen={setModalMap} data={warehouseSelected} />
        </>
    )
 
}

export default Warehouse