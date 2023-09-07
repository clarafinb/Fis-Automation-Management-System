import React, { useEffect, useState } from 'react'

import {
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CButton,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../config/redux/DashboardOpsLead/actions'
import { useRedux } from 'src/utils/hooks';
import { formatStandartDate } from 'src/helper/globalHelper';

function ModalBoxRequest({ open, setOpen, whId, orderReqId, refreshData }) {
    const { dispatch, Global } = useRedux();
    const [boxRequestList, setBoxRequestList] = useState([])

    useEffect(() => {

        if (Global?.user?.userID && open) {
            dispatch(
                actions.getBoxRequest(whId)
            ).then(result => {
                setBoxRequestList(result)
            })
        }
    }, [Global?.user?.userID, open]);

    const handleSave = (data) => {
        const payload = {
            orderReqId: orderReqId,
            inbId: data.inbId,
            materialCode: data.materialCode,
            lmby: Global.user.userID
        }
        dispatch(actions.addBoxRequest(payload))
            .then(resp => {
                if (resp.status !== 'error') {
                    refreshData(orderReqId, whId)
                    setOpen(false)
                }
            })
    }

    const handleAction = (data) => {
        return (
            <>
                <CButton className='colorBtnIcon-black p-1'>
                    <FontAwesomeIcon
                        icon={faPlus}
                        className='textWhite px-1 mt-1'
                        title='Add Box Request'
                        size='lg'
                        onClick={() =>
                            handleSave(data)
                        }
                    />
                </CButton>
            </>
        )
    }

    const additionalServiceChargeColumn = [
        {
            name: 'no',
            header: 'No',
            defaultVisible: true,
            defaultWidth: 80,
            type: 'number'
        },
        {
            name: 'materialCode',
            header: 'Box No',
            defaultFlex: 1
        },
        {
            name: 'inboundDate',
            header: 'Inbound Date',
            defaultFlex: 1,
            render: ({ data }) => {
                return formatStandartDate(data.inboundDate)
            }
        },
        {
            name: 'projectServiceChargeId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ data }) => {
                return handleAction(data)
            }
        },
    ]
    return (
        <>
            <CModal
                size="lg"
                visible={open}
                onClose={() => setOpen(false)}
                alignment='center'
                backdrop="static"
                keyboard={false}
            >
                <CModalHeader>
                    <CModalTitle>Add Box Request</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <SmartTable
                                data={boxRequestList}
                                columns={additionalServiceChargeColumn}
                                minHeight={300}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        </>
    )
}

export default ModalBoxRequest;
