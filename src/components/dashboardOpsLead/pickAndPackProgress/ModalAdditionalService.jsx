import React from 'react'

import {
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormInput,
} from '@coreui/react'
import SmartTable from 'src/components/custom/table/SmartTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ModalAdditionalService({ open, setOpen, serviceChargeData, handleChangeQty, handleComponentQty }) {
    const additionalServiceChargeColumn = [
        { name: 'no', header: 'No', defaultVisible: true, defaultWidth: 80, type: 'number' },
        { name: 'serviceChargeCode', header: 'SVC Code', defaultFlex: 1 },
        { name: 'serviceCharge', header: 'SVC Desc', defaultFlex: 1 },
        { name: 'uom', header: 'UOM', defaultFlex: 1 },
        {
            name: 'serviceQty',
            header: 'QTY',
            defaultFlex: 1,
            defaultWidth: 80,
            render: ({ value, data }) => {
                return (
                    <>
                        <CFormInput
                            className='form-control'
                            type="text"
                            name="qty"
                            onChange={(e) => handleChangeQty(e, data)}
                        />
                    </>
                )
            }
        }, {
            name: 'projectServiceChargeId',
            header: 'Action',
            textAlign: 'center',
            defaultWidth: 110,
            render: ({ value, cellProps }) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className='textBlue px-2'
                            title='Order Request'
                            size='sm'
                            onClick={() =>
                                handleComponentQty(value)
                            }
                        />
                    </>
                )
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
            >
                <CModalHeader>
                    <CModalTitle>Additonal Service Charge</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol className="d-none d-md-block text-end">
                            <SmartTable
                                data={serviceChargeData}
                                columns={additionalServiceChargeColumn}
                                minHeight={200}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        </>
    )
}

export default ModalAdditionalService;
