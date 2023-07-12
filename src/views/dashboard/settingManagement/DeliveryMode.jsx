import React, { useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
  CCard,
  CCardBody,
  CCol,
  CRow
} from '@coreui/react'
import * as actions from '../../../config/redux/Dashboard/actions'
import TableListDeliveryMode from 'src/components/dashboard/settingManagement/deliveryMode/TableListDeliveryMode'

function DeliveryMode() {
    const { dispatch, Global, Dashboard } = useRedux()

    useEffect(() => {
        if(Global?.user?.token){
          dispatch(actions.getListDelivery())
        }
    }, [Global?.user ])

    const handleToogle = useCallback( 
        (val,data) => {
            let delModeId = data?.deliveryModeId

            dispatch(actions.setStatusActiveDelivery(val,delModeId))
            
        }, [Dashboard.listDeliveryMode]
    )

	return (
        <>
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>DE</span>LIVERY MODE
                    </h4>
                </CCol>
            </CRow>
            <br />
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <TableListDeliveryMode
                                data={Dashboard?.listDeliveryMode}
                                handleToogle={handleToogle}
                            />
                        </CCol>
                    </CRow> 
                </CCardBody>
            </CCard>
        </>
	)
}

export default DeliveryMode
