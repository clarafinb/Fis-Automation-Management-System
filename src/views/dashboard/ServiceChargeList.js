import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
  CCard,
  CCardBody,
  CCol,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilMedicalCross,
} from '@coreui/icons'
import StandardTable from 'src/components/custom/table/StandardTable'
import * as actions from '../../config/redux/Dashboard/actions'
import ModalCreateServiceManagement from 'src/components/dashboard/ModalCreateServiceManagement'

function ServiceChargeList() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)

    useEffect(() => {
        if(Global?.user?.token){
          dispatch(actions.getListServiceCharge())
        }
    }, [Global?.user ]);

	const head = [
        "No",
        "Service Charge", 
        "Service Charge Code",
        "UOM", 
        "Last Modified By", 
        "Last Modified Date", 
        "Active Status"
    ]

    const searchFilter = {
        "Service Charge" : "serviceCharge", 
        "Service Charge Code" : "serviceChargeCode",
        "UOM" : "uom"
    }

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback( 
        (val,id) => {
            let data = Dashboard.listServiceCharge[id]
            let serviceChargeId = data.detail.serviceChargeId
            dispatch(actions.setStatusActiveServiceCharge(val,serviceChargeId))
            
        }, [Dashboard.listServiceCharge]
    )

	return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Service Charge List
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
                                data={Dashboard?.listServiceCharge} 
                                isToogle="status" 
                                handleToogle={handleToogle}
                                hide={["detail"]}
                                searchFilter={searchFilter}
                            />
                        </CCol>
                    </CRow> 
                </CCardBody>
            </CCard>
            <ModalCreateServiceManagement open={modalCreate} setOpen={setModalCreate} />
        </>
	)
}

export default ServiceChargeList
