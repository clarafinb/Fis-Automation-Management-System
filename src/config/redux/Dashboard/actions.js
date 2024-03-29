import * as actionType from "./actionType"
import * as actionCrud from "../Global/actionCrud"
import {
  API_GET_PROJECT,
  API_ADD_PROJECT,
  API_SET_INACTIVE_PROJECT,
  API_SET_ACTIVE_PROJECT,
  API_SET_PUBLISH_PROJECT,
  API_GET_SC_ADMIN,
  API_ADD_SC,
  API_SET_INACTIVE_SC,
  API_SET_ACTIVE_SC,
  API_GET_DEL_ADMIN,
  API_SET_ACTIVE_DEL,
  API_SET_INACTIVE_DEL,
  API_GET_TRANSPORT_ADMIN,
  API_GET_ACTIVE_TRANSPORT,
  API_SET_ACTIVE_TRANSPORT,
  API_SET_INACTIVE_TRANSPORT,
  API_GET_TRANSPORT_TYPE_ACTIVE_ONLY,
  API_SET_INACTIVE_TRANSPORT_TYPE,
  API_SET_ACTIVE_TRANSPORT_TYPE,
  API_ADD_TRANSPORT_TYPE,
  API_GET_UOM_ADMIN,
  API_GET_ACTIVE_UOM,
  API_SET_ACTIVE_UOM,
  API_SET_INACTIVE_UOM,
  API_ADD_UOM,
  API_SET_INACTIVE_WAREHOUSE,
  API_SET_ACTIVE_WAREHOUSE,
  API_GET_WAREHOUSE_ADMIN,
  API_GET_WAREHOUSE_PROVINCE_ACTIVE,
  API_ADD_WAREHOUSE,
  API_GET_PROJECT_SERVICE_CHARGE_ADMIN,
  API_ADD_PROJECT_SERVICE_CHARGE,
  API_SET_PROJECT_SERVICE_CHARGE_ACTIVE,
  API_SET_PROJECT_SERVICE_CHARGE_INACTIVE,
  API_GET_CURRENCY_ACTIVE,
  API_GET_PROJECT_SERVICE_CHARGE_NOT_REGISTERED,
  API_GET_SKU_ADMIN,
  API_ADD_SKU,
  API_SET_SKU_ACTIVE,
  API_SET_SKU_INACTIVE,
  API_GET_CUSTOMER_ADMIN,
  API_ADD_CUSTOMER,
  API_SET_CUSTOMER_INACTIVE,
  API_SET_CUSTOMER_ACTIVE,
  API_SET_CUSTOMER_PUBLISH,
  API_GET_CUSTOMER_ACTIVE,
  API_SET_PROJECT_MEMBER_INACTIVE,
  API_SET_PROJECT_MEMBER_ACTIVE,
  API_GET_PROJECT_MEMBER_BASE_ON_PROJECT,
  API_ADD_PROJECT_MEMBER,
  API_GET_ROLES_WH_GROUP,
  API_GET_USER_NOT_REGISTER_BASE_ON_ROLE_AND_PROJECT,
  API_UPDATE_USER_ACCOUNT,
  API_GET_USER_ACCOUNT_ADMIN,
  API_ADD_USER_ACCOUNT,
  API_UPDATE_USER_PASSWORD,
  API_GET_ROLES_BY_ROLE_ID,
  API_GET_CHECK_USER_LOGIN_EXIST,
  API_GET_PROJECT_BY_USERID,
  API_GET_DASHBOARD,
  API_GET_WAREHOUSE_MEMBERSHIP,
  API_ADD_WH_PROJECT_MEMBERSHIP,
  API_DELETE_WH_PROJECT_MEMBERSHIP,
  API_GET_DESTINATION_KEY_WH_PROJECT,
  API_GET_ORDER_REQUEST_ITEM,
  API_RESET_ORDER_REQUEST,
  API_GET_TEMPLATE_ORDER_REQUEST_ITEM,
  API_UPLOAD_CUST_ORDER_REQ_TEIM,
  API_GET_ORDER_REQUEST_DETAIL,
  API_GET_SUB_DISTRICT_ACTIVE,
  API_ADD_SUB_DISTRICT,
  API_SET_SUB_DISTRICT_INACTIVE,
  API_SET_SUB_DISTRICT_ACTIVE,
  API_UPDATE_SUB_DISTRICT,
  API_GET_SUB_DISTRICT_BASE_ON_PROVINCE,
  API_GET_MASTER_WAREHOUSE_TYPE,
  API_SET_MASTER_WAREHOUSE_TYPE_INACTIVE,
  API_SET_MASTER_WAREHOUSE_TYPE_ACTIVE,
  API_ADD_MASTER_WAREHOUSE_TYPE,
  API_UPDATE_MASTER_WAREHOUSE_TYPE,
  API_GET_WAREHOUSE_ACTIVE,
  API_GET_TEMPLATE_SKU,
  API_UPLOAD_SKU,
  API_GET_BULK_UPLOAD_SKU,
  API_EXPORT_EXCEL_SKU,
  API_EXPORT_EXCEL_SKU_ERR,
  API_ADD_EVIDENCE_CHECKLIST_TYPE,
  API_GET_EVIDENCE_CHECKLIST_TYPE_LIST,
  API_SET_ACTIVE_EVIDENCE_CHECKLIST_TYPE,
  API_SET_INACTIVE_EVIDENCE_CHECKLIST_TYPE,
  API_GET_EVIDENCE_CHECKLIST_TYPE,
  API_GET_EVIDENCE_CHECKLIST_PROJECT,
  API_ADD_EVIDENCE_CHECKLIST_PROJECT,
  API_SET_INACTIVE_EVIDENCE_CHECKLIST_PROJECT,
  API_SET_ACTIVE_EVIDENCE_CHECKLIST_PROJECT,
  API_GET_EVIDENCE_CHECKLIST_PROJECT_NOT_REGISTERED,
  API_EXPORT_EXCEL_SUB_DISTRICT,
  API_GET_MASTER_LOGISTIC_PROCESS_ACTIVE,
  API_GET_MENU,
  API_GET_MASTER_VEHICLES_ALL,
  API_ADD_MASTER_VEHICLES,
  API_SET_INACTIVE_MASTER_VEHICLES,
  API_SET_ACTIVE_MASTER_VEHICLES,
  API_GET_MASTER_VEHICLES_PLAT_CODE,
  API_GET_MASTER_VEHICLES_CATEGORY_ACTIVE_ONLY,
  API_UPDATE_MASTER_VEHICLES,
  API_EXPORT_EXCEL_MASTER_VEHICLES,
  API_GET_MASTER_PLATE_CODE,
  API_ADD_MASTER_PLATE_CODE,
  API_SET_INACTIVE_MASTER_PLATE_CODE,
  API_SET_ACTIVE_MASTER_PLATE_CODE,
  API_GET_MRS_ALL,
  API_ADD_MRS,
  API_SET_IN_USE_MRS,
  API_GET_MASTER_VEHICLES_CATEGORY,
  API_GET_MASTER_VEHICLES_BRAND,
  API_GET_MASTER_VEHICLES_DETAIL,
  API_GET_MRS_DETAIL,
  API_GET_BULK_UPLOAD_MRS_DETAIL,
  API_GET_TRANSPORT_TYPE_ACTIVE_ONLY_ALL,
  API_GET_TEMPLATE_MRS_DETAIL,
  API_UPLOAD_MRS_DETAIL,
  API_ADD_MRS_DETAIL,
  API_DELETE_MRS_DETAIL,
  API_DOWNLOAD_TRANSPORT_TYPE,
  API_DOWNLOAD_SUB_DISTRICT,
  API_UPLOAD_CUSTOMER_LOGO,
  API_RESET_CUSTOMER_LOGO,
  API_UPDATE_PROJECT,
  API_ADD_TEMPLATE_SETTING,
  API_GET_TEMPLATE_SETTING,
  API_SET_INACTIVE_TEMPLATE_SETTING,
  API_SET_ACTIVE_TEMPLATE_SETTING,
  API_GET_DELIVERY_TEMPLATE_SETTING,
  API_GET_HTM_TEMPLATE_SETTING,
  API_EXPORT_EXCEL_MRS_DETAIL,
  API_EXPORT_EXCEL_MRS_DETAIL_ERR_LOG,
  API_SET_ACTIVE_WAREHOUSE_NOTIF,
  API_SET_INACTIVE_WAREHOUSE_NOTIF,
  API_GET_INV_MAIL_NOTIF,
  API_ADD_INV_MAIL_NOTIF,
  API_DELETE_INV_MAIL_NOTIF
} from "../../api/index"
import Swal from "sweetalert2";

/****************************************** GLOBAL ****************************/
export const getDashboard = (roleId) => {
  return async (dispatch) => {
    try {
      let dashboard = await actionCrud.actionCommonSlice(roleId, API_GET_DASHBOARD, "GET");

      dispatch({
        type: actionType.SET_DETAIL_DASHBOARD,
        payload: dashboard[0]
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const resetDetailDashboard = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionType.RESET_DETAIL_DASHBOARD
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const resetaActiveMenu = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionType.RESET_ACTIVE_MENU
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const actionSetReduxMenu = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionType.SET_MENU,
        payload: payload,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setDashboard = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionType.SET_DASHBOARD,
        payload: payload
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getMenu = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_MENU, "GET");
      let listMenu = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item
        }
      })

      dispatch({
        type: actionType.SET_MENU,
        payload: listMenu
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const actionSetReduxActiveMenu = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionType.SET_ACTIVE_MENU,
        payload: payload,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListProject = (payload) => {
  return async (dispatch) => {
    try {
      let listProject = await actionCrud.actionCommonCrud(payload, API_GET_PROJECT, "GET");

      dispatch({
        type: actionType.SET_LIST_PROJECT,
        payload: listProject
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const getListProjectByUser = (userId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(userId, API_GET_PROJECT_BY_USERID, "GET");
      let listProject = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_PROJECT,
        payload: listProject
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const setPublishedProject = (projectId) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonSlice(projectId, API_SET_PUBLISH_PROJECT, "PUT");
      return Promise.resolve(response.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const createProject = (payload) => {
  return async (dispatch) => {
    try {

      let createProject = await actionCrud.actionCommonCrud(payload, API_ADD_PROJECT, "POST");
      if (createProject.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: createProject?.message,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: createProject?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      return Promise.resolve(createProject.status)

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const updateProject = (payload) => {
  return async (dispatch) => {
    try {
      let result = await actionCrud.actionCommonCrud(payload, API_UPDATE_PROJECT, "PUT");
      if (result.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result?.message,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: result?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      return Promise.resolve(result.status)

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const setStatusActiveProject = (val, projectId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_PROJECT
      if (val) {
        url = API_SET_ACTIVE_PROJECT
      }

      let response = await actionCrud.actionCommonSlice(projectId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListProject());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListServiceCharge = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_SC_ADMIN, "GET");

      let listServiceCharge = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item
        }
      })

      dispatch({
        type: actionType.SET_LIST_SERVICE_CHARGE,
        payload: listServiceCharge
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setServiceCharge = (payload) => (dispatch) => {
  try {
    dispatch({
      type: actionType.SET_LIST_SERVICE_CHARGE,
      payload: payload
    });
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Close'
    })
  }
};

export const createServiceCharge = (payload) => {
  return async (dispatch) => {
    try {

      let create = await actionCrud.actionCommonCrud(payload, API_ADD_SC, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });

        dispatch(getListServiceCharge());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveServiceCharge = (val, serviceChargeId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_SC
      if (val) {
        url = API_SET_ACTIVE_SC
      }

      let response = await actionCrud.actionCommonSlice(serviceChargeId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListServiceCharge());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListDelivery = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_DEL_ADMIN, "GET");

      let listDelivery = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item
        }
      })

      dispatch({
        type: actionType.SET_LIST_DELIVERY_MODE,
        payload: listDelivery
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveDelivery = (val, delModeId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_DEL
      if (val) {
        url = API_SET_ACTIVE_DEL
      }

      let response = await actionCrud.actionCommonSlice(delModeId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListDelivery());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListTransport = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_TRANSPORT_ADMIN, "GET");

      let listTransport = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item
        }
      })

      dispatch({
        type: actionType.SET_LIST_TRANSPORT_MODE,
        payload: listTransport
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveTransport = (val, transportModeId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_TRANSPORT
      if (val) {
        url = API_SET_ACTIVE_TRANSPORT
      }

      let response = await actionCrud.actionCommonSlice(transportModeId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListTransport());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListTransportType = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_TRANSPORT_TYPE_ACTIVE_ONLY, "GET");
      let listTransportType = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_TRANSPORT_TYPE,
        payload: listTransportType
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveTransportType = (val, transportTypeId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_TRANSPORT_TYPE
      if (val) {
        url = API_SET_ACTIVE_TRANSPORT_TYPE
      }

      let response = await actionCrud.actionCommonSlice(transportTypeId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListTransportType());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectActiveCurrency = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_CURRENCY_ACTIVE, "GET");
      let listCurrency = list?.map((item, idx) => {
        return {
          label: item.currencyName,
          value: item.currencyId
        }
      })
      return Promise.resolve(['Please Select..', ...listCurrency])
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectProjectServiceChargeNotRegistered = (projectId) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonSlice(projectId, API_GET_PROJECT_SERVICE_CHARGE_NOT_REGISTERED, "GET");
      let listProjectServiceChargeNotRegistered = list?.map((item, idx) => {
        return {
          label: item.serviceChargeCode + ' - ' + item.serviceCharge,
          value: item.serviceChargeId
        }
      })
      return Promise.resolve(['Please Select..', ...listProjectServiceChargeNotRegistered])
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectActiveTransport = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_ACTIVE_TRANSPORT, "GET");
      let listTransport = list?.map((item, idx) => {
        return {
          label: item.transportMode,
          value: item.transportModeId
        }
      })
      return Promise.resolve(listTransport)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createTransportType = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_TRANSPORT_TYPE, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListTransportType());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createUom = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_UOM, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListUom());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListUom = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_UOM_ADMIN, "GET");
      let listUom = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_UOM,
        payload: listUom
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusUom = (val, uomId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_UOM
      if (val) {
        url = API_SET_ACTIVE_UOM
      }

      let response = await actionCrud.actionCommonSlice(uomId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListUom());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectActiveUom = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_ACTIVE_UOM, "GET");
      let listUom = list?.map((item, idx) => {
        return {
          label: item.uom,
          value: item.uomId
        }
      })
      return Promise.resolve(['Please Select..', ...listUom])
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListWarehouse = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_WAREHOUSE_ADMIN, "GET");
      let listWarehouse = list?.map((item, idx) => {
        return {
          no: idx + 1,
          projectId: payload,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_WAREHOUSE,
        payload: listWarehouse
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveWarehouse = (val, whId, projectId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_WAREHOUSE
      if (val) {
        url = API_SET_ACTIVE_WAREHOUSE
      }

      let response = await actionCrud.actionCommonSlice(whId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListWarehouse(projectId));
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveWarehouseNotif = (val, whId, projectId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_WAREHOUSE_NOTIF
      if (val) {
        url = API_SET_ACTIVE_WAREHOUSE_NOTIF
      }

      let response = await actionCrud.actionCommonSlice(whId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListWarehouse(projectId));
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectWarehouseType = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_WAREHOUSE_ACTIVE, "GET");
      let listWarehouse = list?.map((item, idx) => {
        return {
          label: item.whType,
          value: item.whTypeId
        }
      })
      return Promise.resolve(listWarehouse)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectWarehouseProvince = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_WAREHOUSE_PROVINCE_ACTIVE, "GET");


      let listProvince = list?.map((item, idx) => {
        return {
          label: item.provinceName,
          value: item.provinceId
        }
      })
      return Promise.resolve(listProvince)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createWarehouse = (payload, methode) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_WAREHOUSE, methode);
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListWarehouse(payload?.mProjectId));
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListProjectServiceCharge = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_PROJECT_SERVICE_CHARGE_ADMIN, "GET");
      let listProjectServiceCharge = list?.map((item, idx) => {
        return {
          no: idx + 1,
          projectId: payload,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_PROJECT_SERVICE_CHARGE,
        payload: listProjectServiceCharge
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createProjectServiceCharge = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_PROJECT_SERVICE_CHARGE, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListProjectServiceCharge(payload?.projectId));
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveProjectServiceCharge = (val, projectServiceChargeId, projectId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_PROJECT_SERVICE_CHARGE_INACTIVE
      if (val) {
        url = API_SET_PROJECT_SERVICE_CHARGE_ACTIVE
      }

      let response = await actionCrud.actionCommonSlice(projectServiceChargeId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListProjectServiceCharge(projectId));
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListSku = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_SKU_ADMIN, "GET");
      let listSku = list?.map((item, idx) => {
        return {
          no: idx + 1,
          projectId: payload,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_SKU,
        payload: listSku
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createSku = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_SKU, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListSku(payload?.mProjectId));
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveSku = (val, skuId, projectId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_SKU_INACTIVE
      if (val) {
        url = API_SET_SKU_ACTIVE
      }

      let response = await actionCrud.actionCommonSlice(skuId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListSku(projectId));
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListCustomer = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_CUSTOMER_ADMIN, "GET");
      let listCustomer = list?.map((item, idx) => {
        return {
          no: idx + 1,
          projectId: payload,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_CUSTOMER,
        payload: listCustomer
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createCustomer = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_CUSTOMER, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListCustomer(payload?.mProjectId));
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveCustomer = (val, customerId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_CUSTOMER_INACTIVE
      if (val) {
        url = API_SET_CUSTOMER_ACTIVE
      }

      let response = await actionCrud.actionCommonSlice(customerId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListCustomer());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusPublishCustomer = (customerId) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonSlice(customerId, API_SET_CUSTOMER_PUBLISH, "PUT");
      if (response.status === "success") {
        dispatch(getListCustomer());
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectActiveCustomer = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_CUSTOMER_ACTIVE, "GET");
      let listCustomer = list?.map((item, idx) => {
        return {
          label: item.customer_name,
          value: item.customerId
        }
      })
      return Promise.resolve(listCustomer)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getMasterLogisticProcessActiveOnly = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_MASTER_LOGISTIC_PROCESS_ACTIVE, "GET");
      let data = list?.map((item, idx) => {
        return {
          label: item.processName,
          value: item.processId
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListProjectMember = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_PROJECT_MEMBER_BASE_ON_PROJECT, "GET");
      let listProjectMember = list?.map((item, idx) => {
        return {
          no: idx + 1,
          projectId: payload,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_PROJECT_MEMBER,
        payload: listProjectMember
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createProjectMember = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_PROJECT_MEMBER, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListProjectMember(payload?.projectId));
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveProjectMember = (val, projectUserId, projectId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_PROJECT_MEMBER_INACTIVE
      if (val) {
        url = API_SET_PROJECT_MEMBER_ACTIVE
      }

      let response = await actionCrud.actionCommonSlice(projectUserId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListProjectMember(projectId));
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectRoleWhGroup = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_ROLES_WH_GROUP, "GET");
      let listRole = list?.map((item, idx) => {
        return {
          label: item.roleName,
          value: item.roleId
        }
      })
      return Promise.resolve(['Please Select..', ...listRole])
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getUserNotRegisteredYetBasedOnRoleAndProject = (payload) => {
  return async (dispatch) => {
    try {
      const param = `${payload.roleId}/${payload.projectId}`
      let list = await actionCrud.actionCommonSlice(param, API_GET_USER_NOT_REGISTER_BASE_ON_ROLE_AND_PROJECT, "GET");
      let listUserNotRegistered = list?.map((item, idx) => {
        return {
          no: idx + 1,
          projectId: payload.projectId,
          roleId: payload.roleId,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_USER_NOT_REGISTERED_PM,
        payload: listUserNotRegistered
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListAccountManagement = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_USER_ACCOUNT_ADMIN, "GET");
      let listAccountManagement = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_ACCOUNT_MANAGEMENT,
        payload: listAccountManagement
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const updateUserPassword = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_UPDATE_USER_PASSWORD, "PUT");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListAccountManagement());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createAccountManagement = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_USER_ACCOUNT, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListAccountManagement());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const updateAccountManagement = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_UPDATE_USER_ACCOUNT, "PUT");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListAccountManagement());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectRolesByRoleId = (roleId) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonSlice(roleId, API_GET_ROLES_BY_ROLE_ID, "GET");
      let roleList = list?.map((item, idx) => {
        return {
          label: item.roleName,
          value: item.roleId
        }
      })
      return Promise.resolve(roleList)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getUserLoginExist = (userLogin) => {
  return async () => {
    try {
      let data = await actionCrud.actionCommonSlice(userLogin, API_GET_CHECK_USER_LOGIN_EXIST, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListWarehouseMembership = (projectId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_WAREHOUSE_MEMBERSHIP, "GET");
      let listWarehouseMembership = list?.map((item, idx) => {
        return {
          no: idx + 1,
          projectId: projectId,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_WAREHOUSE_MEMBERSHIP,
        payload: listWarehouseMembership
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setWhProjectMembership = (payload, projectId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_WH_PROJECT_MEMBERSHIP, "POST");

      if (create.status === "success") {
        dispatch(getListWarehouseMembership(payload.userId, projectId));
        dispatch(getListProjectMember(projectId))
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const deleteWhProjectMembership = (payload, projectId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_DELETE_WH_PROJECT_MEMBERSHIP, "POST");

      if (create.status === "success") {
        dispatch(getListWarehouseMembership(payload.userId, projectId));
        dispatch(getListProjectMember(projectId))
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelecTransportType = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_TRANSPORT_TYPE_ACTIVE_ONLY, "GET");
      let data = list?.map((item, idx) => {
        return {
          label: item.transportMode + '-' + item.transportName,
          value: item.transportTypeId
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const getSelectDestination = (projectId, routeTypeId, whCode) => {
  return async () => {
    try {
      const fullParam = `${projectId}/${routeTypeId}/${whCode}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_DESTINATION_KEY_WH_PROJECT, "GET");
      let data = list?.map((item, idx) => {
        return {
          label: item.point_code,
          value: item.point_code_id,
          address: item.address
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getOrderRequestItemList = (orderRequestId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderRequestId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_ORDER_REQUEST_ITEM, "GET");
      return Promise.resolve(list)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getMassUploadTemplateOrderReqItemBulkUpload = () => {
  return async () => {
    try {
      let data = await actionCrud.actionParamRequest('', API_GET_TEMPLATE_ORDER_REQUEST_ITEM, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getOrderRequestDetail = (orderReqId) => {
  return async () => {
    try {
      let data = await actionCrud.actionParamRequest(orderReqId, API_GET_ORDER_REQUEST_DETAIL, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const resetPickAndPackprogress = (orderReqId) => {
  return async () => {
    try {
      let create = await actionCrud.actionCommonSlice(orderReqId, API_RESET_ORDER_REQUEST, "DELETE");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const uploadOrderReqItemPickAndPackProgress = (formData, orderReqId) => {
  return async (dispatch) => {
    try {
      const { value } = await actionCrud.actionCommonSliceParam(orderReqId, API_UPLOAD_CUST_ORDER_REQ_TEIM, "POST", '', formData)
      Swal.fire({
        title: value.status,
        text: value.message,
        icon: "success",
        confirmButtonText: "Yes",
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  };
}

export const getListSubDistrict = () => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(null, API_GET_SUB_DISTRICT_ACTIVE, "GET");
      let listSubDistrict = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_SUB_DISTRICT,
        payload: listSubDistrict
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const createSubDistrict = (payload, methode) => {
  return async (dispatch) => {
    try {
      const url = methode === 'POST' ? API_ADD_SUB_DISTRICT : API_UPDATE_SUB_DISTRICT
      let create = await actionCrud.actionCommonCrud(payload, url, methode);
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListSubDistrict());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const setStatusActiveSubDistrict = (val, subDistrictId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_SUB_DISTRICT_INACTIVE
      if (val) {
        url = API_SET_SUB_DISTRICT_ACTIVE
      }

      let response = await actionCrud.actionCommonSlice(subDistrictId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListSubDistrict());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const getSelectSubDistrictBaseOnProvince = (provinceId) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonSlice(provinceId, API_GET_SUB_DISTRICT_BASE_ON_PROVINCE, "GET");
      let listSubDistrict = list?.map((item, idx) => {
        return {
          label: item.subDistrictName,
          value: item.subDistrictId
        }
      })
      return Promise.resolve(listSubDistrict)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListMasterWarehouseType = () => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(null, API_GET_MASTER_WAREHOUSE_TYPE, "GET");
      let listMasterWarehouseType = list?.map((item, idx) => {
        return {
          no: idx + 1,
          whTypeDescription: item.typeDescription,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_MASTER_WAREHOUSE_TYPE,
        payload: listMasterWarehouseType
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const setStatusActiveMasterWarehouseType = (val, whTypeId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_MASTER_WAREHOUSE_TYPE_INACTIVE
      if (val) {
        url = API_SET_MASTER_WAREHOUSE_TYPE_ACTIVE
      }

      let response = await actionCrud.actionCommonSlice(whTypeId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListMasterWarehouseType());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const createMasterWarehouseType = (payload, methode) => {
  return async (dispatch) => {
    try {
      const url = methode === 'POST' ? API_ADD_MASTER_WAREHOUSE_TYPE : API_UPDATE_MASTER_WAREHOUSE_TYPE
      let create = await actionCrud.actionCommonCrud(payload, url, methode);
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListMasterWarehouseType());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const getMassUploadSKUTemplate = () => {
  return async () => {
    try {
      let data = await actionCrud.actionParamRequest('', API_GET_TEMPLATE_SKU, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const masterMaterialBulkUpload = (formData, projectId) => {
  return async (dispatch) => {
    try {
      const { value, status, message } = await actionCrud.actionCommonSliceParam(projectId, API_UPLOAD_SKU, "POST", '', formData)
      if (status !== 'error') {
        dispatch(getMaterialBulkUploadResult(projectId));
        Swal.fire({
          title: value.status,
          text: value.message,
          icon: "success",
          confirmButtonText: "Yes",
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  };
}
export const getMaterialBulkUploadResult = (projectId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSliceParam(projectId, API_GET_BULK_UPLOAD_SKU, "GET");
      let listBulkUploadSku = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_BULK_UPLOAD_SKU,
        payload: listBulkUploadSku
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const getMasterSKUExportToExcel = (projectId, projectName) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${projectName}`
      let data = await actionCrud.actionCommonSliceParamBlob(fullParam, API_EXPORT_EXCEL_SKU, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const getMasterSKUBulkUploadErrList = (bulkUploadId, fileName) => {
  return async (dispatch) => {
    try {
      const fullParam = `${bulkUploadId}/${fileName}`
      let data = await actionCrud.actionCommonSliceParamBlob(fullParam, API_EXPORT_EXCEL_SKU_ERR, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const getSelectEvidenceChecklistType = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_EVIDENCE_CHECKLIST_TYPE, "GET");
      let response = list?.map((item, idx) => {
        return {
          label: item.checklistTypeName,
          value: item.checklistTypeId
        }
      })
      return Promise.resolve(response)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListEvidenceChecklist = () => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(null, API_GET_EVIDENCE_CHECKLIST_TYPE_LIST, "GET");
      let listEvidenceChecklist = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_EVIDENCE_CHECKLIST,
        payload: listEvidenceChecklist
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createEvidenceChecklist = (payload, methode = 'POST') => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_EVIDENCE_CHECKLIST_TYPE, methode);
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListEvidenceChecklist());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusEvidenceChecklist = (val, evidenceChecklistId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_EVIDENCE_CHECKLIST_TYPE
      if (val) {
        url = API_SET_ACTIVE_EVIDENCE_CHECKLIST_TYPE
      }

      let response = await actionCrud.actionCommonSlice(evidenceChecklistId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListEvidenceChecklist());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const getListEvidenceChecklistProject = (projectId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(projectId, API_GET_EVIDENCE_CHECKLIST_PROJECT, "GET");
      let listEvidenceChecklistProject = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_EVIDENCE_CHECKLIST_PROJECT,
        payload: listEvidenceChecklistProject
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const createEvidenceChecklistProject = (payload, methode = 'POST') => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_EVIDENCE_CHECKLIST_PROJECT, methode);
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListEvidenceChecklistProject(payload?.projectId));
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const setStatusEvidenceChecklistProject = (val, evidenceChecklistProjectId, projectId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_EVIDENCE_CHECKLIST_PROJECT
      if (val) {
        url = API_SET_ACTIVE_EVIDENCE_CHECKLIST_PROJECT
      }

      let response = await actionCrud.actionCommonSlice(evidenceChecklistProjectId, url, "PUT");
      if (response.status === "success") {
        dispatch(getListEvidenceChecklistProject(projectId));
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const getProjectEvidenceChecklistNotRegisteredYet = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_EVIDENCE_CHECKLIST_PROJECT_NOT_REGISTERED, "GET");
      let response = list?.map((item, idx) => {
        return {
          label: item.checklistName,
          value: item.evidenceChecklistId
        }
      })
      return Promise.resolve(response)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}
export const subDistrictExportToExcel = () => {
  return async (dispatch) => {
    try {
      let data = await actionCrud.actionCommonSliceParamBlob('', API_EXPORT_EXCEL_SUB_DISTRICT, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListMasterAssetTruck = () => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(null, API_GET_MASTER_VEHICLES_ALL, "GET");
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_MASTER_ASSET_TRUCK,
        payload: result
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createMasterAssetTruck = (payload, methode = 'POST') => {
  return async (dispatch) => {
    try {

      let url = API_ADD_MASTER_VEHICLES
      if (methode === 'PUT') url = API_UPDATE_MASTER_VEHICLES

      let create = await actionCrud.actionCommonCrud(payload, url, methode);
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListMasterAssetTruck());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveMasterAssetTruck = (val, vehicleId, userId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_MASTER_VEHICLES
      if (val) {
        url = API_SET_ACTIVE_MASTER_VEHICLES
      }

      const fullParam = `${vehicleId}/${userId}`
      let response = await actionCrud.actionCommonSliceParam(fullParam, url, "PUT");
      if (response.status === "success") {
        dispatch(getListMasterAssetTruck());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelecPlatCode = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_MASTER_VEHICLES_PLAT_CODE, "GET");
      let data = list?.map((item, idx) => {
        return {
          label: item.platCode,
          value: item.platCode
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getMasterVehiclesDetail = (id) => {
  return async () => {
    try {
      let [result] = await actionCrud.actionCommonSlice(id, API_GET_MASTER_VEHICLES_DETAIL, "GET");
      return Promise.resolve(result)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getMasterOwnershipVehicleCategoryActiveOnly = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_MASTER_VEHICLES_CATEGORY_ACTIVE_ONLY, "GET");
      let data = list?.map((item, idx) => {
        return {
          label: item.ownerShipCategory,
          value: item.ownershipCatId
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getMasterVehicleCategoryActiveOnly = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_MASTER_VEHICLES_CATEGORY, "GET");
      let data = list?.map((item, idx) => {
        return {
          label: item.vehicleCategory,
          value: item.vehicleCategoryId
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getMasterVehicleBrandActiveOnly = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_MASTER_VEHICLES_BRAND, "GET");
      let data = list?.map((item, idx) => {
        return {
          label: item.brandName,
          value: item.brandId
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const assetTruckExportExcel = () => {
  return async (dispatch) => {
    try {
      let data = await actionCrud.actionCommonSliceParamBlob('', API_EXPORT_EXCEL_MASTER_VEHICLES, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListMasterPlateCode = () => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonCrud(null, API_GET_MASTER_PLATE_CODE, "GET");
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_MASTER_PLATE_CODE,
        payload: result
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createMasterPlateCode = (payload, methode = 'POST') => {
  return async (dispatch) => {
    try {
      let url = API_ADD_MASTER_PLATE_CODE
      let create = await actionCrud.actionCommonCrud(payload, url, methode);
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListMasterPlateCode());
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveMasterPlateCode = (val, id) => {
  return async (dispatch) => {
    try {

      let url = API_SET_INACTIVE_MASTER_PLATE_CODE
      if (val) {
        url = API_SET_ACTIVE_MASTER_PLATE_CODE
      }

      const fullParam = `${id}`
      let response = await actionCrud.actionCommonSliceParam(fullParam, url, "PUT");
      if (response.status === "success") {
        dispatch(getListMasterPlateCode());
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListMrs = (projectId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(projectId, API_GET_MRS_ALL, "GET");
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_MRS,
        payload: result
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createMrs = (payload, methode = 'POST') => {
  return async (dispatch) => {
    try {
      let url = API_ADD_MRS
      let create = await actionCrud.actionCommonCrud(payload, url, methode);
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getListMrs(payload.projectId));
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setInUseMrs = (mrsId, projectId, userId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_IN_USE_MRS
      const fullParam = `${mrsId}/${projectId}/${userId}`
      console.log(fullParam)
      let response = await actionCrud.actionCommonSliceParam(fullParam, url, "PUT");
      if (response.status === "success") {
        dispatch(getListMrs(projectId));
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListMrsDetail = (mrsId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(mrsId, API_GET_MRS_DETAIL, "GET");
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_MRS_DETAIL,
        payload: result
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListMrsDetailBulkUpload = (mrsId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(mrsId, API_GET_BULK_UPLOAD_MRS_DETAIL, "GET");
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_MRS_DETAIL_BULK_UPLOAD,
        payload: result
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelecTransportTypeAll = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_TRANSPORT_TYPE_ACTIVE_ONLY_ALL, "GET");
      let data = list?.map((item, idx) => {
        return {
          label: item.transportMode + '-' + item.transportName,
          value: item.transportTypeId
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getBulkUploadMRSDetailTemplate = () => {
  return async () => {
    try {
      let data = await actionCrud.actionParamRequest('', API_GET_TEMPLATE_MRS_DETAIL, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const mrsDetailBulkUpload = (formData, mrsId) => {
  return async (dispatch) => {
    try {
      const { value, status, message } = await actionCrud.actionCommonSliceParam(
        mrsId,
        API_UPLOAD_MRS_DETAIL,
        "POST",
        '',
        formData)
      if (status !== 'error') {
        Swal.fire({
          title: value.status,
          text: value.message,
          icon: "success",
          confirmButtonText: "Yes",
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      return Promise.resolve(value.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  };
}

export const createMrsDetail = (payload) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonCrud(payload, API_ADD_MRS_DETAIL, "POST");
      if (response.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response?.message,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      return Promise.resolve(response.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const deleteMrsDetail = (mrsDetailId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${mrsDetailId}/${userId}`
      let create = await actionCrud.actionCommonSliceParam(fullParam, API_DELETE_MRS_DETAIL, "PUT");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      return Promise.resolve(create.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getTransportTypeActiveOnlyExportToExcel = () => {
  return async () => {
    try {
      let data = await actionCrud.actionCommonSliceParamBlob('', API_DOWNLOAD_TRANSPORT_TYPE, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSubDistrictExportToExcel = () => {
  return async () => {
    try {
      let data = await actionCrud.actionCommonSliceParamBlob('', API_DOWNLOAD_SUB_DISTRICT, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const exportExcelMrsDetail = (param) => {
  return async () => {
    try {
      const fullParam = `${param.mrsId}/${param.mrsName}`
      let data = await actionCrud.actionCommonSliceParamBlob(fullParam, API_EXPORT_EXCEL_MRS_DETAIL, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

// 
export const exportExcelMrsDetailErrLog = (mrsDetailFileUploadId) => {
  return async () => {
    try {
      const fullParam = `${mrsDetailFileUploadId}`
      let data = await actionCrud.actionCommonSliceParamBlob(fullParam, API_EXPORT_EXCEL_MRS_DETAIL_ERR_LOG, "GET");
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const addCustomerLogo = (formData, customerId, userId) => {
  return async (dispatch) => {
    try {

      const fullParam = `${customerId}/${userId}`

      const { value, status, message } =
        await actionCrud.actionCommonSliceParam(fullParam,
          API_UPLOAD_CUSTOMER_LOGO,
          'POST',
          '',
          formData
        );

      if (status !== 'error') {
        Swal.fire({
          title: value.status,
          text: value.message,
          icon: "success",
          confirmButtonText: "Yes",
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      return Promise.resolve(value.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  };
}

export const resetCustomerLogo = (customerId, userId) => {
  return async (dispatch) => {
    try {

      const fullParam = `${customerId}/${userId}`

      const { status, message } =
        await actionCrud.actionCommonSliceParam(fullParam,
          API_RESET_CUSTOMER_LOGO,
          'PUT',
        );

      if (status !== 'error') {
        Swal.fire({
          title: status,
          text: message,
          icon: "success",
          confirmButtonText: "Yes",
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      return Promise.resolve(status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  };
}

export const createTemplateSetting = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_TEMPLATE_SETTING, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      return Promise.resolve(create.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListTemplateSetting = (projectId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(projectId, API_GET_TEMPLATE_SETTING, "GET");
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_TEMPLATE_SETTING,
        payload: result
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const setStatusActiveTemplateSetting = (val, dnSetupId, projectId) => {
  return async (dispatch) => {
    try {
      let url = API_SET_INACTIVE_TEMPLATE_SETTING
      if (val) {
        url = API_SET_ACTIVE_TEMPLATE_SETTING
      }
      const fullParam = `${dnSetupId}/${projectId}`
      let response = await actionCrud.actionCommonSlice(fullParam, url, "PUT");
      return Promise.resolve(response.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectDeliveryTypeTemplateSetting = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_DELIVERY_TEMPLATE_SETTING, "GET");
      let data = list?.map((item, idx) => {
        return {
          label: item.processName,
          value: item.packageProcessId
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getSelectHtmTemplateSetting = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_HTM_TEMPLATE_SETTING, "GET");
      let data = list?.map((item, idx) => {
        return {
          label: item.templateName,
          value: item.dnTemplateId
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const getListInvMailNotif = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_INV_MAIL_NOTIF, "GET");
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          projectId: payload,
          ...item
        }
      })
      dispatch({
        type: actionType.SET_LIST_INV_MAIL_NOTIF,
        payload: result
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const createInvMailNotif = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_INV_MAIL_NOTIF, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      return Promise.resolve(create.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}

export const deleteInvMailNotif = (invMailNotifId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${invMailNotifId}`
      let create = await actionCrud.actionCommonSliceParam(fullParam, API_DELETE_INV_MAIL_NOTIF, "DELETE");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      return Promise.resolve(create.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
}