import React from 'react'
// import PickAndPackProgressDetail from './views/dashboard/operationLead/PickAndPackProgressDetail'

const Profile = React.lazy(() => import('./views/account/Profile'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DashboardOpsLead = React.lazy(() => import('./views/dashboardOpsLead/Dashboard'))
const ServiceChargeList = React.lazy(() => import('./views/dashboard/settingManagement/ServiceChargeList'))
const DeliveryMode = React.lazy(() => import('./views/dashboard/settingManagement/DeliveryMode'))
const TransportMode = React.lazy(() => import('./views/dashboard/settingManagement/TransportMode'))
const TransportType = React.lazy(() => import('./views/dashboard/settingManagement/TransportType'))
const Uom = React.lazy(() => import('./views/dashboard/settingManagement/Uom'))
const Warehouse = React.lazy(() => import('./views/dashboard/Warehouse'))
const ProjectServiceCharge = React.lazy(() => import('./views/dashboard/ProjectServiceCharge'))
const Sku = React.lazy(() => import('./views/dashboard/Sku'))
const Customer = React.lazy(() => import('./views/dashboard/settingManagement/Customer'))
const ProjectMember = React.lazy(() => import('./views/dashboard/ProjectMember'))
const AccountManagement = React.lazy(() => import('./views/dashboard/settingManagement/AccountManagement'))
const SubDistrictManagement = React.lazy(() => import('./views/dashboard/SubDistrictManagement'))
const WarehouseType = React.lazy(() => import('./views/dashboard/settingManagement/WarehouseType'))
//Operation Lead
const OrderRequest = React.lazy(() => import('./views/dashboardOpsLead/OrderRequest'))
const PickAndPack = React.lazy(() => import('./views/dashboardOpsLead/PickAndPack'))
const PickAndPackProgress = React.lazy(() => import('./views/dashboardOpsLead/PickAndPackProgress'))
const PickAndPackProgressDetail = React.lazy(() => import('./views/dashboardOpsLead/PickAndPackProgressDetail'))
const WaitingDispatch = React.lazy(() => import('./views/dashboardOpsLead/WaitingDispatch'))
const WaitingDispatchDetail = React.lazy(() => import('./views/dashboardOpsLead/WaitingDispatchDetail'))
const TransportArrangmentDetail = React.lazy(() => import('./views/dashboardOpsLead/TransportArrangmentDetail'))
const DeliveryTransit = React.lazy(() => import('./views/dashboardOpsLead/DeliveryTransit'))
const DeliveryTransitDetail = React.lazy(() => import('./views/dashboardOpsLead/DeliveryTransitDetail'))
const DeliveryComplete = React.lazy(() => import('./views/dashboardOpsLead/DeliveryComplete'))
const DeliveryCompleteDetail = React.lazy(() => import('./views/dashboardOpsLead/DeliveryCompleteDetail'))
const MasterLocation = React.lazy(() => import('./views/dashboardOpsLead/MasterLocation'))
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))


const routes = [
  // { path: '/', exact: true, name: 'HOME' },
  { path: '/profile', name: 'PROFILE', element: Profile },
  { path: '/dashboard', name: 'DASHBOARD', element: Dashboard },
  { path: '/dashboard-ops-lead', name: 'DASHBOARD', element: DashboardOpsLead },
  { path: '/dashboard/warehouse/:id', name: 'WAREHOUSE', element: Warehouse },
  { path: '/dashboard/setting-management/service-charge', name: 'SERVICE CHARGE LIST', element: ServiceChargeList },
  { path: '/dashboard/setting-management/delivery', name: 'DELIVERY MODE', element: DeliveryMode },
  { path: '/dashboard/setting-management/transport', name: 'TRANSPORT MODE', element: TransportMode },
  { path: '/dashboard/setting-management/transport-type', name: 'TRANSPORT TYPE', element: TransportType },
  { path: '/dashboard/setting-management/uom', name: 'UOM', element: Uom },
  { path: '/dashboard/setting-management/customer', name: 'CUSTOMER', element: Customer },
  { path: '/dashboard/setting-management/account-management', name: 'ACCOUNT MANAGEMENT', element: AccountManagement },
  { path: '/dashboard/setting-management/sub-district', name: 'SUB DISTRICT MANAGEMENT', element: SubDistrictManagement },
  { path: '/dashboard/setting-management/warehouse-type', name: 'WAREHOUSE TYPE', element: WarehouseType },
  { path: '/dashboard/project-service-charge/:id', name: 'PROJECT SERVICE CHARGE', element: ProjectServiceCharge },
  { path: '/dashboard/project-member/:id', name: 'PROJECT MEMBER', element: ProjectMember },
  { path: '/dashboard/sku/:id', name: 'PROJECT MASTER SKU', element: Sku },
  { path: '/dashboard-ops-lead/order-request/:projectId', name: 'ORDER REQUEST', element: OrderRequest },
  { path: '/dashboard-ops-lead/pick-pack/:projectId', name: 'PICK AND PACK PENDING', element: PickAndPack },
  { path: '/dashboard-ops-lead/pick-pack/progress/:projectId', name: 'PICK AND PACK PENDING', element: PickAndPackProgress },
  { path: '/dashboard-ops-lead/pick-pack/progress/:projectId/detail/:orderReqId', name: 'PICK AND PACK PENDING', element: PickAndPackProgressDetail },
  { path: '/dashboard-ops-lead/waiting-dispatch/:projectId', name: 'WAITING DELIVERY', element: WaitingDispatch },
  { path: '/dashboard-ops-lead/waiting-dispatch/:projectId/detail/:orderReqId', name: 'WAITING DELIVERY DETAIL', element: WaitingDispatchDetail },
  { path: '/dashboard-ops-lead/waiting-dispatch/transport-arrangment/:transportArrangmentId/:transportModeId/:projectId/:orderReqId', name: 'TRANSPORT ARRANGMENT DETAIL', element: TransportArrangmentDetail },
  { path: '/dashboard-ops-lead/delivery-transit/:projectId', name: 'DELIVERY TRANSIT', element: DeliveryTransit },
  { path: '/dashboard-ops-lead/delivery-transit/:projectId/detail/:orderReqId', name: 'DELIVERY TRANSIT DETAIL', element: DeliveryTransitDetail },
  { path: '/dashboard-ops-lead/delivery-complete/:projectId', name: 'DELIVERY COMPLETE', element: DeliveryComplete },
  { path: '/dashboard-ops-lead/delivery-complete/:projectId/detail/:orderReqId', name: 'DELIVERY COMPLETE DETAIL', element: DeliveryCompleteDetail },
  { path: '/dashboard-ops-lead/master-location/:projectId', name: 'MASTER LOCAITON', element: MasterLocation },

  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
]

export default routes
