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
    cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../config/redux/Dashboard/actions'
import ModalCreateWarehouse from 'src/components/dashboard/ModalCreateWarehouse'
import ModalOpenMap from 'src/components/dashboard/ModalOpenMap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPencil } from '@fortawesome/free-solid-svg-icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'

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

    const filterValue = [
        { name: 'whName', operator: 'startsWith', type: 'string' },
        { name: 'whCode', operator: 'startsWith', type: 'string' },
        { name: 'isMainWH', operator: 'startsWith', type: 'string' },
        { name: 'whType', operator: 'startsWith', type: 'string' },
        { name: 'whSpace', operator: 'startsWith', type: 'string' },
        { name: 'whAddress', operator: 'startsWith', type: 'string' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 60 },
        { name: 'whName', header: 'Warehouse Name', defaultWidth: 200 },
        { name: 'whCode', header: 'Warehouse Code', defaultWidth: 200 },
        { name: 'isMainWH', header: 'Main CWH', defaultWidth: 200 },
        { name: 'whType', header: 'Warehouse Type', defaultWidth: 200 },
        { name: 'whSpace', header: 'Warehouse Space', defaultWidth: 200, textAlign: 'center' },
        { name: 'whAddress', header: 'Address', defaultWidth: 200 },
        {
            name: 'map',
            header: 'Map',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value }) => {
                return (
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className='textBlue'
                        onClick={() =>
                            handleComponent("openMap", value)
                        }
                    />
                )
            }
        },
        {
            name: 'status',
            header: 'Active Status',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ cellProps }) => {
                return (
                    < ToggleSwitch
                        checked={() => cellProps.data.detail.isActive}
                        size="lg"
                        handleChecked={handleToogle}
                        id={cellProps.data.detail.whId}
                        className="d-flex justify-content-center"
                    />
                )
            }
        },
        {
            name: 'whId',
            header: 'Action',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value }) => {
                return (
                    <FontAwesomeIcon
                        icon={faPencil}
                        className='textBlue'
                        onClick={() =>
                            handleComponent("edit", value)
                        }
                    />
                )
            }
        },
    ];

    const handleCreate = () => {
        setIsEdit(false)
        setModalCreate(!modalCreate)
    }

    const handleToogle = useCallback(
        (val, id) => {
            let data = Dashboard.listWarehouse.find(e => e.whId === id)
            let whId = data.detail.whId
            let projectId = data.detail.projectId
            dispatch(actions.setStatusActiveWarehouse(val, whId, projectId))
        }, [Dashboard.listWarehouse]
    )

    const handleComponent = useCallback(
        (name, val, id) => {
            let temp = Dashboard?.listWarehouse.find(e => e.whId === val)
            setWhSelected(temp)

            if (name === "openMap") {
                setModalMap(true)
                setMapKey(Date.now())
            } else if (name === "edit") {
                setIsEdit(true)
                setModalCreate(true)
            }
        }
    )

    return (
        <>
            <CContainer xl>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>WA</span>
                            REHOUSE LIST
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol sm={5}>
                        <CButton
                            className="colorBtn-white"
                            onClick={handleCreate}>
                            <CIcon icon={cilPlus}
                                className="me-2 text-warning" />
                            ADD WAREHOUSE
                        </CButton>
                    </CCol>
                </CRow>
                <br />
                <CRow className='pb-10'>
                    <CCard>
                        <CCardBody>
                            <CCol className="d-none d-md-block text-end">
                                <SmartTable
                                    data={Dashboard?.listWarehouse}
                                    filterValue={filterValue}
                                    columns={columns}
                                    minHeight={400}
                                />
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CRow>
                <br />
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