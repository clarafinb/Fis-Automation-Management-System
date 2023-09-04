import { CCard, CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'

function PageNoneSelectedProject() {
  return (
    <div className="min-vh-70 d-flex flex-row align-items-center">
      <CContainer fluid>
        <CCard className='card-dashboard'>
          <CRow className="justify-content-center m-5">
            <CCol>
              <div className="text-center">
                <h2 className="mb-0">
                  <b><span className='textYellow'>SELECT</span> <span className='textBlue'>LIST PROJECT</span></b>
                </h2>
                <CRow className='mt-5'>
                  <CCol>
                    <p>Please select &quot;LIST PROJECT&quot; and &quot;LIST WAREHOUSE&quot;</p>
                  </CCol>
                </CRow>
                <CRow className='mt-5'>
                  <CCol>
                    <img src='/icon/selectProject.png' alt='none' />
                  </CCol>
                </CRow>
              </div>
            </CCol>
          </CRow>
        </CCard>
      </CContainer>
    </div>

  )
}

export default PageNoneSelectedProject
