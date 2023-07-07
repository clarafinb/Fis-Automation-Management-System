import React, { Suspense } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {
  const [cookies, setCookie] = useCookies(["dashboard"]);
  console.log(cookies)
  return (
    <CContainer xxl className='container-dashboard'>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route 
            path="/" 
            element={
              <Navigate to={cookies?.dashboard?.dashboardURL === '/usr/dashboardOpsLead' ? "dashboard-ops-lead" : "dashboard"} replace />
            } 
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
