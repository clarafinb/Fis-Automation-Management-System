import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
    CFormInput,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
} from '@coreui/react'
import * as actions from '../../../../../config/redux/Dashboard/actions'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalCreatePlateCode({ open, setOpen, isEdit = false, dataEdit }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})


    useEffect(() => {
        if (Global?.user?.token && open) {
            setValues({})
        }
    }, [Global?.user, isEdit, open, dataEdit]);

    const handleCreateAssetTruck = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            plateCode: values.plateCode,
            LMBY: Global.user.userID
        }

        dispatch(actions.createMasterPlateCode(payload, 'POST'))
        setValues({})
        setOpen(false)
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
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
        >
            <CForm onSubmit={handleCreateAssetTruck}>
                <CModalHeader>
                    <CModalTitle>ADD PLATE CODE</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">PLATE CODE <code>(*)</code></CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="plateCode"
                                value={values?.plateCode}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <ButtonCancel
                        label='CANCEL'
                        handleButton={() => setOpen(false)}
                    />
                    <ButtonSubmit
                        label='ADD'
                        type='submit'
                    />
                </CModalFooter>
            </CForm>
        </CModal>
    )
}

export default ModalCreatePlateCode;
