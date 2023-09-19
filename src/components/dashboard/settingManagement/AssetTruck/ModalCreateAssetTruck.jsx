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
import { formatStandartDate } from 'src/helper/globalHelper'
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

    const [brand, setBrand] = useState([])
    const [selectedBrand, setSelectedBrand] = useState({});

    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({});

    const [errMessage, setErrMessage] = useState("")
    const [visible, setVisible] = useState(false)

    const [stnkExpiryDate, setStnkExpiryDate] = useState("");
    const [kirExpiryDate, setKirExpiryDate] = useState("");

    useEffect(() => {
        if (Global?.user?.token && open) {

            resetForm()

            initFormSelect()
            
            if (isEdit) autoFillEditForm(dataEdit.vehicleId)
        }
    }, [Global?.user, isEdit, open, dataEdit]);

    const resetForm = () => {
        // reset form field
        setData({})
        setValues({})
        setErrMessage(null)

        //reset form date
        setStnkExpiryDate(null)
        setKirExpiryDate(null)

        //reset form select
        setSelectedTransportType({})
        setSelectedPlatCode({})
        setSelectedOwnershipCategory({})
        setSelectedBrand({})
        setSelectedCategory({})

    }

    const initFormSelect = () => {
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
                }),
            dispatch(actions.getMasterVehicleBrandActiveOnly())
                .then(e => {
                    setBrand(e)
                }),
            dispatch(actions.getMasterVehicleCategoryActiveOnly())
                .then(e => {
                    setCategory(e)
                })
        ])
    }

    const autoFillEditForm = (id) => {
        dispatch(actions.getMasterVehiclesDetail(id))
            .then(resp => {
                setData(resp)

                const brandFind = brand.find(e => e.value === resp.brandId)
                setSelectedBrand(brandFind || {})

                const catFind = category.find(e => e.value === resp.vehicleCategoryId)
                setSelectedCategory(catFind)

                const transFind = transportType.find(e => e.value === resp.transportTypeId)
                setSelectedTransportType(transFind)

                const platFind = platCode.find(e => e.value === resp.plateCodeFirst)
                setSelectedPlatCode(platFind)

                const ownerFind = ownershipCategory.find(e => e.value === resp.ownershipCatId)
                setSelectedOwnershipCategory(ownerFind)

            })
    }

    const handleCreateAssetTruck = (event) => {

        event.preventDefault()
        event.stopPropagation()

        let payload = {
            brandId: selectedBrand?.value,
            vehicleType: values?.vehicleType,
            vehicleCategoryId: selectedCategory?.value,
            transportTypeId: selectedTransportType?.value,
            numberPlate: values.numberPlate || data.numberPlate,
            platCodeFirst: selectedPlatCode?.value,
            platCodeLast: values.plateCodeLast || data.plateCodeLast,
            stnkNumber: values.stnkNumber || data.stnkNumber,
            chassisNumber: values.chassisNumber || data.chassisNumber,
            engineNumber: values.engineNumber || data.engineNumber,
            stnkExpiryDate: formatStandartDate(stnkExpiryDate || data.stnkExpiryDate),
            kirExpiryDate: formatStandartDate(kirExpiryDate || data.kirExpiryDate),
            ownerName: values.ownerName || data.ownerName,
            vehicleOwnershipCatId: selectedOwnershipCategory?.value,
            LMBY: Global.user.userID
        }

        let methode = "POST"
        if (isEdit) {
            methode = "PUT"
            payload.vehicleId = data?.vehicleId
        }

        const err = []

        if (payload.transportTypeId === undefined) err.push('Transport Type')
        if (payload.platCodeFirst === undefined) err.push('First Palte Letter')
        if (payload.vehicleOwnershipCatId === undefined) err.push('Ownership Type')
        if (payload.brandId === undefined) err.push('Brand')
        if (payload.vehicleCategoryId === undefined) err.push('Category')

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
            const { value, name } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));

        }, [setValues]
    )

    const handleChangeDate = (date, name) => {
        if (name === 'stnkExpiryDate') setStnkExpiryDate(date)
        if (name === 'kirExpiryDate') setKirExpiryDate(date)
    }
    const handleOnChangetransportType = (selectedTransportType) => {
        setSelectedTransportType(selectedTransportType);
    }

    const handleOnChangePlatCode = (selectedPlatCode) => {
        setSelectedPlatCode(selectedPlatCode);
    }

    const handleOnChangeOwnershipCategory = (selectedOwnershipCategory) => {
        setSelectedOwnershipCategory(selectedOwnershipCategory);
    }

    const handleOnChangeBrand = (selectedBrand) => {
        setSelectedBrand(selectedBrand);
    }

    const handleOnchangeCategory = (selectedCategory) => {
        setSelectedCategory(selectedCategory);
    }

    return (
        <CModal
            size="lg"
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
                    <CRow>
                        <CCol md={6}>


                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Brand</CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={brand}
                                        isSearchable={true}
                                        value={selectedBrand}
                                        onChange={handleOnChangeBrand}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Vehicle Type</CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="vehicleType"
                                        value={values?.vehicleType || data?.vehicleType}
                                        onChange={handleOnchange}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Vehicle Category</CFormLabel>
                                <CCol>
                                    <Select
                                        className="input-select"
                                        options={category}
                                        isSearchable={true}
                                        value={selectedCategory}
                                        onChange={handleOnchangeCategory}
                                        required
                                    />
                                </CCol>
                            </CRow>
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
                        </CCol>
                        <CCol>
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
                                <CFormLabel className="col-form-label">Chassis Number</CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="chassisNumber"
                                        value={values?.chassisNumber || data?.chassisNumber}
                                        onChange={handleOnchange}
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">Engine Number</CFormLabel>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        name="engineNumber"
                                        value={values?.engineNumber || data?.engineNumber}
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
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">STNK Expiry Date</CFormLabel>
                                <CCol>
                                    <DateInput
                                        name="stnkExpiryDate"
                                        value={stnkExpiryDate || data?.stnkExpiryDate}
                                        onChange={handleChangeDate}
                                        required={true}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-form-label">KIR Expiry Date</CFormLabel>
                                <CCol>
                                    <DateInput
                                        name="kirExpiryDate"
                                        value={kirExpiryDate || data?.kirExpiryDate}
                                        onChange={handleChangeDate}
                                        required={true}
                                    />
                                </CCol>
                            </CRow>
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
            </CForm>
        </CModal>
    )
}

export default ModalCreateAssetTruck;
