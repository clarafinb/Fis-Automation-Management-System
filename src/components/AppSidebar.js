import React, { useEffect, useState } from 'react'
import { useRedux } from 'src/utils/hooks'
import { CBadge, CButton, CNavGroup, CNavItem, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import { navigation } from '../_nav'

import * as actionType from "../config/redux/Global/actionType"
import * as actions_dashbboard from "../config/redux/Dashboard/actions"
import { useCookies } from 'react-cookie'
import { handleRoleDashboard } from 'src/helper/urlHelper'
import { useNavigate } from 'react-router-dom'

const AppSidebar = () => {
  const { dispatch, Global, Dashboard, DashboardOpsLead } = useRedux()
  const [url, setUrl] = useState()
  const [style, setStyle] = useState()
  const [cookies, setCookie] = useCookies(["dashboard"]);
  const nav = useNavigate()

  useEffect(() => {
    if (!Global?.sidebarUnfoldable) {
      setUrl('logo/fams_logo.png')
      setStyle()
    } else {
      setUrl('logo/fams_icon.svg')
      setStyle("logo")
    }
  }, [Global?.sidebarUnfoldable])

  const handleDefaultDashboard = (navs) => {
    const items = []
    for (const iterator of navs) {
      if (iterator.name === 'Dashboard') {
        iterator.to = handleRoleDashboard(cookies?.dashboard?.dashboardURL)
      }
      items.push(iterator)
    }
    return items
  }

  const handleActiveMenu = (path) => {
    setCookie('activeMenu', path, { path: '/' })
    dispatch(actions_dashbboard.actionSetReduxActiveMenu(path))

    if(DashboardOpsLead?.project?.projectId){
      nav("/dashboard-ops-lead")
    }
  }

  const navItems = handleDefaultDashboard(navigation())

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  return (
    <CSidebar
      position="fixed"
      unfoldable={Global?.sidebarUnfoldable}
      visible={Global?.sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({
          type: actionType.SET_SIDEBAR,
          payload: { sidebarShow: visible },
        })
      }}
      className='bg-white'
    >
      <CSidebarBrand className="d-none d-md-flex bg-white m-4" to="/">
        <div><img src={url} className={style} alt='logo' /></div>
      </CSidebarBrand>
      <hr />
      <CSidebarNav>
        {Dashboard?.menu?.map((val, idx) => (
          <React.Fragment key={idx}>
            <CNavGroup
              className='show'
              idx={String(idx)}
              key={idx}
              visible={Dashboard?.activeMenu ? true : false}
              toggler={navLink(val?.Name, <img src={'icon/icon_dashboard.png'} className='px-1' alt="" />)}
            >
              {val?.Children?.map((item, idx2) => (
                <CNavItem
                  key={idx2}
                  className='p-2 px-4'
                >
                  <CButton
                    onClick={() => handleActiveMenu(item?.Path)}
                    className={item?.Path === Dashboard?.activeMenu ? "btnNav-active" : "btnNav" }
                  >
                    <span >{navLink(item?.Name)}</span>
                  </CButton>
                </CNavItem>
              ))}
            </CNavGroup>
          </React.Fragment>
        ))}

      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {
          dispatch({
            type: actionType.SET_SIDEBAR_FOLDABLE,
            payload: { sidebarUnfoldable: !Global?.sidebarUnfoldable },
          })
        }}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
