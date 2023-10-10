const BASE_URL = process.env.REACT_APP_API_URL_DEV

//List API

// LOGIN
export const API_AUTH_LOGIN = BASE_URL + "auth/authWeb"
export const API_GET_DATA_LOGIN = BASE_URL + "auth/me"

// DASHBOARD
// Project
export const API_GET_DASHBOARD = BASE_URL + "userrole/setDashboardBaseRole"
export const API_GET_PROJECT = BASE_URL + "mproject/getall"
export const API_ADD_PROJECT = BASE_URL + "mproject"
export const API_SET_INACTIVE_PROJECT = BASE_URL + "mproject/setInActivate"
export const API_SET_ACTIVE_PROJECT = BASE_URL + "mproject/setActivate"
export const API_SET_PUBLISH_PROJECT = BASE_URL + "mproject/setPublished"
export const API_GET_PROJECT_BY_USERID = BASE_URL + "logmanagement/projectGetAllBasedOnUser"
export const API_GET_ACTIVITY_SUMMARY_WH_PROJECT = BASE_URL + "logmanagement/getActivitySummaryWHProject"
export const API_GET_ACTIVITY_SUMMARY_WH_PROJECT_PICKUP = BASE_URL + "logmanagement/getActivityPickupSummaryWHProject"
export const API_GET_MASTER_LOGISTIC_PROCESS_ACTIVE = BASE_URL + "masterdata/getMasterLogisticProcessActiveOnly"
// Service Charge
export const API_GET_SC_ADMIN = BASE_URL + "serviceCharge/getAllAdminOnly"
export const API_ADD_SC = BASE_URL + "serviceCharge"
export const API_SET_INACTIVE_SC = BASE_URL + "serviceCharge/setStatusIsInactive"
export const API_SET_ACTIVE_SC = BASE_URL + "servicecharge/setStatusIsActive"
export const API_GET_ACTIVE_SC = BASE_URL + "servicecharge/getAllActiveOnly"
// Delivery Mode
export const API_GET_DEL_ADMIN = BASE_URL + "logmanagement/deliveryModeGetAllAdminOnly"
export const API_GET_ACTIVE_DEL = BASE_URL + "logmanagement/deliveryModeGetAllActiveOnly"
export const API_GET_DEL_BASE_ROUTE_TYPE = BASE_URL + "logmanagement/deliveryModeBasedOnRouteType"
export const API_SET_ACTIVE_DEL = BASE_URL + "logmanagement/deliveryModeSetStatusIsActive"
export const API_SET_INACTIVE_DEL = BASE_URL + "logmanagement/deliveryModeSetStatusIsInActive"
// Transport Mode
export const API_GET_TRANSPORT_ADMIN = BASE_URL + "logmanagement/transportModeGetAllAdminOnly"
export const API_GET_ACTIVE_TRANSPORT = BASE_URL + "logmanagement/transportModeGetAllActiveOnly"
export const API_SET_ACTIVE_TRANSPORT = BASE_URL + "logmanagement/transportModeSetStatusIsActive"
export const API_SET_INACTIVE_TRANSPORT = BASE_URL + "logmanagement/transportModeSetStatusIsInActive"
// Transport Type
export const API_GET_TRANSPORT_TYPE_ACTIVE_ONLY = BASE_URL + "logmanagement/transportTypeGetAllAdminOnly"
export const API_SET_ACTIVE_TRANSPORT_TYPE = BASE_URL + "logmanagement/transportTypeSetStatusIsActive"
export const API_SET_INACTIVE_TRANSPORT_TYPE = BASE_URL + "logmanagement/transportTypeSetStatusIsInActive"
export const API_ADD_TRANSPORT_TYPE = BASE_URL + "logmanagement/transporttypeadd"
//UOM
export const API_GET_UOM_ADMIN = BASE_URL + "uom/uomGetAllAdminOnly"
export const API_GET_ACTIVE_UOM = BASE_URL + "uom/uomGetAllActiveOnly"
export const API_SET_ACTIVE_UOM = BASE_URL + "uom/setStatusIsActive"
export const API_SET_INACTIVE_UOM = BASE_URL + "uom/setStatusIsInActive"
export const API_ADD_UOM = BASE_URL + "uom"
//WAREHOUSE
export const API_GET_WAREHOUSE_ADMIN = BASE_URL + "warehouse/warehouseGetAllBasedOnProjectAdmin"
export const API_GET_WAREHOUSE_ACTIVE = BASE_URL + "warehouse/warehouseTypeGetAllActiveOnly "
export const API_GET_WAREHOUSE_PROJECT_OPERATION = BASE_URL + "warehouse/warehouseGetAllBasedOnProjectOperation"
export const API_GET_WAREHOUSE_TYPE_GET_ALL = BASE_URL + "warehouse/warehouseTypeGetAll"
export const API_GET_WAREHOUSE_PROVINCE_ACTIVE = BASE_URL + "masterdata/provinceGetAllActiveOnly"
export const API_ADD_WAREHOUSE = BASE_URL + "warehouse"
export const API_SET_INACTIVE_WAREHOUSE = BASE_URL + "warehouse/setStatusIsInActive"
export const API_SET_ACTIVE_WAREHOUSE = BASE_URL + "warehouse/setStatusIsActive"
export const API_SET_PUBLISH_WAREHOUSE = BASE_URL + "warehouse/setActivate"
//PROJECT SERVICE CHARGE
export const API_GET_PROJECT_SERVICE_CHARGE_ADMIN = BASE_URL + "serviceCharge/projectServiceChargeGetAllAdminOnly"
export const API_GET_PROJECT_SERVICE_CHARGE_ACTIVE = BASE_URL + "servicecharge/projectServiceChargeGetAllActiveOnly"
export const API_GET_PROJECT_SERVICE_CHARGE_NOT_REGISTERED = BASE_URL + "servicecharge/projectServiceChargeNotRegisteredYet"
export const API_ADD_PROJECT_SERVICE_CHARGE = BASE_URL + "servicecharge/projectServiceChargeAdd"
export const API_SET_PROJECT_SERVICE_CHARGE_ACTIVE = BASE_URL + "serviceCharge/projectServiceChargeSetStatusIsActive"
export const API_SET_PROJECT_SERVICE_CHARGE_INACTIVE = BASE_URL + "serviceCharge/projectServiceChargeSetStatusIsInActive"
// CURRENCY
export const API_GET_CURRENCY_ACTIVE = BASE_URL + "masterdata/currencyGetAllActiveOnly"
// SKU
export const API_GET_SKU_ADMIN = BASE_URL + "logmanagement/masterMaterialGetAllAdminOnly"
export const API_GET_SKU_ACTIVE = BASE_URL + "logmanagement/masterMaterialGetAllActiveOnly"
export const API_ADD_SKU = BASE_URL + "logmanagement/masterMaterialAdd"
export const API_SET_SKU_ACTIVE = BASE_URL + "logmanagement/masterMaterialSetStatusIsActive"
export const API_SET_SKU_INACTIVE = BASE_URL + "logmanagement/masterMaterialSetStatusIsInActive"
export const API_GET_TEMPLATE_SKU = BASE_URL + "masterdata/getMassUploadSKUTemplate"
export const API_UPLOAD_SKU = BASE_URL + "logmanagement/masterMaterialBulkUpload"
export const API_GET_BULK_UPLOAD_SKU = BASE_URL + "logmanagement/getMaterialBulkUploadResult"
export const API_EXPORT_EXCEL_SKU = BASE_URL + "logmanagement/getMasterSKUExportToExcel"
export const API_EXPORT_EXCEL_SKU_ERR = BASE_URL + "logmanagement/getMasterSKUBulkUploadErrList"
//CUSTOMER
export const API_GET_CUSTOMER_ADMIN = BASE_URL + "customer/getAllAdminOnly";
export const API_GET_CUSTOMER_ACTIVE = BASE_URL + "customer/getAllActiveOnly";
export const API_GET_CUSTOMER_DETAIL = BASE_URL + "customer/getCustomerDetail";
export const API_ADD_CUSTOMER = BASE_URL + "customer";
export const API_SET_CUSTOMER_INACTIVE = BASE_URL + "customer/setStatusInActivate";
export const API_SET_CUSTOMER_ACTIVE = BASE_URL + "customer/setStatusIsActivate";
export const API_SET_CUSTOMER_PUBLISH = BASE_URL + "customer/setActivate";
//PROJECT MEMBER
export const API_GET_PROJECT_MEMBER_BASE_ON_PROJECT = BASE_URL + "userrole/ProjectUserMembershipGetAllBaseOnProject"
export const API_GET_USER_NOT_REGISTER_BASE_ON_ROLE_AND_PROJECT = BASE_URL + "userRole/getUserNotRegisteredYetBasedOnRoleAndProject";
export const API_ADD_PROJECT_MEMBER = BASE_URL + "userrole/projectUserMembershipAdd";
export const API_GET_ROLES_WH_GROUP = BASE_URL + "userrole/getRolesWHGroup";
export const API_SET_PROJECT_MEMBER_ACTIVE = BASE_URL + "userrole/projectUserMembershipSetStatusIsActive";
export const API_SET_PROJECT_MEMBER_INACTIVE = BASE_URL + "userrole/projectUserMembershipSetStatusIsInActive";
export const API_GET_WAREHOUSE_MEMBERSHIP = BASE_URL + "logmanagement/getUserWHProject"
export const API_ADD_WH_PROJECT_MEMBERSHIP = BASE_URL + "logmanagement/addUserWHProjectMembership"
export const API_DELETE_WH_PROJECT_MEMBERSHIP = BASE_URL + "logmanagement/deleteUserWHProjectMembership"
//USER ACCOUNT
export const API_GET_USER_ACCOUNT_ADMIN = BASE_URL + "userrole/userAccountGetAllAdminOnly";
export const API_UPDATE_USER_ACCOUNT = BASE_URL + "userrole/userAccountUpdate";
export const API_GET_DETAIL_USER_ACCOUNT = BASE_URL + "userrole/userAccountGetDetail";
export const API_ADD_USER_ACCOUNT = BASE_URL + "userrole/userAccountAdd";
export const API_GET_ROLES_BY_ROLE_ID = BASE_URL + "userrole/getRolesAddAccount";
export const API_GET_CHECK_USER_LOGIN_EXIST = BASE_URL + "userrole/userLoginCheckIsExist";
export const API_UPDATE_USER_PASSWORD = BASE_URL + "userrole/userAccountChangePassword";
export const API_GET_USER_ACTIVE_PHOTO = BASE_URL + "userrole/userAccountGetActivePhotoProfile";
export const API_GET_USER_PHOTO = BASE_URL + "userrole/userAccountGetPhotoProfiles"
export const API_DELETE_USER_PHOTO = BASE_URL + "userrole/userAccountPhotoProfileDelete"
export const API_SET_USER_PHOTO_ACTIVE = BASE_URL + "userrole/userAccountSetIsActivePhotoProfile"
export const API_SET_USER_PHOTO_INACTIVE = BASE_URL + "userrole/userAccountSetIsInActivePhotoProfile"
export const API_ADD_PHOTO_USER = BASE_URL + "userrole/userAddPhotoProfile"
//ORDER REQUEST
export const API_GET_ORDER_REQUEST = BASE_URL + "logmanagement/getOrderRequestWHProject"
export const API_CANCEL_ORDER_REQUEST = BASE_URL + "logmanagement/cancelOrderRequestWHProject"
export const API_DELETE_ORDER_REQUEST = BASE_URL + "logmanagement/deleteOrderRequestWHProject"
export const API_GET_TYPE_DELIVERY_PROCESS = BASE_URL + "masterdata/deliveryProcessTypeGetAll"
export const API_GET_TYPE_ROUTE = BASE_URL + "masterdata/routeTypeGetAll"
export const API_GET_ORIGIN_POINT = BASE_URL + "masterdata/getOriginPointList"
export const API_GET_DESTINATION_KEY_WH_PROJECT = BASE_URL + "masterdata/getDestinationPointList"
export const API_ADD_ORDER_REQUEST = BASE_URL + "logmanagement/addOrderRequestWHProject"
export const API_EXPORT_EXCEL_ORDER_REQUEST = BASE_URL + "logmanagement/getOrderRequestWHProjectExportToExcel"
export const API_GET_DESTINATION_ORDER_REQUEST = BASE_URL + "logmanagement/getDestinationKeyWHProject"
// ORDER REQUEST BULK
export const API_GET_ORDER_REQUEST_BULK = BASE_URL + "logmanagement/getOrderRequestDraftWHProject"
export const API_GET_ORDER_REQUEST_BULK_TEMPLATE = BASE_URL + "logmanagement/getBulkOrderRequestDeliveryTemplate"
export const API_GET_DELIVERY_PROCESS_TYPE_PACKAGE_PROCESS = BASE_URL + "masterData/deliveryProcessTypeBasedOnPackageProcess"
export const API_GET_ROUTE_TYPE_PACKAGE_PROCESS = BASE_URL + "masterData/routeTypeGetAll"
//PICK AND PACK
export const API_GET_PICK_AND_PACK_PENDING = BASE_URL + "logmanagement/getPickandPackPendingWHProject";
export const API_START_PICK_AND_PACK = BASE_URL + "logmanagement/pickandPackStart";
export const API_RESET_ORDER_REQUEST = BASE_URL + "logmanagement/orderRequestItemReset"
export const API_GET_ORDER_REQUEST_ITEM = BASE_URL + "logmanagement/getOrderRequestItemList"
export const API_GET_TEMPLATE_ORDER_REQUEST_ITEM = BASE_URL + "masterdata/getMassUploadTemplateOrderReqItemBulkUpload"
export const API_UPLOAD_CUST_ORDER_REQ_TEIM = BASE_URL + "logmanagement/custItemRequestUpload"
export const API_GET_STOCK_BOX_INVENTORY = BASE_URL + "inventory/getAvailableStockBoxInventory"
export const API_ADD_BOX_REQUEST = BASE_URL + "inventory/boxStockBooking"
//PICK AND PACK PROGRESS
export const API_GET_PICK_AND_PACK_PROGRESS = BASE_URL + "logmanagement/getPickandPackOnProgressWHProject"
export const API_GET_ORDER_REQUEST_DETAIL = BASE_URL + "logmanagement/getOrderRequestDetail"
export const API_GET_ORDER_REQUEST_SERVICE_CHARGE = BASE_URL + "servicecharge/orderRequestGetServiceChargeList"
export const API_GET_ORDER_REQUEST_ADDED_SERVICE_CHARGE = BASE_URL + "servicecharge/orderRequestGetAddedServiceChargeList"
export const API_GET_DELIVERY_MODE_BASED_TRANSPORT_MODE = BASE_URL + "logManagement/deliveryModeBasedOnTransportModeGetAll"
export const API_ADD_ORDER_REQUEST_SERVICE_CHARGE = BASE_URL + "servicecharge/orderRequestServiceChargeAdd"
export const API_COMPLETE_PICK_AND_PACK = BASE_URL + "logmanagement/pickandPackComplete"
export const API_DELETE_ADDITIONAL_SERVICE_PICK_AND_PACK = BASE_URL + "servicecharge/orderRequestServiceChargeDelete";
export const API_GET_RESERVED_STATUS_COMPLETE = BASE_URL + "logmanagement/orderReqCheckItemReservedHasCompleted"
export const API_EXPORT_EXCEL_ORDER_REQUEST_ITEM = BASE_URL + "logmanagement/getOrderRequestItemListExportToExcel"
export const API_GET_ORDER_REQUEST_ITEM_RESERVED = BASE_URL + "inventory/getOutboundTransactionBasedOnOrderRequest"
export const API_EXPORT_EXCEL_ORDER_REQUEST_ITEM_RESERVED = BASE_URL + "inventory/getOutboundTransactionBasedOnOrderRequestExportToExcel"
// WAITING DISPATCH
export const API_GET_DELIVERY_PENDING = BASE_URL + "logmanagement/getDeliveryPendingWHProject"
export const API_ADD_TRANSPORT_ARRAGEMENT = BASE_URL + "transportarrangement/transportArrangementAdd"
export const API_GET_TRANSPORT_ARRAGEMENT_ORDER_REQ = BASE_URL + "transportarrangement/getTransportArrangementBasedOnOrderRequest"
export const API_COMPLETE_TRANSPORT_ARRAGEMENT = BASE_URL + "transportarrangement/transportArrangementConfirmed"
//WAITING DISPATCH -> TRANSPORT ARRAGEMENT
export const API_GET_ORDER_REQUEST_TRANSPORT_ARRAGMENET = BASE_URL + "transportarrangement/getOrderRequestBasedOnTransportArrangement"
export const API_GET_TRANSPORT_ARRAGEMENT_TYPE_LIST = BASE_URL + "transportarrangement/getTransportTypeList"
export const API_GET_DISPATCHER_BASE_TRANSPORT_ARRAGEMENT = BASE_URL + "transportarrangement/getDispatcherBasedOnTransportArrangement"
export const API_ADD_TRANSPORT_ARRAGEMENT_TYPE = BASE_URL + "transportarrangement/transportArrangementTransportTypeAdd"
export const API_DELETE_TRANSPORT_ARRAGEMENT_TYPE = BASE_URL + "transportarrangement/transportArrangementTransportTypeDelete"
export const API_GET_TRANSPORT_ARRAGEMENT_TYPE = BASE_URL + "transportarrangement/getTransportTypeArranged"
export const API_GET_DISPATCHER_BASE_TRANSPORT_ARRAGEMENT_REASIGN = BASE_URL + "transportarrangement/getDispatcherReassignmentBasedOnTransportArrangement"
//WAITING DISPATCH -> TRANSPORT ARRAGEMENT -> SERVICE CHARGE
export const API_GET_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE = BASE_URL + "servicecharge/transportArrangementGetServiceChargeList"
export const API_ADD_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE = BASE_URL + "servicecharge/transportArrangementServiceChargeAdd"
export const API_GET_TRANSPORT_ARRAGEMENT_ADD_SERVICE_CHARGE_LIST = BASE_URL + "servicecharge/transportArrangementGetAddedServiceChargeList"
export const API_DELETE_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE = BASE_URL + "servicecharge/transportArrangementServiceChargeDelete"
export const API_TRANSPORT_ARRANGEMENT_COMPELETE = BASE_URL + "transportarrangement/transportArrangementConfirmed"
// DELIVERY TRANSIT
export const API_GET_DELIVERY_TRANSIT = BASE_URL + "logmanagement/getDeliveryInTransitWHProject"
export const API_GET_TRANSPORT_ARRAGEMENT_DELIVERY = BASE_URL + "transportarrangement/getTransportArrangementAndShareLatestLocationBasedOnOrderRequest"
// DELIVERY ONSITE
export const API_GET_DELIVERY_ONSITE = BASE_URL + "logmanagement/getDeliveryOnSiteWHProject"
export const API_CONFIRM_DELIVERY_ONSITE = BASE_URL + "logmanagement/orderRequestReturnWHConfirm"
export const API_GET_EVIDENCE_DELIVERY_ONSITE = BASE_URL + "logmanagement/custOrderRequestReturnWHGetAttachmentEvidences"
export const API_UPLOAD_EVIDENCE_DELIVERY_ONSITE = BASE_URL + "logmanagement/custOrderRequestReturnWHEvidenceAdd"
export const API_DELETE_EVIDENCE_DELIVERY_ONSITE = BASE_URL + "logmanagement/custOrderRequestReturnWHEvidenceDelete"
// DELIVERY COMPLETE
export const API_GET_DELIVERY_COMPLETE = BASE_URL + "logmanagement/getDeliveryCompletedWHProject"
export const API_EXPORT_DELIVERY_COMPLETE = BASE_URL + "logmanagement/getDeliveryCompletedWHProjectExportToExcel"
// MASTER LOCATION
export const API_GET_MASTER_LOCATION = BASE_URL + "masterdata/getMasterLocationsBasedOnProject"
export const API_GET_ROUTE_CATEGORY_ACTIVE = BASE_URL + "masterdata/getRouteCategoryActiveOnly"
export const API_ADD_MASTER_LOCATION = BASE_URL + "masterdata/addMasterLocation"
export const API_DELETE_MASTER_LOCATION = BASE_URL + "masterdata/deleteMasterLocation"
export const API_DELETE_ORDER_REQUEST_WH_PROJECT = BASE_URL + "logmanagement/deleteOrderRequestWHProject"
// SUB DISTRICT
export const API_GET_SUB_DISTRICT_ACTIVE = BASE_URL + "masterdata/getSubDistrictAllAdminOnly"
export const API_SET_SUB_DISTRICT_ACTIVE = BASE_URL + "masterdata/subDistrictSetActiveStatusAsActive"
export const API_SET_SUB_DISTRICT_INACTIVE = BASE_URL + "masterdata/subDistrictSetActiveStatusAsInActive"
export const API_ADD_SUB_DISTRICT = BASE_URL + "masterdata/addMasterSubDistrict"
export const API_UPDATE_SUB_DISTRICT = BASE_URL + "masterdata/updateMasterSubDistrict"
export const API_GET_SUB_DISTRICT_BASE_ON_PROVINCE = BASE_URL + "masterdata/getSubDistrictBasedOnProvince"
export const API_EXPORT_EXCEL_SUB_DISTRICT = BASE_URL + "masterdata/getSubDistrictExportToExcel"
// HO DOCUMENT
export const API_GET_HO_DOCUMENT = BASE_URL + "transportarrangement/getTransportArrangementHOEvidence"
// MASTER WAREHOUSE TYPE
export const API_GET_MASTER_WAREHOUSE_TYPE = BASE_URL + "warehouse/warehouseTypeGetAllAdminOnly"
export const API_SET_MASTER_WAREHOUSE_TYPE_ACTIVE = BASE_URL + "warehouse/warehouseTypeSetStatusIsActive"
export const API_SET_MASTER_WAREHOUSE_TYPE_INACTIVE = BASE_URL + "warehouse/warehouseTypeSetStatusIsInActive"
export const API_ADD_MASTER_WAREHOUSE_TYPE = BASE_URL + "warehouse/warehouseTypeAdd"
export const API_UPDATE_MASTER_WAREHOUSE_TYPE = BASE_URL + "warehouse/warehouseTypeUpdate"
export const API_GET_DETAIL_MASTER_WAREHOUSE_TYPE = BASE_URL + "warehouse/warehouseTypeGetDetail"
// PACKAGE TYPE
export const API_GET_PACKAGE_TYPE = BASE_URL + "logmanagement/getPackageAllActiveOnly"
// MANAGE INVENTORY
export const API_GET_INVENTORY_ITEM = BASE_URL + "inventory/getInventoryItemBaseSummary"
export const API_GET_INVENTORY_BOX = BASE_URL + "inventory/getInventoryBoxSummary"
export const API_GET_INBOUND_FILE = BASE_URL + "inventory/getInboundFileUploadSummary"
export const API_GET_INBOUND_LOG_ERROR = BASE_URL + "inventory/inboundErrLogExportToExcel"
export const API_GET_INBOUND_LOG_SUCCESS = BASE_URL + "inventory/getInboundTransactionSuccess"
export const API_EXPORT_EXCEL_INBOUND_LOG_SUCCESS = BASE_URL + "inventory/inboundTransactionSuccessExportToExcel"
export const API_GET_TEMPLATE_UPLOAD_INBOUND = BASE_URL + "masterdata/getMassUploadInboundTemplate"
export const API_GET_TEMPLATE_UPLOAD_INBOUND_BOX = BASE_URL + "masterdata/getMassUploadInboundBoxTemplate"
export const API_UPLOAD_INVENTORY_ITEM = BASE_URL + "inventory/inboundItemFileUpload"
export const API_UPLOAD_INVENTORY_BOX = BASE_URL + "inventory/inboundBoxFileUpload"
export const API_GET_ORDER_REQUEST_ITEM_INVENTORY = BASE_URL + "logmanagement/getOrderRequestItemListWithInventory"
export const API_EXPORT_EXCEL_INBOUND_ITEM = BASE_URL + "inventory/getInventoryItemBaseSummaryExportToExcel";
export const API_EXPORT_EXCEL_INBOUND_BOX = BASE_URL + "inventory/getInventoryBoxSummaryExportToExcel";
export const API_EXPORT_EXCEL_OUTBOUND_SUCCESS_LOG = BASE_URL + "inventory/outboundTransactionSuccessExportToExcel";
export const API_GET_OUTBOUND_TRANSACTION_SUCCESS = BASE_URL + "inventory/getOutboundTransactionSuccess"
export const API_GET_INVENTORY_ITEM_DETAIL = BASE_URL + "inventory/getInventoryItemBaseWithDetailSummary"
export const API_GET_INVENTORY_BOX_DETAIL = BASE_URL + "inventory/getInventoryBoxWithDetailSummary"
export const API_EXPORT_EXCEL_INVENTORY_ITEM_DETAIL = BASE_URL + "inventory/getInventoryItemBaseWithDetailSummaryExportToExcel"
export const API_EXPORT_EXCEL_INVENTORY_BOX_DETAIL = BASE_URL + "inventory/getInventoryBoxWithDetailSummaryExportToExcel"
// HANDCARRY ARRAGMENET
export const API_ADD_EVIDENCE_CHECKLIST = BASE_URL + "transportarrangement/transportArrangementCreateEvidence"
export const API_GET_EVIDENCE_CHECKLIST = BASE_URL + "transportarrangement/getTransportArrangementEvidenceCheclist"
export const API_UPLOAD_EVIDENCE_CHECKLIST = BASE_URL + "transportassignment/transportAssignmentDeliveryEvidenceUpload"
export const API_DELETE_EVIDENCE_CHECKLIST = BASE_URL + "transportarrangement/transportArrangementTransportTypeDelete"
export const API_COMPLETE_EVIDENCE_CHECKLIST = BASE_URL + "transportassignment/actDeliveryCompleteWithoutAssignment"
// EVIDENCE CHECKLIST
export const API_GET_EVIDENCE_CHECKLIST_TYPE_LIST = BASE_URL + "masterdata/getEvidenceChecklist"
export const API_GET_EVIDENCE_CHECKLIST_TYPE = BASE_URL + "masterdata/getEvidenceChecklistType"
export const API_ADD_EVIDENCE_CHECKLIST_TYPE = BASE_URL + "masterdata/addEvidenceChecklist"
export const API_SET_ACTIVE_EVIDENCE_CHECKLIST_TYPE = BASE_URL + "masterdata/evidenceChecklistSetIsActive"
export const API_SET_INACTIVE_EVIDENCE_CHECKLIST_TYPE = BASE_URL + "masterdata/evidenceChecklistSetIsInActive"
// PROJECT EVIDENCE CHECKLIST
export const API_GET_EVIDENCE_CHECKLIST_PROJECT = BASE_URL + "masterdata/getProjectEvidenceChecklist"
export const API_GET_EVIDENCE_CHECKLIST_PROJECT_NOT_REGISTERED = BASE_URL + "masterdata/getProjectEvidenceChecklistNotRegisteredYet"
export const API_ADD_EVIDENCE_CHECKLIST_PROJECT = BASE_URL + "masterdata/addProjectEvidenceChecklist"
export const API_SET_ACTIVE_EVIDENCE_CHECKLIST_PROJECT = BASE_URL + "masterdata/projectEvidenceChecklistSetIsActive"
export const API_SET_INACTIVE_EVIDENCE_CHECKLIST_PROJECT = BASE_URL + "masterdata/projectEvidenceChecklistSetIsInActive"
//ORDER REQUEST PICKUP
export const API_GET_ORDER_REQUEST_PICKUP = BASE_URL + "logmanagement/getOrderRequestPickupWHProject"
export const API_CANCEL_ORDER_REQUEST_PICKUP = BASE_URL + "logmanagement/cancelOrderRequestWHProject"
export const API_DELETE_ORDER_REQUEST_PICKUP = BASE_URL + "logmanagement/deleteOrderRequestWHProject"
export const API_EXPORT_EXCEL_ORDER_REQUEST_PICKUP = BASE_URL + "logmanagement/getOrderRequestPickupWHProjectExportToExcel"
// PICKUP PREPARATION
export const API_GET_ORDER_REQUEST_PICKUP_PREPARATION = BASE_URL + "logmanagement/getOrderRequestPickupPreparationWHProject"
export const API_COMPLETE_PICKUP_PREPARATION = BASE_URL + "logmanagement/pickupPreparationComplete"
// MENU
export const API_GET_MENU = BASE_URL + "menu/getMenuBasedOnRole"
// ASSET TRUCK
export const API_GET_MASTER_VEHICLES_ALL = BASE_URL + "mvehicle/getMasterVehiclesAll"
export const API_GET_MASTER_VEHICLES_PLAT_CODE = BASE_URL + "mvehicle/getMasterPlateCodeVehicleActiveOnly"
export const API_GET_MASTER_VEHICLES_CATEGORY_ACTIVE_ONLY = BASE_URL + "mvehicle/getMasterOwnershipVehicleCategoryActiveOnly"
export const API_ADD_MASTER_VEHICLES = BASE_URL + "mvehicle/addMasterVehicle"
export const API_UPDATE_MASTER_VEHICLES = BASE_URL + "mvehicle/updateMasterVehicle"
export const API_EXPORT_EXCEL_MASTER_VEHICLES = BASE_URL + "mvehicle/getMasterVehiclesAllExportToExcel"
export const API_SET_ACTIVE_MASTER_VEHICLES = BASE_URL + "mvehicle/masterVehicleSetActiveStatus"
export const API_SET_INACTIVE_MASTER_VEHICLES = BASE_URL + "mvehicle/masterVehicleSetInActiveStatus"
export const API_GET_MASTER_VEHICLES_BRAND = BASE_URL + "masterdata/getMasterVehicleBrandActiveOnly"
export const API_GET_MASTER_VEHICLES_CATEGORY = BASE_URL + "masterdata/getMasterVehicleCategoryActiveOnly"
export const API_GET_MASTER_VEHICLES_DETAIL = BASE_URL + "mvehicle/getMasterVehiclesDetail"
// PLATE CODE
export const API_GET_MASTER_PLATE_CODE = BASE_URL + "masterdata/getMasterPlateCodeAll"
export const API_ADD_MASTER_PLATE_CODE = BASE_URL + "masterdata/masterPlateCodeAdd"
export const API_SET_ACTIVE_MASTER_PLATE_CODE = BASE_URL + "masterdata/masterPlateCodeSetActiveStatus"
export const API_SET_INACTIVE_MASTER_PLATE_CODE = BASE_URL + "masterdata/masterPlateCodeSetInActiveStatus"
// WAITING TRANSPORT ASSIGNMENT
export const API_GET_WAITING_TRANSPORT_ASSIGNMENT = BASE_URL + "logmanagement/getOrderRequestPickupWaitingAssignmentWHProject"
export const API_GET_DETAIL_TRANSPORT_ARRANGMENT = BASE_URL + "transportarrangement/getDetailTransportArrangement"
export const API_GET_TRANSPORT_ARRANGMENT_ORDER_REQUEST = BASE_URL + "transportarrangement/getOrderRequestNeedGroupWithoutAssignmentYet"
export const API_ADD_TRANSPORT_ARRAGEMENT_ORDER_REQUEST = BASE_URL + "transportarrangement/transportArrangementAddOrderRequest"
export const API_DELETE_TRANSPORT_ARRAGEMENT_ORDER_REQUEST = BASE_URL + "transportarrangement/transportArrangementDeleteOrderRequest"
export const API_CHANGE_MOVER = BASE_URL + "transportarrangement/transportArrangementChangeDispatcher"
// MRS
export const API_GET_MRS_ALL = BASE_URL + "mrs/mrsGetAllBasedOnProject";
export const API_ADD_MRS = BASE_URL + "mrs/mrsAdd";
export const API_SET_IN_USE_MRS = BASE_URL + "mrs/mrsSetInUse";
// WAITING TRANSPORT CONFRIM
export const API_GET_WAITING_TRANSPORT_COMPLETE = BASE_URL + "logmanagement/getOrderRequestPickupWaitingDispatcherConfirmWHProject";
// ONSITE PICKUP LIST
export const API_GET_ONSITE_PICKUPLIST = BASE_URL + "logmanagement/getOrderRequestOnsitePickupDispatcherConfirmedWHProject"
// HO COMPLETE
export const API_GET_HO_COMPLETE_LIST = BASE_URL + "logmanagement/getOrderRequestHOCompletePickupWHProject"
// BACK TO POOL
export const API_GET_BTP = BASE_URL + "logmanagement/getDeliveryBTPWHProject"
export const API_EXPORT_EXCEL_BTP = BASE_URL + "logmanagement/getDeliveryBTPWHProjectExportToExcel"
// PICKUP TRANSIT
export const API_GET_PICKUP_TRANSIT = BASE_URL + "logmanagement/getOrderRequestInTransitPickupDispatcherConfirmedWHProject"
export const API_EXPORT_EXCEL_PICKUP_TRANSIT = BASE_URL + "logmanagement/getOrderRequestInTransitPickupExportToExcel"
// FINAL CONFIRM
export const API_GET_FINAL_CONFIRM = BASE_URL + "transportArrangement/getFinalCostTransportDeliveryWaitingConfirmation"
export const API_GET_FINAL_CONFIRM_TRANSPORT_DELIVERY = BASE_URL + "transportArrangement/getTransportFinalCostDetail"
export const API_DELETE_FINAL_CONFIRM_COST_TRANSPORT = BASE_URL + "transportArrangement/transportArrangementDeleteFinalCostTransport";
export const API_DELETE_FINAL_CONFIRM_COST_TRANSPORT_FILE = BASE_URL + "transportArrangement/transportArrangementFinalCostTransportDeleteAttachment";
export const API_ADD_FINAL_CONFIRM_COST_TRANSPORT = BASE_URL + "transportArrangement/transportArrangementAddFinalCostTransport"
export const API_SUBMIT_FINAL_CONFIRM = BASE_URL + "transportArrangement/transportArrangementFinalCostConfirmed"
export const API_UPLOAD_FINAL_CONFIRM_COST_TRANSPORT_FILE = BASE_URL + "transportArrangement/transportArrangementFinalCostTransportAddAttachment"
export const API_GET_FINAL_CONFIRM_WH_COST = BASE_URL + "transportArrangement/transportArrangementGetWHCost"
// FINAL COMPLETE
export const API_GET_FINAL_COMPLETE = BASE_URL + "transportArrangement/getFinalCostTransportDeliveryConfirmed"
export const API_GET_FINAL_COMPLETE_ORDER_REQUEST = BASE_URL + "transportArrangement/getOrderRequestBasedOnTransportArrangement"
export const API_GET_FINAL_COMPLETE_COST_TRANSPORT = BASE_URL + "transportArrangement/getTransportFinalCostDetail"
export const API_GET_FINAL_COMPLETE_WH_COST = BASE_URL + "transportArrangement/transportArrangementGetWHCost"