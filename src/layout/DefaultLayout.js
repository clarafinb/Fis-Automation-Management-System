import React, { useEffect } from 'react'
import { useRedux } from '../utils/hooks'
import { useNavigate } from 'react-router-dom'
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader
} from '../components/index'
import { useCookies } from "react-cookie"
import * as actions from '../config/redux/Global/actions'
import IdleTimer from 'src/components/custom/idle/IdleTimer'
import * as actions_dashboard from '../config/redux/Dashboard/actions'

const DefaultLayout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "menu"]);
  const { dispatch } = useRedux();
  const nav = useNavigate();

  const handleIdle = () => {
    dispatch(actions.actionResetUser());
    dispatch(actions_dashboard.resetDetailDashboard())
    removeCookie('user');
    removeCookie('dashboardOpsLead');
    removeCookie('menu')
    removeCookie('activeMenu')

    nav("/login")
  }

  const { idleTimer } = IdleTimer({ onIdle: handleIdle, idleTime: 10 })

  useEffect(() => {
    if (cookies?.user) {
      dispatch(actions.actionSetReduxUser(cookies.user))
    }
    if(cookies?.menu) {
      dispatch(actions_dashboard.actionSetReduxMenu(cookies.menu))
    }

    if(cookies?.activeMenu) {
      dispatch(actions_dashboard.actionSetReduxActiveMenu(cookies.activeMenu))
    }
  }, []);

  useEffect(() => {
    if (!cookies?.user) {
      nav("/login")
    }
  }, []);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
