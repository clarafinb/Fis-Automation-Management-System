import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'

import * as actions from '../../config/redux/Dashboard/actions'
import CIcon from '@coreui/icons-react'
import { cilMedicalCross } from '@coreui/icons'
import SmartTable from 'src/components/custom/table/SmartTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'

function MasterLocation() {
    const nav = useNavigate();
    const { dispatch, Global, Dashboard } = useRedux()
    const [values, setValues] = useState({})
    const [detailProject, setDetailProject] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [custOrderRequest, setCustOrderRequest] = useState(null)
    const [itemOrderRequest, setItemOrderRequest] = useState([])
    const [itemOrderRequestData, setItemOrderRequestData] = useState([])
    const [routeCategoryList, setRouteCategoryList] = useState([])
    const [selectedRouteCategory, setSelectedRouteCategory] = useState(null)
    const [projectId, setProjectId] = useState(null)

    useEffect(() => {
        const id = window.location.href.split("/").pop();
        setProjectId(id)
        if (Global?.user?.userID) {
            dispatch(
                actions.getActivitySummaryWHProject(Global?.user?.userID, id)
            ).then(result => {
                setDetailProject(result[0])
                dispatch(actions.getListMasterLocation(id))
                dispatch(actions.getSelecRouteCategory()).
                    then(resp => {
                        setRouteCategoryList(resp)
                    })
            })
        }
    }, [Global?.user?.userID]);

    const handleComponent = useCallback(
        (action, pointCodeId) => {
            dispatch(actions.deleteMasterLocation(pointCodeId, Global.user.userID, projectId))
        }
    )

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleOpenModal = (e) => {
        setValues({})
        setOpenModal(true)
    }

    const handleOnchangeRouteCategory = (selectedRouteCategory) => {
        setSelectedRouteCategory(selectedRouteCategory);
    }

    const handleCreate = () => {
        const payload = {
            projectId: projectId,
            pointCode: values.pointCode,
            address: values.address,
            longitude: values.longitude,
            latitude: values.latitude,
            LMBY: Global.user.userID,
            routeTypeCode: values.address,
        }
        dispatch(actions.createMasterLocation(payload))
    }

    const filterValue = [
        { name: 'pointCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'address', operator: 'startsWith', type: 'string', value: '' },
        { name: 'longitude', operator: 'startsWith', type: 'string', value: '' },
        { name: 'latitude', operator: 'startsWith', type: 'string', value: '' },
        { name: 'routeTypeCode', operator: 'startsWith', type: 'string', value: '' },
        { name: 'defineBy', operator: 'startsWith', type: 'string', value: '' },
        { name: 'defineDate', operator: 'startsWith', type: 'string', value: '' }
    ]

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'pointCode', header: 'Point Code', defaultWidth: 200 },
        { name: 'address', header: 'Address', defaultWidth: 550 },
        { name: 'longitude', header: 'Longitude', defaultWidth: 200 },
        { name: 'latitude', header: 'Latitude', defaultWidth: 200 },
        { name: 'routeTypeCode', header: 'Route Type', defaultWidth: 200, textAlign: 'center' },
        { name: 'defineBy', header: 'Define By', defaultWidth: 200 },
        { name: 'defineDate', header: 'Define Date', defaultWidth: 200 },
        {
            name: 'pointCodeId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value }) => {
                return (
                    <>

                        <FontAwesomeIcon
                            icon={faTrash}
                            title='Delete Master Location'
                            size='sm'
                            onClick={() =>
                                handleComponent('delete', value)
                            }
                        />
                    </>
                )
            }
        },
    ];

    const handleOnchange = useCallback(
        (e) => {
            const { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                MASTER LOCATION
                            </h4>
                        </CCol>
                    </CRow>
                    <br />
                    <CRow>
                        <CCol sm={5}>
                            <h5 className="card-title mb-0">
                                {detailProject?.projectName}
                            </h5>
                        </CCol>
                    </CRow>
                    <br />
                    <br />
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <CIcon
                                icon={cilMedicalCross}
                                className="me-2 text-secondary"
                                size="xl"
                                onClick={handleOpenModal}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <SmartTable
                                data={Dashboard?.listMasterLocation}
                                filterValue={filterValue}
                                columns={columns}
                                minHeight={400}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CModal
                size="lg"
                visible={openModal}
                onClose={() => setOpenModal(false)}
                alignment='center'
            >
                <CModalHeader>
                    <CModalTitle>Add Master Location</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Point Code  <code>(*)</code></CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="pointCode"
                                        value={values?.pointCode}
                                        onChange={handleOnchange}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Address <code>(*)</code></CFormLabel>
                                <CCol>
                                    <CFormTextarea
                                        rows={4}
                                        name="address"
                                        value={values?.address}
                                        onChange={handleOnchange}
                                    >
                                    </CFormTextarea>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Longitude  <code>(*)</code></CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="longitude"
                                        value={values?.longitude}
                                        onChange={handleOnchange}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Latitude <code>(*)</code></CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="latitude"
                                        value={values?.latitude}
                                        onChange={handleOnchange}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Route Category <code>(*)</code></CFormLabel>
                                <CCol>
                                    <CFormSelect
                                        name="routeTypeCode"
                                        options={routeCategoryList}
                                        value={selectedRouteCategory}
                                        onChange={handleOnchange}
                                    />
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton className="colorBtn-yellow" onClick={handleCreate}>
                        Save
                    </CButton>
                    <CButton onClick={handleClose} color="secondary">Close</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default MasterLocation