import React from 'react'

const Profile = React.lazy(() => import('./views/account/Profile'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ServiceChargeList = React.lazy(() => import('./views/dashboard/ServiceChargeList'))
const DeliveryMode = React.lazy(() => import('./views/dashboard/DeliveryMode'))
const TransportMode = React.lazy(() => import('./views/dashboard/TransportMode'))
const TransportType = React.lazy(() => import('./views/dashboard/TransportType'))
const Uom = React.lazy(() => import('./views/dashboard/Uom'))
const Warehouse = React.lazy(() => import('./views/dashboard/Warehouse'))
const ProjectServiceCharge = React.lazy(() => import('./views/dashboard/ProjectServiceCharge'))
const Sku = React.lazy(() => import('./views/dashboard/Sku'))
const Customer = React.lazy(() => import('./views/dashboard/Customer'))
const ProjectMember = React.lazy(() => import('./views/dashboard/ProjectMember'))
const AccountManagement = React.lazy(() => import('./views/dashboard/AccountManagement'))
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/dashboard', name: 'DASHBOARD', element: Dashboard },
  { path: '/dashboard/warehouse/:id', name: 'Warehouse', element: Warehouse },
  { path: '/dashboard/setting-management/service-charge', name: 'Service Charge List', element: ServiceChargeList },
  { path: '/dashboard/setting-management/delivery', name: 'Delivery Mode', element: DeliveryMode },
  { path: '/dashboard/setting-management/transport', name: 'Transport Mode', element: TransportMode },
  { path: '/dashboard/setting-management/transport-type', name: 'Transport Type', element: TransportType },
  { path: '/dashboard/setting-management/uom', name: 'UOM', element: Uom },
  { path: '/dashboard/setting-management/customer', name: 'Customer', element: Customer },
  { path: '/dashboard/setting-management/account-management', name: 'Account Management', element: AccountManagement },
  { path: '/dashboard/project-service-charge/:id', name: 'Project Service Charge', element: ProjectServiceCharge },
  { path: '/dashboard/project-member/:id', name: 'Project Member', element: ProjectMember },
  { path: '/dashboard/sku/:id', name: 'Project Master SKU', element: Sku },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
]

export default routes
