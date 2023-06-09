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
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon textBlue" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
    className: 'textBlue'
  },
  {
    component: CNavTitle,
    name: 'Theme',
    className: 'textBlack'
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon textBlue" />,
    className: 'textBlue'
  },
]

export default _nav
