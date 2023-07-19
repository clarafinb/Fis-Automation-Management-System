import React, { Suspense } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { handleRoleDashboard } from 'src/helper/urlHelper'

// routes config
import routes from '../routes'

const AppContent = () => {
  const [cookies,setCookie] = useCookies(["dashboard"]);

  console.log(cookies?.dashboard?.dashboardURL)

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
              <Navigate to={() => handleRoleDashboard(cookies?.dashboard?.dashboardURL)} replace />
            }
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
