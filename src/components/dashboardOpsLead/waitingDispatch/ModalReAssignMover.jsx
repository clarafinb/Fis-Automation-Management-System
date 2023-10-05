import React, { useEffect, useState } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormLabel,
    CModalFooter,
} from '@coreui/react'
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import Select from 'react-select'
import Alert from 'src/components/custom/toast/Alert'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'

function ModalReAssignMover({
    open,
    setOpen,
    data,
    transportTypeArrangementId,
    handleComplete,
    onSite = false
}) {

    console.log('transportTypeArrangementId : ',transportTypeArrangementId)

    const { dispatch, Global } = useRedux()

    const [visible, setVisible] = useState(false)
    const [errMessage, setErrMessage] = useState(null)

    const [transportType, setTransportType] = useState([])
    const [dispatcher, setDispatcher] = useState([])

    const [selectedTransportType, setSelectedTransportType] = useState({});
    const [selectedDispatcher, setSelectedDispatcher] = useState({});

    useEffect(() => {
        if (Global?.user?.token && open) {

            setSelectedTransportType({})
            setSelectedDispatcher({})

            dispatch(actions.getTransportTypeList(data?.transportModeId))
                .then(resp => setTransportType(resp))

            dispatch(actions.getDispatcherReassignmentBasedOnTransportArrangement(data?.transportArrangmentId, data?.projectId, data?.orderReqId))
                .then(resp => setDispatcher(resp))

        }
    }, [Global?.user, open]);

    const handleOnChangetransportType = (selectedTransportType) => {
        setSelectedTransportType(selectedTransportType);
    }

    const handleOnChangeDispatcher = (selectedDispatcher) => {
        setSelectedDispatcher(selectedDispatcher);
    }

    const handleAddTransportType = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            transportTypeArrangementId: transportTypeArrangementId,
            transportTypeId: selectedTransportType?.value,
            mainDispatcherId: selectedDispatcher?.value,
            LMBY: Global?.user?.userID
        }

        const err = []

        if (payload.transportTypeId === undefined) err.push('Transport Type')
        if (payload.mainDispatcherId === undefined) err.push('Dispatcher')

        if (err.length > 0) {
            setErrMessage(err.join(' , '))
            setVisible(true)
        } else {
            dispatch(actions.transportArrangementChangeDispatcher(payload))
                .then(() => {
                    if (!onSite) {
                        dispatch(actions.getTransportTypeArranged(data?.transportArrangmentId))
                    }
                    setOpen(false)
                    handleComplete(true)
                })
        }
    }

    return (
        <CModal
            size="lg"
            visible={open}
            onClose={() => setOpen(false)}
            alignment='center'
            backdrop="static"
            keyboard={false}
        >
            <CForm
                onSubmit={handleAddTransportType}
            >
                <CModalHeader>
                    <CModalTitle>Re-assign Mover</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        <CFormLabel className="col-sm-2 col-form-label">Transport Type <code>(*)</code></CFormLabel>
                        <CCol sm={10}>
                            <Select
                                className="input-select"
                                options={transportType}
                                isSearchable={true}
                                value={selectedTransportType}
                                onChange={handleOnChangetransportType}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-sm-2 col-form-label">Mover <code>(*)</code></CFormLabel>
                        <CCol sm={10}>
                            <Select
                                className="input-select"
                                options={dispatcher}
                                isSearchable={true}
                                value={selectedDispatcher}
                                onChange={handleOnChangeDispatcher}
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
                </CModalBody>
                <CModalFooter>
                    <ButtonSubmit type="submit" label='CONFIRM' />
                </CModalFooter>
            </CForm>
        </CModal>
    )
}

export default ModalReAssignMover;
