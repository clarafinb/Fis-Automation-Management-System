import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
    CTabContent,
} from '@coreui/react'
import {
    cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalCreateMrs from 'src/components/dashboard/masterWarehouse/mrs/ModalCreateMrs'
import TableListMrs from 'src/components/dashboard/masterWarehouse/mrs/TableListMrs'
import { useLocation, useNavigate } from 'react-router-dom'

function Mrs() {
    const nav = useNavigate();
    const { dispatch, Global, Dashboard } = useRedux()
    const [modalCreate, setModalCreate] = useState(false)
    const [projectId, setProjectId] = useState("")
    const { pathname } = useLocation();

    useEffect(() => {
        const id = pathname.split('/')[2]
        setProjectId(id)
        if (Global?.user?.token) {
            dispatch(actions.getListMrs(id))
        }
    }, [projectId]);

    const handleCreate = () => {
        setModalCreate(true)
    }

    const handleToogle = useCallback(
        (val, data) => {
            let mrsId = data?.mrsId
            dispatch(actions.setInUseMrs(mrsId, projectId, Global.user.userID))
        }, [Dashboard.listMrs]
    )

    const handleComponent = useCallback(
        (action, value, data) => {
            if (action === 'detail') {
                nav(`detail/${value}`)
            }
        }
    )


    return (
        <>
            <CContainer fluid>
                <CRow>
                    <CCol sm={5}>
                        <h4 className="card-title mb-0">
                            <span className='text-underline'>PR</span>OJECT MASTER MRS
                        </h4>
                    </CCol>
                </CRow>
                <br />
                <CRow>
                    <CCol className="d-none d-md-block">
                        <CButton className="colorBtn-white" onClick={handleCreate}>
                            <CIcon icon={cilPlus} className="me-2 text-warning" />
                            ADD PROJECT MASTER MRS
                        </CButton>
                    </CCol>
                </CRow>
                <br />
                <CCard className="">
                    <CCardBody>
                        <CRow>
                            <CCol className="d-none d-md-block text-end">
                                <CTabContent>
                                    <TableListMrs
                                        data={Dashboard?.listMrs}
                                        handleToogle={handleToogle}
                                        handleComponent={handleComponent}
                                    />
                                </CTabContent>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer >

            <ModalCreateMrs
                open={modalCreate}
                setOpen={setModalCreate}
                projectId={projectId}
            />

        </>
    )
}

export default Mrs