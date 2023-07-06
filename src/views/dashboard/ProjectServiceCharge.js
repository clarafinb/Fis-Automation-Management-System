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
    cilMedicalCross, cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import StandardTable from 'src/components/custom/table/StandardTable'
import * as actions from '../../config/redux/Dashboard/actions'
import ModalCreateProjectServiceCharge from 'src/components/dashboard/ModalCreateProjectServiceCharge'
import SmartTable from 'src/components/custom/table/SmartTable'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'
import { separateComma } from 'src/utils/number'
import moment from 'moment'

function ProjectServiceCharge() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState()

    useEffect(() => {
        if (Global?.user?.token) {
            const id = window.location.href.split("/").pop();
            setProjectId(id)
            dispatch(actions.getListProjectServiceCharge(id))
        }
    }, [Global?.user]);

    const filterValue = [
        { name: 'serviceCharge', operator: 'startsWith', type: 'string' },
        { name: 'serviceChargeCode', operator: 'startsWith', type: 'string' },
        { name: 'chargeFee', operator: 'startsWith', type: 'string' },
        { name: 'currencyName', operator: 'startsWith', type: 'string' },
        { name: 'modifiedBy', operator: 'startsWith', type: 'string' },
        { name: 'modifiedDate', operator: 'startsWith', type: 'string' },
    ]

    const columns = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80 },
        { name: 'serviceCharge', header: 'Service Charge', defaultWidth: 200 },
        { name: 'serviceChargeCode', header: 'Service Charge Code', defaultWidth: 200, textAlign: 'center' },
        {
            name: 'chargeFee',
            header: 'Charge Fee',
            defaultWidth: 200,
            textAlign: 'end',
            render: ({ value }) => {
                return (separateComma(value ? value.toString() : 0))
            }
        },
        { name: 'currencyName', header: 'Currency', defaultWidth: 200, textAlign: 'center' },
        { name: 'modifiedBy', header: 'Last Modified By', defaultWidth: 200 },
        {
            name: 'modifiedDate',
            header: 'Last Modified Date	',
            defaultWidth: 200,
            textAlign: 'center',
            render: ({ value }) => {
                return moment(value).format('DD-MM-YYYY HH:mm:ss')
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
                        id={cellProps.data.detail.projectServiceChargeId}
                        className="d-flex justify-content-center"
                    />
                )
            }
        },
    ];

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, id) => {
            let data = Dashboard.listProjectServiceCharge.find(e => e.detail.projectServiceChargeId == id)
            let projectServiceChargeId = data.detail.projectServiceChargeId
            dispatch(actions.setStatusActiveProjectServiceCharge(val, projectServiceChargeId, projectId))
        }, [Dashboard.listProjectServiceCharge]
    )

    return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>PR</span>
                        OJECT SERVICE CHARGE LIST
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
                        ADD PROJECT SERVICE CHARGE
                    </CButton>
                </CCol>
            </CRow>
            <br />
            <CRow className='pb-10'>
                <CCard>
                    <CCardBody>
                        <CCol className="d-none d-md-block text-end">
                            <SmartTable
                                data={Dashboard?.listProjectServiceCharge}
                                filterValue={filterValue}
                                columns={columns}
                                minHeight={400}
                            />
                        </CCol>
                    </CCardBody>
                </CCard>
            </CRow>
            <br />
            <ModalCreateProjectServiceCharge
                open={modalCreate}
                setOpen={setModalCreate}
                projectId={projectId} />
        </>
    )
}

export default ProjectServiceCharge