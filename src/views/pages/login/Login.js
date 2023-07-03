import React, { useState,useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
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
  CRow,
  CAlert,
  CFormLabel,
  CFormCheck
} from '@coreui/react'
import { useCookies } from "react-cookie";
import * as actions from '../../../config/redux/Global/actions'

const Login = () => {
  const [cookies, setCookie] = useCookies(["user"]);
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
        username: username,
        password: password
      }
      dispatch(actions.actionLogin(payload));
    }

    event.preventDefault()
    event.stopPropagation()
  }


  useEffect(() => {
		if (Global.user.userLogin) {
      setCookie('user', Global?.user, { path: '/' })
			nav("/");
		}
	}, [Global.user, nav, setCookie]);

  return (
    <div className="background-login min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>Username dan Password tidak boleh kosong !</CAlert>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <div className="text-center">
              <img src="/logo/white-logo.png" alt="PT Fan Indonesia Sejahtera" width={300}/>
            </div>
          </CCol>
        </CRow>
        <br />
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-2">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <p className="text-medium-emphasis"><b>Sign In to continue</b></p>
                    <hr />
                    <CRow className="mb-3">
                      <CFormLabel>Username</CFormLabel>
                      <CCol>
                        <CFormInput placeholder="Username" name="username"/>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel>Password</CFormLabel>
                      <CCol>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          name="password"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol> 
                        <CFormCheck id="flexCheckDefault" label="Remember Me"/>
                      </CCol>
                      <CCol> 
                        <div className="float-end">
                          <small>Forgot Password</small>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol className="d-grid gap-2">
                        <CButton className="colorBtn-yellow" type="submit">
                          LOGIN
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        <CRow className="justify-content-center mt-2">
          <CCol md={4} className="text-center">
              <small className="textWhite">COPYRIGHT @ 2023 | FIS AUTOMATION SYSTEM</small>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
