import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import Swal from 'sweetalert2'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow
} from '@coreui/react'
import {
    cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateCustomer from 'src/components/dashboard/settingManagement/customer/ModalCreateCustomer'
import TableListCustomer from 'src/components/dashboard/settingManagement/customer/TableListCustomer'
import ModalPreviewImage from 'src/components/custom/modal/ModalPreviewImage'
import ModalUploadFile from 'src/components/custom/modal/ModalUploadFile'

function Customer() {
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [selectedData, setSelectedData] = useState({})
    const [modalImage, setModalImage] = useState(false)

    const [modalUpload, setModalUpload] = useState(false)
    const [templateUrl, setTemplateUrl] = useState("")
    const [templateName, setTemplateName] = useState("")

    useEffect(() => {
        if (Global?.user?.token) {
            dispatch(actions.getListCustomer())
        }
    }, [Global?.user]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let customerId = data?.customerId
            dispatch(actions.setStatusActiveCustomer(val, customerId))
        }, [Dashboard.listCustomer]
    )


    const handleComponent = (type, data) => {
        setSelectedData(data)

        if (type === "view") setModalImage(true)

        if (type === "add") setModalUpload(true)

        if (type === "reset") resetCustomerLogo(data.customerId)
    }

    const handleUploadFile = (formData) => {
        if (formData) {
            dispatch(actions.addCustomerLogo(
                formData,
                selectedData?.customerId,
                Global.user.userID
            )).then(resp => {
                if (resp === "success") {
                    dispatch(actions.getListCustomer())
                    setModalUpload(false)
                }
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'File Empty !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const resetCustomerLogo = (customerId) => {
        dispatch(actions.resetCustomerLogo(customerId, Global.user.userID))
            .then(resp => {
                if (resp === "success") {
                    dispatch(actions.getListCustomer())
                }
            })
        }

        return (
            <>
                <CRow>
                    <CCol sm={5} className='mb-4'>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>CU</span>STOMER
                        </h4>
                    </CCol>
                </CRow>
                <CRow className='mb-4'>
                    <CCol className="">
                        <CButton
                            className="colorBtn-white"
                            onClick={handleCreate}>
                            <CIcon icon={cilPlus}
                                className="me-2 text-warning"
                            />
                            ADD CUSTOMER
                        </CButton>
                    </CCol>
                </CRow>
                <CCard className="">
                    <CCardBody>
                        <CRow>
                            <CCol>
                                <TableListCustomer
                                    data={Dashboard?.listCustomer}
                                    handleToogle={handleToogle}
                                    handleComponent={handleComponent}
                                />
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>

                <ModalCreateCustomer
                    open={modalCreate}
                    setOpen={setModalCreate}
                />

                <ModalPreviewImage
                    open={modalImage}
                    setOpen={setModalImage}
                    urlImage={selectedData?.customerLogoPath}
                    imageName={selectedData?.customer_name}
                />

                <ModalUploadFile
                    open={modalUpload}
                    setOpen={setModalUpload}
                    templateName={templateName}
                    handleUpload={handleUploadFile}
                    useTemplate={false}
                    title={`Upload ${selectedData?.customer_name} Logo`}
                />
            </>
        )
    }

    export default Customer