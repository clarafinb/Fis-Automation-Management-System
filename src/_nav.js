import React from 'react'
import { CNavItem } from '@coreui/react'

export const navigation = () => {
  return [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/',
      icon: <img src={'icon/icon_dashboard.png'} className='px-1' />,
      badge: {
        color: 'info',
      },
      className: 'textBlue'
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
}
