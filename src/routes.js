import React from 'react'
// import PickAndPackProgressDetail from './views/dashboard/operationLead/PickAndPackProgressDetail'

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
//Operation Lead
const OrderRequest = React.lazy(() => import('./views/dashboard/operationLead/OrderRequest'))
const PickAndPack = React.lazy(() => import('./views/dashboard/operationLead/PickAndPack'))
const PickAndPackProgress = React.lazy(() => import('./views/dashboard/operationLead/PickAndPackProgress'))
const PickAndPackProgressDetail = React.lazy(() => import('./views/dashboard/operationLead/PickAndPackProgressDetail'))
const WaitingDispatch = React.lazy(() => import('./views/dashboard/operationLead/WaitingDispatch'))
const WaitingDispatchDetail = React.lazy(() => import('./views/dashboard/operationLead/WaitingDispatchDetail'))
const TransportArrangmentDetail = React.lazy(() => import('./views/dashboard/operationLead/TransportArrangmentDetail'))
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))

const routes = [
  { path: '/', exact: true, name: 'HOME' },
  { path: '/profile', name: 'PROFILE', element: Profile },
  { path: '/dashboard', name: 'DASHBOARD', element: Dashboard },
  { path: '/dashboard/warehouse/:id', name: 'WAREHOUSE', element: Warehouse },
  { path: '/dashboard/setting-management/service-charge', name: 'SERVICE CHARGE LIST', element: ServiceChargeList },
  { path: '/dashboard/setting-management/delivery', name: 'DELIVERY MODE', element: DeliveryMode },
  { path: '/dashboard/setting-management/transport', name: 'TRANSPORT MODE', element: TransportMode },
  { path: '/dashboard/setting-management/transport-type', name: 'TRANSPORT TYPE', element: TransportType },
  { path: '/dashboard/setting-management/uom', name: 'UOM', element: Uom },
  { path: '/dashboard/setting-management/customer', name: 'CUSTOMER', element: Customer },
  { path: '/dashboard/setting-management/account-management', name: 'ACCOUNT MANAGEMENT', element: AccountManagement },
  { path: '/dashboard/project-service-charge/:id', name: 'PROJECT SERVICE CHARGE', element: ProjectServiceCharge },
  { path: '/dashboard/project-member/:id', name: 'PROJECT MEMBER', element: ProjectMember },
  { path: '/dashboard/sku/:id', name: 'PROJECT MASTER SKU', element: Sku },
  { path: '/operation-lead/order-request/:projectId', name: 'ORDER REQUEST', element: OrderRequest },
  { path: '/operation-lead/pick-pack/:projectId', name: 'PICK AND PACK PENDING', element: PickAndPack },
  { path: '/operation-lead/pick-pack/progress/:projectId', name: 'PICK AND PACK PENDING', element: PickAndPackProgress },
  { path: '/operation-lead/pick-pack/progress/:projectId/detail/:orderReqId', name: 'PICK AND PACK PENDING', element: PickAndPackProgressDetail },
  { path: '/operation-lead/waiting-dispatch/:projectId', name: 'WAITING DELIVERY', element: WaitingDispatch},
  { path: '/operation-lead/waiting-dispatch/:projectId/detail/:orderReqId', name: 'WAITING DELIVERY DETAIL', element: WaitingDispatchDetail},
  { path: '/operation-lead/waiting-dispatch/transport-arrangment/:transportArrangmentId/:transportModeId/:projectId/:orderReqId', name: 'TRANSPORT ARRANGMENT DETAIL', element: TransportArrangmentDetail},
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
]

export default routes
