import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow
} from '@coreui/react'
import {
    cilMedicalCross, cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../config/redux/Dashboard/actions'
import ModalCreateWarehouse from 'src/components/dashboard/warehouse/ModalCreateWarehouse'
import ModalOpenMap from 'src/components/dashboard/warehouse/ModalOpenMap'
import TableListWarehouse from 'src/components/dashboard/warehouse/TableListWarehouse'

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
            setMapKey(Date.now())
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setIsEdit(false)
        setModalCreate(!modalCreate)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let whId = data?.whId
            let projectId = data?.projectId

            dispatch(actions.setStatusActiveWarehouse(val, whId, projectId))
        }, [Dashboard.listWarehouse]
    )

    const handleComponent = useCallback(
        (type, val, data) => {
            let temp = Dashboard?.listWarehouse.find(e => e.whId === val)
            setWhSelected(temp)

            if(type === "map"){
                setModalMap(true)
                setMapKey(Date.now())
            }else if(type === "edit"){
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
                        <span className='text-underline'>MA</span>STER WAREHOUSE
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol className="d-none d-md-block">
                        <CButton className="colorBtn-white" onClick={handleCreate}>
                            <CIcon icon={cilPlus} className="me-2 text-warning" />
                            ADD MASTER WAREHOUSE
                        </CButton>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCard className="">
                        <CCardBody>
                            <CRow>
                                <CCol className="d-none d-md-block">
                                    <TableListWarehouse
                                        data={Dashboard?.listWarehouse}
                                        handleComponent={handleComponent}
                                        handleToogle={handleToogle}
                                    />
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CRow>
            </CContainer>
        
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