import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ServiceChargeList = React.lazy(() => import('./views/dashboard/ServiceChargeList'))
const DeliveryMode = React.lazy(() => import('./views/dashboard/DeliveryMode'))
const TransportMode = React.lazy(() => import('./views/dashboard/TransportMode'))
const TransportType = React.lazy(() => import('./views/dashboard/TransportType'))
const Uom = React.lazy(() => import('./views/dashboard/Uom'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/dashboard/setting-management/service-charge', name: 'Service Charge List', element: ServiceChargeList },
  { path: '/dashboard/setting-management/delivery', name: 'Delivery Mode', element: DeliveryMode },
  { path: '/dashboard/setting-management/transport', name: 'Transport Mode', element: TransportMode },
  { path: '/dashboard/setting-management/transport-type', name: 'Transport Type', element: TransportType },
  { path: '/dashboard/setting-management/uom', name: 'UOM', element: Uom },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
]

export default routes
