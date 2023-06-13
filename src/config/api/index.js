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
export const API_SET_INACTIVE_TRANSPORT = BASE_URL + "logmanagement/deliveryModeSetStatusIsInActive"











