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
import * as actions from '../../../../config/redux/Dashboard/actions'
import ButtonCancel from 'src/components/custom/button/ButtonCancel'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit'
import Select from 'react-select'
import { formatStandartDate, formatDateInput } from 'src/helper/globalHelper'
import Alert from 'src/components/custom/toast/Alert'
import DateInput from 'src/components/custom/form/DateInput'

function ModalCreateAssetTruck({ open, setOpen, isEdit = false, dataEdit }) {
    const { dispatch, Global } = useRedux()
    const [values, setValues] = useState({})
    const [data, setData] = useState({})

    const [transportType, setTransportType] = useState([])
    const [selectedTransportType, setSelectedTransportType] = useState({});

    const [platCode, setPlatCode] = useState([])
    const [selectedPlatCode, setSelectedPlatCode] = useState({});

    const [ownershipCategory, setOwnershipCategory] = useState([])
    const [selectedOwnershipCategory, setSelectedOwnershipCategory] = useState({});

    const [errMessage, setErrMessage] = useState(null)
    const [visible, setVisible] = useState(false)

    const [stnkExpiryDate, setStnkExpiryDate] = useState(null);


    useEffect(() => {
        if (Global?.user?.token && open) {

            resetForm()

            if (isEdit) {
                setData(dataEdit)
            }

            Promise.all([
                dispatch(actions.getSelecTransportType())
                    .then(e => {
                        setTransportType(e)
                    }),
                dispatch(actions.getSelecPlatCode())
                    .then(e => {
                        setPlatCode(e)
                    }),
                dispatch(actions.getMasterOwnershipVehicleCategoryActiveOnly())
                    .then(e => {
                        setOwnershipCategory(e)
                    })
            ])


        }
    }, [Global?.user, isEdit, open, dataEdit]);

    const resetForm = () => {
        // reset form field
        setData({})
        setValues({})
        setErrMessage(null)

        //reset form date
        setStnkExpiryDate(null)

        //reset form select
        setSelectedTransportType({})
        setSelectedPlatCode({})
        setSelectedOwnershipCategory({})

    }

    const handleCreateAssetTruck = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            transportTypeId: selectedTransportType?.value,
            numberPlate: values.numberPlate || data.numberPlate,
            platCodeFirst: selectedPlatCode?.value,
            platCodeLast: values.plateCodeLast || data.plateCodeLast,
            stnkNumber: values.stnkNumber || data.stnkNumber,
            stnkExpiryDate: formatStandartDate(values.stnkExpiryDate || data.stnkExpiryDate),
            ownerName: values.ownerName || data.ownerName,
            vehicleOwnershipCatId: selectedOwnershipCategory?.value,
            LMBY: Global.user.userID
        }

        console.log(payload)
        return;

        let methode = "POST"
        if (isEdit) {
            methode = "PUT"
            payload.vehicleId = data?.vehicleId
        }

        const err = []

        if (payload.transportTypeId === undefined) err.push('Transport Type')
        if (payload.platCodeFirst === undefined) err.push('First Palte Letter')
        if (payload.vehicleOwnershipCatId === undefined) err.push('Ownership Type')

        if (err.length > 0) {
            setErrMessage(err.join(' , '))
            setVisible(true)
        } else {
            dispatch(actions.createMasterAssetTruck(payload, methode))
            setData({})
            setValues({})
            setOpen(false)
        }


    }

    const handleOnchange = useCallback(
        (e) => {
            console.log(e)
            const { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleChangeStnkExpiryDate = (date, name) => {
        setStnkExpiryDate(date)
    }

    // const handleOnchangeDate = useCallback(
    //     (date, name) => {
    //         setValues((prev) => ({
    //             ...prev,
    //             [name]: date
    //         }));
    //     }, [setValues]
    // )

    // onChange={(date) => {
    //     setStartDate(date)
    //     console.log(date)
    // }}

    const handleOnChangetransportType = (selectedTransportType) => {
        setSelectedTransportType(selectedTransportType);
    }

    const handleOnChangePlatCode = (selectedPlatCode) => {
        setSelectedPlatCode(selectedPlatCode);
    }

    const handleOnChangeOwnershipCategory = (selectedOwnershipCategory) => {
        setSelectedOwnershipCategory(selectedOwnershipCategory);
    }

    return (
        <CModal
            // size="xl"
            visible={open}
            onClose={() => setOpen(false)}
            backdrop="static"
            keyboard={false}
        >
            <CForm onSubmit={handleCreateAssetTruck}>
                <CModalHeader>
                    <CModalTitle>{isEdit ? 'EDIT' : 'ADD'} ASSET TRUCK</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Transport Type</CFormLabel>
                        <CCol>
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
                        <CFormLabel className="col-form-label">First Plate Letter</CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={platCode}
                                isSearchable={true}
                                value={selectedPlatCode}
                                onChange={handleOnChangePlatCode}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Plate Number</CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="numberPlate"
                                value={values?.numberPlate || data?.numberPlate}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Last Plate Letter</CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="plateCodeLast"
                                value={values?.plateCodeLast || data?.plateCodeLast}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Owner Name</CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="ownerName"
                                value={values?.ownerName || data?.ownerName}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">STNK Number</CFormLabel>
                        <CCol>
                            <CFormInput
                                type="text"
                                name="stnkNumber"
                                value={values?.stnkNumber || data?.stnkNumber}
                                onChange={handleOnchange}
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">STNK Expiry Date</CFormLabel>
                        <CCol>
                            {/* <input
                                type="date"
                                className="form-control"
                                name="stnkExpiryDate"
                                value={values?.stnkExpiryDate || formatDateInput(data?.stnkExpiryDate)}
                                onChange={handleOnchange}
                                required
                            /> */}
                            <DateInput
                                name="stnkExpiryDate"
                                value={stnkExpiryDate || data?.stnkExpiryDate}
                                onChange={handleChangeStnkExpiryDate}
                                required={true}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel className="col-form-label">Ownership Type</CFormLabel>
                        <CCol>
                            <Select
                                className="input-select"
                                options={ownershipCategory}
                                isSearchable={true}
                                value={selectedOwnershipCategory}
                                onChange={handleOnChangeOwnershipCategory}
                                required
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CRow>
                        <CCol>
                            <Alert
                                message={errMessage}
                                visible={visible}
                                setVisible={setVisible}
                            />
                        </CCol>
                    </CRow>
                    <ButtonCancel
                        label='CANCEL'
                        handleButton={() => setOpen(false)}
                    />
                    <ButtonSubmit
                        label={isEdit ? 'UPDATE' : 'ADD'}
                        type='submit'
                    />
                </CModalFooter>
                <pre>
                    {JSON.stringify(formatStandartDate(stnkExpiryDate), null, 2)}
                </pre>
            </CForm>
        </CModal>
    )
}

export default ModalCreateAssetTruck;
