import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon text-white" />,
    badge: {
      color: 'info',
    },
    className: 'text-white'
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  //   className: 'textBlack'
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon text-white" />,
  //   className: 'text-white'
  // },
]

export default _nav
