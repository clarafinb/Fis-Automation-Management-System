const BASE_URL = process.env.REACT_APP_API_URL_DEV

console.log("BASE_URL", BASE_URL)

//List API

// LOGIN
export const API_AUTH_LOGIN = BASE_URL + "auth/authWeb"
export const API_GET_DATA_LOGIN = BASE_URL + "auth/me"

// DASHBOARD
// Project
export const API_GET_PROJECT = BASE_URL + "mproject/getall"
export const API_ADD_PROJECT = BASE_URL + "mproject"
export const API_SET_INACTIVE_PROJECT = BASE_URL + "mproject/setInActivate"
export const API_SET_ACTIVE_PROJECT = BASE_URL + "mproject/setActivate"
export const API_SET_PUBLISH_PROJECT = BASE_URL + "mproject/setPublished"
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
export const API_SET_CUSTOMER_PUBLISH = BASE_URL + "customer/setActivate"