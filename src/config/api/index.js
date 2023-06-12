const BASE_URL = process.env.REACT_APP_API_URL_DEV

console.log("BASE_URL", BASE_URL)

//List API
export const API_AUTH_LOGIN = BASE_URL + "auth/authWeb"
export const API_GET_DATA_LOGIN = BASE_URL + "auth/me"
export const API_GET_PROJECT = BASE_URL + "mproject/getall"
export const API_ADD_PROJECT = BASE_URL + "mproject"
export const API_SET_INACTIVE= BASE_URL + "mproject/setInActivate"
export const API_SET_ACTIVE = BASE_URL + "mproject/setActivate"
export const API_SET_PUBLISH = BASE_URL + "mproject/setPublished"
export const API_GET_SERVICE_CHARGE_ADMIN = BASE_URL + "serviceCharge/getAllAdminOnly"
