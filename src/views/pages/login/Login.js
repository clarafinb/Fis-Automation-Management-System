import React, { useState, useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'
import { useNavigate } from 'react-router-dom'
import {
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
import * as actionsDashboard from '../../../config/redux/Dashboard/actions'
import ButtonSubmit from 'src/components/custom/button/ButtonSubmit';
import { handleRoleDashboard } from 'src/helper/urlHelper';
import LoadingGif from 'src/components/custom/loading/LoadingGif';

const Login = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const { dispatch, Global, Dashboard } = useRedux();
  const nav = useNavigate();

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    setLoading(true)
    let user = event.target
    let username = user.username.value
    let password = user.password.value

    if (!username || !password) {
      setVisible(true)
      setLoading(false)
    } else {
      let payload = {
        username: username,
        password: password
      }
      dispatch(actions.actionLogin(payload))
      .then((result) => {
        setLoading(false)
      })
    }
    event.preventDefault()
    event.stopPropagation()
  }

  useEffect(() => {
    if (Global.user.userLogin && cookies) {
      setCookie('user', Global?.user, { path: '/' })
      dispatch(actionsDashboard.getDashboard(Global?.user?.roleInf?.roleId))
      dispatch(actionsDashboard.getMenu(Global?.user?.roleInf?.roleId))
    }
  }, [Global.user, nav, setCookie]);

  useEffect(() => {
    if (Global.user.userLogin) {
      setLoading(false)
      setCookie('dashboard', Dashboard?.detailDashboard, { path: '/' })
      if (Dashboard?.detailDashboard?.dashboardURL) {
        nav(handleRoleDashboard(Dashboard?.detailDashboard?.dashboardURL))
      }

      if(Dashboard?.menu){
        setCookie('menu', Dashboard?.menu, { path: '/' })
      }
    }
  }, [Dashboard?.detailDashboard?.dashboardURL, Dashboard?.menu])

  return (
    <>
      {loading && <LoadingGif />}
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
                <img src="/logo/fams-logo-1.png" alt="PT Fan Indonesia Sejahtera" width={300} />
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
                          <CFormInput placeholder="Username" name="username" />
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
                          <CFormCheck id="flexCheckDefault" label="Remember Me" />
                        </CCol>
                        <CCol>
                          <div className="float-end">
                            <small>Forgot Password</small>
                          </div>
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol className="d-grid gap-2">
                          <ButtonSubmit label="LOGIN" type="submit" />
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
    </>

  )
}

export default Login
