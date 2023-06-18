import React from 'react'
import { useSelector } from 'react-redux'
import { useRedux } from 'src/utils/hooks'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

import * as actionType from "../config/redux/Global/actionType"

const AppSidebar = () => {
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const { dispatch, Global } = useRedux();

  console.log(Global)
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={Global?.sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({
          type: actionType.SET_SIDEBAR,
          payload: {sidebarShow: visible},
        })
      }}
      className='bg-white'
    >
      <CSidebarBrand className="d-none d-md-flex bg-warning" to="/">
          <h5>FAMS</h5>
        </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
