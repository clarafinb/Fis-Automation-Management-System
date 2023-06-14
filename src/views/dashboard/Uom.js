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
import ModalCreateUom from 'src/components/dashboard/ModalCreateUom'

function Uom() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)

    useEffect(() => {
        if(Global?.user?.token){
          dispatch(actions.getListUom())
        }
    }, [Global?.user]);

	const head = [
        "No",
        "UOM", 
        "Last Modified By",  
        "Last Modified Date",
        "Active Status",
    ]

    const handleCreate = () => {
         setModalCreate(true)
    }

    const handleToogle = useCallback( 
        (val,id) => {
            let data = Dashboard.listUom[id]
            let uomId = data.detail.uomId
            dispatch(actions.setStatusUom(val,uomId))
        }, [Dashboard.listUom]
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
                                data={Dashboard?.listUom} 
                                isToogle="status" 
                                handleToogle={handleToogle}
                                hide={["detail"]}
                            />
                        </CCol>
                    </CRow> 
                </CCardBody>
            </CCard>
            <ModalCreateUom open={modalCreate} setOpen={setModalCreate} />
        </>
	)
}

export default Uom