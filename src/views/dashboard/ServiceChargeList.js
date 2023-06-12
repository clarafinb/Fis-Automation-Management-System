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
  cilPlus,
} from '@coreui/icons'
import StandardTable from 'src/components/custom/table/StandardTable'
import * as actions from '../../config/redux/Dashboard/actions'

function ServiceChargeList() {
    const { dispatch, Global, Dashboard } = useRedux()

    useEffect(() => {
        if(Global?.user?.token){
          dispatch(actions.getListServiceCharge())
          console.log(Dashboard)
        }
    }, [Global?.user ]);

	const head = [
        "No",
        "Service Charge", 
        "Service Charge Code", 
        "Last Modified By", 
        "Last Modified Date", 
        "Active Status"
    ]

    const handleToogle = () => {

    }

	return (
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
                        <CIcon icon={cilPlus} className="me-2 textBlue" size="xl"/>
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
                        />
                    </CCol>
                </CRow> 
            </CCardBody>
        </CCard>
	)
}

export default ServiceChargeList
