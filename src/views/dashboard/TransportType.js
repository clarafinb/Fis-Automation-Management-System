import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
  CCard,
  CCardBody,
  CCol,
  CRow
} from '@coreui/react'
import StandardTable from 'src/components/custom/table/StandardTable'
import * as actions from '../../config/redux/Dashboard/actions'
import ModalCreateServiceManagement from 'src/components/dashboard/ModalCreateServiceManagement'

function TransportMode() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)

    useEffect(() => {
        if(Global?.user?.token){
          dispatch(actions.getListTransportType())
        }
    }, [Global?.user ]);

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

    const handleToogle = useCallback( 
        (val,id) => {
            let data = Dashboard.listTransportMode[id]
            let transportModeId = data.detail.transportModeId

            dispatch(actions.setStatusActiveTransport(val,transportModeId))
            
        }, [Dashboard.listTransportMode]
    )

	return (
        <>
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 className="card-title mb-0">
                                Transport Mode
                            </h4>
                        </CCol>
                    </CRow>
                    <br />
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <StandardTable 
                                head={head} 
                                data={Dashboard?.listTransportMode} 
                                isToogle="status" 
                                handleToogle={handleToogle}
                                hide={["detail"]}
                            />
                        </CCol>
                    </CRow> 
                </CCardBody>
            </CCard>
            <ModalCreateServiceManagement open={modalCreate} setOpen={setModalCreate} />
        </>
	)
}

export default TransportMode