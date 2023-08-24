import React, { useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import { CBadge, CNavGroup, CNavItem, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import { navigation } from '../_nav'

import * as actionType from "../config/redux/Global/actionType"
import * as actions_dashbboard from "../config/redux/Dashboard/actions"
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { handleRoleDashboard } from 'src/helper/urlHelper'

const AppSidebar = () => {
  const { dispatch, Global, Dashboard } = useRedux()
  const [url, setUrl] = useState()
  const [style, setStyle] = useState()
  const [cookies, setCookie] = useCookies(["dashboard"]);

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
        {/* <SimpleBar>
          <AppSidebarNav items={navItems} />
        </SimpleBar> */}
        {/* {Dashboard?.menu?.map((val, idx) => (
          <CNavGroup toggler={val?.Name} key={idx}>
            {val?.Children?.map((item, idx2) => (
              <CNavItem
                key={idx2}
                onClick={() => handleActiveMenu(item?.Path)}
                className='py-1'
              >
                <img src={'icon/icon_dashboard.png'} className='px-1' alt="" />
                {item?.Name}
              </CNavItem>
            ))}
          </CNavGroup>
        ))} */}

        {Dashboard?.menu?.map((val, idx) => (
          <React.Fragment key={idx}>
            <CNavGroup
              idx={String(idx)}
              key={idx}
              visible={Dashboard?.activeMenu ? true : false}
              toggler={navLink(val?.Name, <img src={'icon/icon_dashboard.png'} className='px-1' alt="" />)}
            >
              {val?.Children?.map((item, idx2) => (
                <CNavItem
                  key={idx2}
                  className={item?.Path === Dashboard?.activeMenu ? "navItem-active p-3" : "navItem p-3" }
                >
                  <span onClick={() => handleActiveMenu(item?.Path)}>{navLink(item?.Name)}</span>
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
