import React, { useState, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm
} from '@coreui/react'
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import Select from 'react-select'
import Alert from 'src/components/custom/toast/Alert'

function ModalCreateTemplateSetting({ open, setOpen, projectId }) {
    const { dispatch, Global } = useRedux()

    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)

    const [deliveryTypeList, setDeliveryTypeList] = useState([])
    const [selectedDeliveryType, setSelectedDeliveryType] = useState({})

    const [htmTemplateList, setHtmTemplateList] = useState([])
    const [selectedHtmTemplate, setSelectedHtmTemplate] = useState({})


    useEffect(() => {

        if (Global?.user?.token && open) {
            resetForm()
            initApi()
        }

    }, [Global?.user, open]);

    const resetForm = () => {
        setSelectedDeliveryType({})
        setSelectedHtmTemplate({})
        setErrMessage(null)
        setVisible(false)
    }

    const initApi = () => {
        dispatch(actions.getSelectDeliveryTypeTemplateSetting(projectId)).then(e => {
            setDeliveryTypeList(e)
        })
        dispatch(actions.getSelectHtmTemplateSetting()).then(e => {
            setHtmTemplateList(e)
        })
    }



    const handleCreateTemplateSetting = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let payload = {
            projectId: projectId,
            packageProcessId: selectedDeliveryType?.value,
            dnTemplateId: selectedHtmTemplate?.value,
            LMBY: Global?.user?.userID
        }

        const err = []
        if (payload.packageProcessId === undefined) err.push('Delivery Type')
        if (payload.dnTemplateId === undefined) err.push('HTM Template')

        if (err.length > 0) {
            setErrMessage(err.join(' , '))
            setVisible(true)
        } else {
            dispatch(actions.createTemplateSetting(payload))
                .then(resp => {
                    if (resp === 'success') {
                        dispatch(actions.getListTemplateSetting(projectId))
                        setOpen(false)
                    }
                })
        }
    }

    const handleOnchangeDeliveryType = (selectedDeliveryType) => {
        setSelectedDeliveryType(selectedDeliveryType)
    }

    const handleOnchangeHtmTemplate = (selectedHtmTemplate) => {
        setSelectedHtmTemplate(selectedHtmTemplate)
    }

    return (
        <CModal
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
            alignment="center"
        >
            <CModalHeader>
                <CModalTitle>ADD DN TEMPLATE</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleCreateTemplateSetting}>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Delivery Type <code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={deliveryTypeList}
                                isSearchable={true}
                                value={selectedDeliveryType}
                                onChange={handleOnchangeDeliveryType}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">HTM Template<code>*</code></CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={htmTemplateList}
                                isSearchable={true}
                                value={selectedHtmTemplate}
                                onChange={handleOnchangeHtmTemplate}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <Alert
                                message={errMessage}
                                visible={visible}
                                setVisible={setVisible}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CCol className="d-grid gap-2">
                            <ButtonSubmit type="submit" />
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
        </CModal>
    )
}

export default ModalCreateTemplateSetting;
