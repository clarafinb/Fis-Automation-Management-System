import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
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
import * as actions from '../../config/redux/DashboardOpsLead/actions'
import CIcon from '@coreui/icons-react'
import { cilMedicalCross } from '@coreui/icons'
import TableListMasterLocation from 'src/components/dashboardOpsLead/masterLocation/TableListMasterLocation'


function MasterLocation() {
    const { dispatch, Global, DashboardOpsLead } = useRedux()
    const [values, setValues] = useState({})
    const [detailProject, setDetailProject] = useState({})
    const [openModal, setOpenModal] = useState(false)
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
                            <TableListMasterLocation
                            data={DashboardOpsLead?.listMasterLocation}
                            handleComponent={handleComponent}
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