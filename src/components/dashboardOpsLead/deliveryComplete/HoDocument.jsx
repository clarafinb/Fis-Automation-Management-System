import React, { useState, useCallback, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import {
    CCol,
    CRow
} from '@coreui/react'
import * as actions from '../../../config/redux/Dashboard/actions'
import ModalOpenMap from 'src/components/dashboard/warehouse/ModalOpenMap'
import TableListHoDocument from 'src/components/dashboardOpsLead/deliveryComplete/TableListHoDocument'
import ModalImageHo from 'src/components/dashboardOpsLead/deliveryComplete/ModalImageHo'

const HoDocument = ({ orderReqId, visible }) => {
    const { dispatch, Global, Dashboard } = useRedux()
    const [mapKey, setMapKey] = useState(Date.now())
    const [selectedData, setSelectedData] = useState({})
    const [modalImage, setModalImage] = useState(false)
    const [modalMap, setModalMap] = useState(false)

    useEffect(() => {
        if (Global?.user?.token && orderReqId && visible) {
            dispatch(actions.getListHoDocument(orderReqId))
        }
    }, [visible]);

    const handleComponent = useCallback(
        (type, data) => {
            setSelectedData(data)
            if (type === "map") {
                setModalMap(true)
                setMapKey(Date.now())
            } else if (type === "image") {
                setModalImage(true)
            }
        }
    )

    return (
        <>
            <CRow className='mb-4'>
                <CCol sm={5}>
                    <h5 className="card-title mb-0">
                        <span className='text-underline'>HO</span> DOCUMENT
                    </h5>
                </CCol>
            </CRow>
            <CCol className="d-none d-md-block">
                <TableListHoDocument
                    data={Dashboard?.listHoDocument}
                    handleComponent={handleComponent}
                />
            </CCol>

            {/* MODAL MAP */}
            <ModalOpenMap
                open={modalMap}
                setOpen={setModalMap}
                data={selectedData}
                key={mapKey}
            />
            {/* MODAL IMAGES */}
            <ModalImageHo
                open={modalImage}
                setOpen={setModalImage}
                data={selectedData}
            />
        </>
    )
}

export default HoDocument