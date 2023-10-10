import { CBadge, CCol, CRow } from '@coreui/react'
import React from 'react'

function HeaderProject({ data }) {
    return (
        <CRow>
            <CCol sm={1} className='me-1'>
                <img src={'icon/icon_project_grey.png'} alt="icon_project" className='py-2' />
            </CCol>
            <CCol>
                <CRow className='px-2'>
                    <CCol>
                        <h5>{data?.projectName}</h5>
                    </CCol>
                </CRow>
                <CRow className='px-2'>
                    <CCol>
                        <CBadge className="badge-blue">{data?.whName}</CBadge>
                        <span className='px-3'>|</span> 
                        <CBadge className="badge-blue">{data?.whCode}</CBadge>
                    </CCol>
                    
                </CRow>
            </CCol>
        </CRow>
    )
}

export default HeaderProject
