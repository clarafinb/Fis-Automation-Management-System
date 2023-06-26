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
import ModalCreateTransportType from 'src/components/dashboard/ModalCreateTransportType'

function TransportType() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)

    useEffect(() => {
        if(Global?.user?.token){
          dispatch(actions.getListTransportType())
        }
    }, [Global?.user]);

	const head = [
        "No",
        "Transport Type", 
        "Transport Mode",  
        "Create By",
        "Create Date",
        "Modified By",
        "Modified Date",
        "Active Status"
    ]

    const searchFilter = {
        "Transport Type" : "transportType", 
        "Transport Mode" : "transportMode",  
        "Create By" : "createName"
    }

    const handleCreate = () => {
         setModalCreate(true)
    }

    const handleToogle = useCallback( 
        (val,id) => {
            let data = Dashboard.listTransportType[id]
            let transportTypeId = data.detail.transportTypeId

            dispatch(actions.setStatusActiveTransportType(val,transportTypeId))
            
        }, [Dashboard.listTransportType]
    )

	return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Transport Type
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
                                data={Dashboard?.listTransportType} 
                                isToogle="status" 
                                handleToogle={handleToogle}
                                hide={["detail"]}
                                searchFilter={searchFilter}
                            />
                        </CCol>
                    </CRow> 
                </CCardBody>
            </CCard>
            <ModalCreateTransportType open={modalCreate} setOpen={setModalCreate} />
        </>
	)
}

export default TransportType