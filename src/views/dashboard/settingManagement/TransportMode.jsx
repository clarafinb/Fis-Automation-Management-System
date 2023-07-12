import React, { useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
  CCard,
  CCardBody,
  CCol,
  CRow
} from '@coreui/react'
import * as actions from '../../../config/redux/Dashboard/actions'
import TableListTransportMode from 'src/components/dashboard/settingManagement/transportMode/TableListTransportMode'

function TransportMode() {
    const { dispatch, Global, Dashboard } = useRedux()

    useEffect(() => {
        if(Global?.user?.token){
          dispatch(actions.getListTransport())
        }
    }, [Global?.user ]);

    const handleToogle = useCallback( 
        (val,data) => {
            let transportModeId = data?.transportModeId

            dispatch(actions.setStatusActiveTransport(val,transportModeId))
            
        }, [Dashboard.listTransportMode]
    )

	return (
        <>  
            <CRow>
                <CCol sm={5}>
                    <h4 className="card-title mb-0">
                        <span className='text-underline'>TR</span>ANSPORT MODE
                    </h4>
                </CCol>
            </CRow>
            <br />
            <CCard className="">
                <CCardBody>
                    <CRow>
                        <CCol>
                            <TableListTransportMode 
                                data={Dashboard?.listTransportMode}
                                handleToogle={handleToogle}
                            />
                        </CCol>
                    </CRow> 
                </CCardBody>
            </CCard>
        </>
	)
}

export default TransportMode
