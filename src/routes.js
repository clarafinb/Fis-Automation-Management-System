import React from 'react'
// import PickAndPackProgressDetail from './views/dashboard/operationLead/PickAndPackProgressDetail'

//SETING MANAGEMENT
const Profile = React.lazy(() => import('./views/account/Profile'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DashboardOpsLead = React.lazy(() => import('./views/dashboardOpsLead/Dashboard'))
const ServiceChargeList = React.lazy(() => import('./views/dashboard/settingManagement/ServiceChargeList'))
const DeliveryMode = React.lazy(() => import('./views/dashboard/settingManagement/DeliveryMode'))
const TransportMode = React.lazy(() => import('./views/dashboard/settingManagement/TransportMode'))
const TransportType = React.lazy(() => import('./views/dashboard/settingManagement/TransportType'))
const Uom = React.lazy(() => import('./views/dashboard/settingManagement/Uom'))
const Warehouse = React.lazy(() => import('./views/dashboard/masterWarehouse/Warehouse'))
const ProjectServiceCharge = React.lazy(() => import('./views/dashboard/masterWarehouse/ProjectServiceCharge'))
const Sku = React.lazy(() => import('./views/dashboard/masterWarehouse/Sku'))
const Customer = React.lazy(() => import('./views/dashboard/settingManagement/Customer'))
const ProjectMember = React.lazy(() => import('./views/dashboard/masterWarehouse/ProjectMember'))
const AccountManagement = React.lazy(() => import('./views/dashboard/settingManagement/AccountManagement'))
const SubDistrictManagement = React.lazy(() => import('./views/dashboard/settingManagement/SubDistrictManagement'))
const WarehouseType = React.lazy(() => import('./views/dashboard/settingManagement/WarehouseType'))
const EvidenceChecklist = React.lazy(() => import('./views/dashboard/settingManagement/EvidenceChecklist'))
const EvidenceChecklistProject = React.lazy(() => import('./views/dashboard/masterWarehouse/EvidenceChecklistProject'))
const AssetTruck = React.lazy(() => import('./views/dashboard/settingManagement/AssetTruck'))
const Mrs = React.lazy(() => import('./views/dashboard/masterWarehouse/Mrs'))
//Operation Lead
const OrderRequest = React.lazy(() => import('./views/dashboardOpsLead/orderRequest/OrderRequest'))
const PickAndPack = React.lazy(() => import('./views/dashboardOpsLead/pickAndPackPending/PickAndPack'))
const PickAndPackDetail = React.lazy(() => import('./views/dashboardOpsLead/pickAndPackPending/PickAndPackDetail'))
const PickAndPackProgress = React.lazy(() => import('./views/dashboardOpsLead/pickAndPackProgress/PickAndPackProgress'))
const PickAndPackProgressDetail = React.lazy(() => import('./views/dashboardOpsLead/pickAndPackProgress/PickAndPackProgressDetail'))
const WaitingDispatch = React.lazy(() => import('./views/dashboardOpsLead/waitingDelivery/WaitingDispatch'))
const WaitingDispatchDetail = React.lazy(() => import('./views/dashboardOpsLead/waitingDelivery/WaitingDispatchDetail'))
const TransportArrangmentDetail = React.lazy(() => import('./views/dashboardOpsLead/TransportArrangmentDetail'))
const TransportHandCarryDetail = React.lazy(() => import('./views/dashboardOpsLead/TransportHandCarryDetail'))
const DeliveryTransit = React.lazy(() => import('./views/dashboardOpsLead/deliveryTransit/DeliveryTransit'))
const DeliveryTransitDetail = React.lazy(() => import('./views/dashboardOpsLead/deliveryTransit/DeliveryTransitDetail'))
const DeliveryComplete = React.lazy(() => import('./views/dashboardOpsLead/deliveryComplete/DeliveryComplete'))
const DeliveryCompleteDetail = React.lazy(() => import('./views/dashboardOpsLead/deliveryComplete/DeliveryCompleteDetail'))
const DeliveryOnSite = React.lazy(() => import('./views/dashboardOpsLead/deliveryOnSite/DeliveryOnSite'))
const DeliveryOnSiteDetail = React.lazy(() => import('./views/dashboardOpsLead/deliveryOnSite/DeliveryOnSiteDetail'))
const MasterLocation = React.lazy(() => import('./views/dashboardOpsLead/MasterLocation'))
const ManageInventory = React.lazy(() => import('./views/dashboardOpsLead/ManageInventory'))
const OrderRequestPickup = React.lazy(() => import('./views/dashboardOpsLead/orderRequestPickup/OrderRequestPickup'))
const PickupPreparation = React.lazy(() => import('./views/dashboardOpsLead/pickupPreparation/PickupPreparation'))
const PickupPreparationDetail = React.lazy(() => import('./views/dashboardOpsLead/pickupPreparation/PickupPreparationDetail'))
const WaitingTransportAssignment = React.lazy(() => import('./views/dashboardOpsLead/waitingTransportAssignment/WaitingTransportAssignment'))
const WaitingTransportAssignmentDetail = React.lazy(() => import('./views/dashboardOpsLead/waitingTransportAssignment/WaitingTransportAssignmentDetail'))
const WaitingTransportConfirm = React.lazy(() => import('./views/dashboardOpsLead/waitingTransportConfirm/WaitingTransportConfirm'))
const WaitingTransportConfirmDetail = React.lazy(() => import('./views/dashboardOpsLead/waitingTransportConfirm/WaitingTransportConfirmDetail'))
const PickupOnsite = React.lazy(() => import('./views/dashboardOpsLead/pickupOnsite/PickupOnsite'))
// DASHBOARD WH TEAM
const DashboardWhTeam = React.lazy(() => import('./views/dashboardWhTeam/Dashboard'))
// TESTING
const Test = React.lazy(() => import('./views/pages/test/Test'))


const routes = [
  // { path: '/', exact: true, name: 'HOME' },
  { path: '/test', name: 'TEST', element: Test },
  { path: '/profile', name: 'PROFILE', element: Profile },
  { path: '/dashboard', name: 'DASHBOARD', element: Dashboard },
  { path: '/dashboard-ops-lead', name: 'DASHBOARD', element: DashboardOpsLead },
  { path: '/dashboard/warehouse/:id', name: 'WAREHOUSE', element: Warehouse },
  { path: '/dashboard/setting-management/service-charge', name: 'SERVICE CHARGE LIST', element: ServiceChargeList },
  { path: '/setting-management/evidence-checklist', name: 'EVIDENCE CHECKLIST', element: EvidenceChecklist },
  { path: '/setting-management/asset-truck', name: 'ASSET TRUCK', element: AssetTruck },
  { path: '/setting-project/evidence-checklist-project/:id', name: 'EVIDENCE CHECKLIST', element: EvidenceChecklistProject },
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
  { path: '/dashboard/sku/:id/:projectName', name: 'PROJECT MASTER SKU', element: Sku },
  { path: '/mrs/:id', name: 'MASTER MRS', element: Mrs },
  // ORDER REQUEST
  { path: '/order-request/:projectId/:whId', name: 'ORDER REQUEST', element: OrderRequest },
  // PICK AND PACK PENDING
  { path: '/pick-pack-pending/:projectId/:whId', name: 'PICK AND PACK PENDING', element: PickAndPack },
  { path: '/pick-pack-pending/:projectId/:whId/detail/:orderReqId', name: 'PICK AND PACK PENDING DETAIL', element: PickAndPackDetail },
  //PICK AND PACK PROGRESS
  { path: '/pick-pack-progress/:projectId/:whId', name: 'PICK AND PACK PROGRESS', element: PickAndPackProgress },
  { path: '/pick-pack-progress/:projectId/:whId/detail/:orderReqId', name: 'PICK AND PACK PROGRESS DETAIL', element: PickAndPackProgressDetail },
  // WAITING DISPATCH
  { path: '/waiting-dispatch/:projectId/:whId', name: 'WAITING DELIVERY', element: WaitingDispatch },
  { path: '/waiting-dispatch/:projectId/:whId/detail/:orderReqId', name: 'WAITING DELIVERY DETAIL', element: WaitingDispatchDetail },
  { path: '/waiting-dispatch/transport-arrangment/:transportArrangmentId/:transportModeId/:projectId/:orderReqId/:whId', name: 'TRANSPORT ARRANGMENT DETAIL', element: TransportArrangmentDetail },
  { path: '/waiting-dispatch/handcarry-arrangment/:transportArrangmentId/:transportModeId/:projectId/:orderReqId/:whId', name: 'TRANSPORT ARRANGMENT DETAIL', element: TransportHandCarryDetail },
  // DELIVERY TRANSIT
  { path: '/delivery-transit/:projectId/:whId', name: 'DELIVERY TRANSIT', element: DeliveryTransit },
  { path: '/delivery-transit/:projectId/:whId/detail/:orderReqId', name: 'DELIVERY TRANSIT DETAIL', element: DeliveryTransitDetail },
  // DELIVERY ONSITE
  { path: '/delivery-onsite/:projectId/:whId', name: 'DELIVERY ONSITE', element: DeliveryOnSite },
  { path: '/delivery-onsite/:projectId/:whId/detail/:orderReqId', name: 'DELIVERY ONSITE', element: DeliveryOnSiteDetail },
  // DELIVERY COMPLETE
  { path: '/delivery-complete/:projectId/:whId', name: 'DELIVERY COMPLETE', element: DeliveryComplete },
  { path: '/delivery-complete/:projectId/:whId/detail/:orderReqId', name: 'DELIVERY COMPLETE DETAIL', element: DeliveryCompleteDetail },
  // MASTER LOCATION
  { path: '/master-location/:projectId/:whId', name: 'MASTER LOCAITON', element: MasterLocation },
  // MANAGE INVENTORY
  { path: '/manage-inventory/:whId/:whCode/:whName', name: 'MANAGE INVENTORY', element: ManageInventory },
  // ORDER REQUEST PICKUP
  { path: '/order-request-pickup/:projectId/:whId', name: 'ORDER REQUEST PICKUP', element: OrderRequestPickup },
  // PICKUP PREPARATION
  { path: '/pickup-preparation/:projectId/:whId', name: 'PICKUP PREPARATION', element: PickupPreparation },
  { path: '/pickup-preparation/:projectId/:whId/detail/:orderReqId', name: 'PICKUP PREPARATION DETAIL', element: PickupPreparationDetail },
  // DASHBOARD WH TEAM
  { path: '/dashboard-wh', name: 'DASHBOARD', element: DashboardWhTeam },
  // WAITING TRANSPORT ASSIGNMENT
  { path: '/waiting-transport-assignment/:projectId/:whId', name: 'WAITING TRANSPORT ASSIGNMENT', element: WaitingTransportAssignment },
  { path: '/waiting-transport-assignment/:projectId/:whId/detail/:orderReqId', name: 'WAITING TRANSPORT ASSIGNMENT DETAIL', element: WaitingTransportAssignmentDetail },
  { path: '/waiting-transport-assignment/transport-arrangment/:transportArrangmentId/:transportModeId/:projectId/:orderReqId/:whId', name: 'TRANSPORT ARRANGMENT DETAIL', element: TransportArrangmentDetail },
  { path: '/waiting-transport-assignment/handcarry-arrangment/:transportArrangmentId/:transportModeId/:projectId/:orderReqId/:whId', name: 'TRANSPORT ARRANGMENT DETAIL', element: TransportHandCarryDetail },
  // ORDER REQUEST
  { path: '/waiting-transport-confirm/:projectId/:whId', name: 'WAITING TRANSPORT COMPLETE', element: WaitingTransportConfirm },
  { path: '/waiting-transport-confirm/:projectId/:whId/detail/:orderReqId', name: 'WAITING TRANSPORT COMPLETE DETAIL', element: WaitingDispatchDetail },
  { path: '/waiting-transport-confirm/transport-arrangment/:transportArrangmentId/:transportModeId/:projectId/:orderReqId/:whId', name: 'TRANSPORT ARRANGMENT DETAIL', element: TransportArrangmentDetail },
  { path: '/waiting-transport-confirm/handcarry-arrangment/:transportArrangmentId/:transportModeId/:projectId/:orderReqId/:whId', name: 'TRANSPORT ARRANGMENT DETAIL', element: TransportHandCarryDetail },
  // PICKUP ONSITE
  { path: '/pickup-onsite/:projectId/:whId', name: 'ONSITE PICKUP LSIT', element: PickupOnsite },
  // HO COMPLETE
  
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
]

export default routes
