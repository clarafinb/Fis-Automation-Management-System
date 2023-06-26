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


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faEdit } from '@fortawesome/free-solid-svg-icons'

function Warehouse() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [modalMap, setModalMap] = useState(false)
    const [projectId, setProjectId] = useState()
    const [warehouseSelected, setWhSelected] = useState({})
    const [mapKey, setMapKey] = useState(Date.now())
    const [isEdit, setIsEdit] = useState(false)
    
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
        "Warehouse Space",
        "Address",
        "Map",
        "Active Status",
        "Action"
    ]

    const searchFilter = {
        "Warehouse Name": "whName",
        "Warehouse Code": "whCode",
        "Main CWH": "isMainWH",
        "Warehouse Type": "whType",
        "Warehouse Space": "whSpace",
        "Address": "whAddress"
    }

    const handleCreate = () => {
        setIsEdit(false)
        setModalCreate(!modalCreate)
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
        (name, val, id) => {
            console.log(name, val, id)
            let temp = Dashboard?.listWarehouse.find(e => e.whId === val)
            setWhSelected(temp)

            if(name === "map"){
                setModalMap(true)
                setMapKey(Date.now())
            }else if(name === "whId"){
                setIsEdit(true)
                setModalCreate(true)
            }
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
                                isComponent= {true}
                                component={[{
                                    name: "map",
                                    type: "icon",
                                    label: <FontAwesomeIcon icon={faLocationDot} className='textBlue'/>
                                },{
                                    name: "whId",
                                    type: "icon",
                                    label: <FontAwesomeIcon icon={faEdit} className='textBlue'/>
                                }]}
                                handleComponent={handleComponent}
                                searchFilter={searchFilter}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <ModalCreateWarehouse 
                open={modalCreate} 
                setOpen={setModalCreate} 
                projectId={projectId} 
                isEdit={isEdit} 
                dataEdit={warehouseSelected} 
            />
            <ModalOpenMap 
                open={modalMap} 
                setOpen={setModalMap} 
                data={warehouseSelected} 
                key={mapKey} 
            />
        </>
    )
}

export default Warehouse