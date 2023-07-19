import React, { useEffect } from 'react'
import { useRedux } from 'src/utils/hooks'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import { navigation } from '../_nav'

import * as actionType from "../config/redux/Global/actionType"
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { handleRoleDashboard } from 'src/helper/urlHelper'

const AppSidebar = () => {
  const { dispatch, Global } = useRedux()
  const [url, setUrl] = useState()
  const [style, setStyle] = useState()
  const [cookies,setCookie] = useCookies(["dashboard"]);

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

  const navItems = handleDefaultDashboard(navigation())


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
        <div><img src={url} className={style} /></div>
      </CSidebarBrand>
      <hr />
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navItems} />
        </SimpleBar>
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
