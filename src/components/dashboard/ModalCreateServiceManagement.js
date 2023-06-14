import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
  CButton,
  CCol,
  CRow,
  CFormInput,
  CFormLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect
} from '@coreui/react'
import * as actions from '../../config/redux/Dashboard/actions'

function ModalCreateServiceManagement({ open, setOpen }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [uomList,setUomList] = useState([])

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getSelectActiveUom()).then(e => {
                setUomList(e)
            })
        }
    }, [Global?.user]);

    const handleCreateSc = () => {

        let payload = {
            serviceCharge: values.serviceCharge,
            serviceChargeCode: values.serviceChargeCode,
            uomId:values.uom,
            LMBY : Global?.user?.userID
        }

        dispatch(actions.createServiceCharge(payload))
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
        <CModal
            size="xl"
            visible={open}
            onClose={() => setOpen(false)}
        >
            <CModalHeader>
                <CModalTitle>Service Charge Creation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Service Charge Code<code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                    <CFormInput type="text" name="serviceChargeCode" value={values?.serviceChargeCode} onChange={handleOnchange} required/>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Service Charge<code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                    <CFormInput type="text" name="serviceCharge" value={values?.serviceCharge} onChange={handleOnchange} required/>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">UOM <code>(*)</code></CFormLabel>
                    <CCol sm={10}>
                        <CFormSelect
                            name="uom"
                            options={uomList}
                            onChange={handleOnchange}
                            required
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => setOpen(false)} color="secondary">Close</CButton>
                <CButton color="primary" onClick={handleCreateSc}>Add</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCreateServiceManagement;
