import React, { useState,useEffect } from 'react'
import { useRedux } from '../../../utils/hooks'
import { useNavigate} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import * as actions from '../../../config/redux/Global/actions'

const Login = () => {
  const { dispatch, Global } = useRedux();
  const nav = useNavigate();

  const [visible, setVisible] = useState(false)

  const handleSubmit = (event) => {
    let user = event.target
    let username = user.username.value
    let password = user.password.value
    
    if(!username || !password){
      setVisible(true)
    }else{
      let payload = {
        username: username
      }
      dispatch(actions.actionSetUser(payload));
      
    }

    event.preventDefault()
    event.stopPropagation()
  }

  useEffect(() => {
		if (Global.user.username) {
			nav("/");
		}
	}, [Global?.user, nav]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>Username dan Password tidak boleh kosong !</CAlert>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <div className="text-center">
                  <img src="/images/logo-pt-fan-indonesia-sejahtera.jpg" alt="PT Fan Indonesia Sejahtera" />
                </div>
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h4 className="textBlue">Login</h4>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" name="username"/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol>
                        <div className="d-grid gap-2">
                          <CButton className="colorBtn-orange" type="submit">
                            Login
                          </CButton>
                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
