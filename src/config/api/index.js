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
// Service Charge
export const API_GET_SC_ADMIN = BASE_URL + "serviceCharge/getAllAdminOnly"
export const API_ADD_SC = BASE_URL + "serviceCharge"
export const API_SET_INACTIVE_SC = BASE_URL + "serviceCharge/setStatusIsInactive"
export const API_SET_ACTIVE_SC = BASE_URL + "servicecharge/setStatusIsActive"
export const API_GET_ACTIVE_SC = BASE_URL + "servicecharge/getAllActiveOnly"
// Delivery Mode
export const API_GET_DEL_ADMIN = BASE_URL + "logmanagement/deliveryModeGetAllAdminOnly"
export const API_GET_ACTIVE_DEL = BASE_URL + "logmanagement/deliveryModeGetAllActiveOnly"
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
export const API_GET_WAREHOUSE_PROJECT_OPERATION = BASE_URL + "warehouse/warehouseGetAllBasedOnProjectOperation"
export const API_GET_WAREHOUSE_TYPE_GET_ALL = BASE_URL + "warehouse/warehouseTypeGetAll"
export const API_GET_WAREHOUSE_PROVINCE_ACTIVE = BASE_URL + "masterdata/provinceGetAllActiveOnly"
export const API_ADD_WAREHOUSE = BASE_URL + "warehouse"
export const API_SET_INACTIVE_WAREHOUSE = BASE_URL + "warehouse/setStatusIsInActive"
export const API_SET_ACTIVE_WAREHOUSE = BASE_URL + "mproject/setActivate"
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
//PICK AND PACK
export const API_GET_PICK_AND_PACK_PENDING = BASE_URL + "logmanagement/getPickandPackPendingWHProject";
export const API_START_PICK_AND_PACK = BASE_URL + "logmanagement/pickandPackStart";
export const API_RESET_ORDER_REQUEST = BASE_URL + "logmanagement/orderRequestItemReset"
export const API_GET_ORDER_REQUEST_ITEM = BASE_URL + "logmanagement/getOrderRequestItemList"
export const API_GET_TEMPLATE_ORDER_REQUEST_ITEM = BASE_URL + "masterdata/getMassUploadTemplateOrderReqItemBulkUpload"
export const API_UPLOAD_CUST_ORDER_REQ_TEIM = BASE_URL + "logmanagement/custItemRequestUpload"
//PICK AND PACK PROGRESS
export const API_GET_PICK_AND_PACK_PROGRESS = BASE_URL + "logmanagement/getPickandPackOnProgressWHProject"
export const API_GET_ORDER_REQUEST_DETAIL = BASE_URL + "logmanagement/getOrderRequestDetail"
export const API_GET_ORDER_REQUEST_SERVICE_CHARGE = BASE_URL + "servicecharge/orderRequestGetServiceChargeList"
export const API_GET_ORDER_REQUEST_ADDED_SERVICE_CHARGE = BASE_URL + "servicecharge/orderRequestGetAddedServiceChargeList"
export const API_GET_DELIVERY_MODE_BASED_TRANSPORT_MODE = BASE_URL + "logManagement/deliveryModeBasedOnTransportModeGetAll"
export const API_ADD_ORDER_REQUEST_SERVICE_CHARGE = BASE_URL + "servicecharge/orderRequestServiceChargeAdd"
export const API_COMPLETE_PICK_AND_PACK = BASE_URL + "logmanagement/pickandPackComplete"
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
//WAITING DISPATCH -> TRANSPORT ARRAGEMENT -> SERVICE CHARGE
export const API_GET_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE = BASE_URL + "servicecharge/transportArrangementGetServiceChargeList"
export const API_ADD_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE = BASE_URL + "servicecharge/transportArrangementServiceChargeAdd"
export const API_GET_TRANSPORT_ARRAGEMENT_ADD_SERVICE_CHARGE_LIST = BASE_URL + "servicecharge/transportArrangementGetAddedServiceChargeList"
export const API_DELETE_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE = BASE_URL + "servicecharge/transportArrangementServiceChargeDelete"
export const API_TRANSPORT_ARRANGEMENT_COMPELETE = BASE_URL + "transportarrangement/transportArrangementConfirmed"