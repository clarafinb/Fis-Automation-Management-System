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
  API_GET_ACTIVE_SC,
  API_GET_DEL_ADMIN,
  API_GET_ACTIVE_DEL,
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
  API_GET_WAREHOUSE_TYPE_GET_ALL,
  API_GET_WAREHOUSE_PROVINCE_ACTIVE,
  API_ADD_WAREHOUSE,
  API_GET_PROJECT_SERVICE_CHARGE_ADMIN,
  API_ADD_PROJECT_SERVICE_CHARGE,
  API_SET_PROJECT_SERVICE_CHARGE_ACTIVE,
  API_SET_PROJECT_SERVICE_CHARGE_INACTIVE,
  API_GET_CURRENCY_ACTIVE,
  API_GET_PROJECT_SERVICE_CHARGE_NOT_REGISTERED,
  API_GET_SKU_ADMIN,
  API_GET_SKU_ACTIVE,
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
  API_GET_ACTIVITY_SUMMARY_WH_PROJECT,
  API_GET_WAREHOUSE_MEMBERSHIP,
  API_ADD_WH_PROJECT_MEMBERSHIP,
  API_DELETE_WH_PROJECT_MEMBERSHIP,
  API_GET_ORDER_REQUEST,
  API_DELETE_ORDER_REQUEST,
  API_CANCEL_ORDER_REQUEST,
  API_GET_TYPE_DELIVERY_PROCESS,
  API_GET_TYPE_ROUTE,
  API_GET_ORIGIN_POINT,
  API_GET_DESTINATION_KEY_WH_PROJECT,
  API_ADD_ORDER_REQUEST,
  API_GET_PICK_AND_PACK_PENDING,
  API_GET_ORDER_REQUEST_ITEM,
  API_START_PICK_AND_PACK,
  API_RESET_ORDER_REQUEST,
  API_GET_TEMPLATE_ORDER_REQUEST_ITEM,
  API_UPLOAD_CUST_ORDER_REQ_TEIM,
  API_GET_PICK_AND_PACK_PROGRESS,
  API_GET_ORDER_REQUEST_DETAIL,
  API_GET_DELIVERY_MODE_BASED_TRANSPORT_MODE,
  API_GET_ORDER_REQUEST_ADDED_SERVICE_CHARGE,
  API_COMPLETE_PICK_AND_PACK,
  API_GET_ORDER_REQUEST_SERVICE_CHARGE,
  API_ADD_ORDER_REQUEST_SERVICE_CHARGE,
  API_GET_DELIVERY_PENDING,
  API_GET_TRANSPORT_ARRAGEMENT_ORDER_REQ,
  API_GET_ORDER_REQUEST_TRANSPORT_ARRAGMENET,
  API_GET_TRANSPORT_ARRAGEMENT_TYPE,
  API_GET_TRANSPORT_ARRAGEMENT_TYPE_LIST,
  API_GET_DISPATCHER_BASE_TRANSPORT_ARRAGEMENT,
  API_DELETE_TRANSPORT_ARRAGEMENT_TYPE,
  API_ADD_TRANSPORT_ARRAGEMENT_TYPE,
  API_GET_TRANSPORT_ARRAGEMENT_ADD_SERVICE_CHARGE_LIST,
  API_DELETE_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE,
  API_GET_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE,
  API_ADD_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE,
  API_TRANSPORT_ARRANGEMENT_COMPELETE,
  API_ADD_TRANSPORT_ARRAGEMENT,
  API_GET_DELIVERY_TRANSIT,
  API_GET_DELIVERY_COMPLETE,
  API_GET_TRANSPORT_ARRAGEMENT_DELIVERY,
  API_DELETE_ADDITIONAL_SERVICE_PICK_AND_PACK,
  API_GET_MASTER_LOCATION,
  API_GET_ROUTE_CATEGORY_ACTIVE,
  API_DELETE_MASTER_LOCATION,
  API_ADD_MASTER_LOCATION,
  API_GET_SUB_DISTRICT_ACTIVE,
  API_ADD_SUB_DISTRICT,
  API_SET_SUB_DISTRICT_INACTIVE,
  API_SET_SUB_DISTRICT_ACTIVE,
  API_UPDATE_SUB_DISTRICT,
  API_GET_SUB_DISTRICT_BASE_ON_PROVINCE,
  API_GET_HO_DOCUMENT,
  API_GET_MASTER_WAREHOUSE_TYPE,
  API_SET_MASTER_WAREHOUSE_TYPE_INACTIVE,
  API_SET_MASTER_WAREHOUSE_TYPE_ACTIVE,
  API_ADD_MASTER_WAREHOUSE_TYPE,
  API_UPDATE_MASTER_WAREHOUSE_TYPE,
  API_GET_PACKAGE_TYPE,
  API_GET_WAREHOUSE_ACTIVE,
  API_GET_ORDER_REQUEST_ITEM_INVENTORY
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

        dispatch(getListProject());
      } else {
        Swal.fire({
          title: 'Error!',
          text: createProject?.message,
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
//API_DELETE_ADDITIONAL_SERVICE_PICK_AND_PACK

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
          transportMode: item.transportMode,
          transportModeAlias: item.transportModeAlias,
          status: item.isActive,
          detail: item
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
      return Promise.resolve(['Please Select..', ...listWarehouse])
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
      return Promise.resolve(['Please Select..', ...listCustomer])
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

export const getActivitySummaryWHProject = (userId, projectId) => {
  return async () => {
    try {
      let data = await actionCrud.actionCommonSlice(projectId, API_GET_ACTIVITY_SUMMARY_WH_PROJECT, "GET", userId);
      const result = data?.map(row => {
        return {
          ...row,
          projectId: projectId
        }
      })
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

export const getListWarehouseMembership = (projectId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_WAREHOUSE_MEMBERSHIP, "GET");
      let listWarehouseMembership = list?.map((item, idx) => {
        return {
          no: idx + 1,
          whName: item.whName,
          whCode: item.whCode,
          isMainWH: item.isMainWH,
          whMemberStatus: item.whMemberStatus,
          detail: { ...item, ...{ projectId: projectId } }
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
      console.log('desti', list)
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
export const getListPickAndPackProgress = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_PICK_AND_PACK_PROGRESS, "GET");
      let listPickAndPackProgress = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId
            }
          }
        }
      })
      dispatch({
        type: actionType.SET_LIST_PICK_AND_PACK_PROGRESS,
        payload: listPickAndPackProgress
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
export const getDeliveryRequestFinal = (transportModeId, orderReqId) => {
  return async () => {
    try {
      const fullParam = `${transportModeId}/${orderReqId}`
      let list = await actionCrud.actionCommonSliceParam(fullParam, API_GET_DELIVERY_MODE_BASED_TRANSPORT_MODE, "GET");
      let listDeliveryFinal = list?.map((item, idx) => {
        return {
          label: item.deliveryMode,
          value: item.deliveryModeId
        }
      })
      return Promise.resolve(listDeliveryFinal)
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
export const getOrderRequestServiceCharge = (orderReqId) => {
  return async (dispatch) => {
    try {
      let data = await actionCrud.actionParamRequest(orderReqId, API_GET_ORDER_REQUEST_ADDED_SERVICE_CHARGE, "GET");
      const listOrdeRequestAdditionalService = data.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              orderReqId: orderReqId,
            }
          }
        }
      })
      dispatch({
        type: actionType.SET_LIST_ORDER_REQUEST_ADDITIONAL_SERVICE,
        payload: listOrdeRequestAdditionalService
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

export const pickandPackComplete = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_COMPLETE_PICK_AND_PACK, "PUT");
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
// API_GET_ORDER_REQUEST_SERVICE_CHARGE
export const getOrderRequestServiceChargeList = (projectid, orderReqId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectid}/${orderReqId}`
      let data = await actionCrud.actionParamRequest(fullParam, API_GET_ORDER_REQUEST_SERVICE_CHARGE, "GET");
      const result = data.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectid: projectid,
              orderReqId: orderReqId,
            }
          }
        }
      })
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

export const addOrderRequestServiceCharge = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_ORDER_REQUEST_SERVICE_CHARGE, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getOrderRequestServiceCharge(payload.orderReqId));
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

export const getListDeliveryPending = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_DELIVERY_PENDING, "GET");
      let listDeliveryPending = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId
            }
          }
        }
      })
      dispatch({
        type: actionType.SET_LIST_DELIVERY_PENDING,
        payload: listDeliveryPending
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
export const getTransportArragementOrderReq = (orderReqId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderReqId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_TRANSPORT_ARRAGEMENT_ORDER_REQ, "GET");
      let listTransportArragement = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_TRANSPORT_ARRAGEMENT,
        payload: listTransportArragement
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

export const getOrderRequestTransportArrangment = (transportArrangementId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_ORDER_REQUEST_TRANSPORT_ARRAGMENET, "GET");
      let listRequestTransportArragement = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_REQUEST_TRANSPORT_ARRANGEMENT,
        payload: listRequestTransportArragement
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

export const getTransportTypeArranged = (transportArrangementId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_TRANSPORT_ARRAGEMENT_TYPE, "GET");
      let listTransportArrangmentType = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_TRANSPORT_ARRANGEMENT_TYPE,
        payload: listTransportArrangmentType
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

export const getTransportTypeList = (transportModeId) => {
  return async () => {
    try {
      const fullParam = `${transportModeId}`
      let list = await actionCrud.actionCommonSliceParam(fullParam, API_GET_TRANSPORT_ARRAGEMENT_TYPE_LIST, "GET");
      let listTransportType = list?.map((item, idx) => {
        return {
          label: item.transportName,
          value: item.transportTypeId
        }
      })
      return Promise.resolve(listTransportType)
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

export const getDispatcherList = (transportArrangementId, projectId) => {
  return async () => {
    try {
      const fullParam = `${transportArrangementId}/${projectId}`
      let list = await actionCrud.actionCommonSliceParam(fullParam, API_GET_DISPATCHER_BASE_TRANSPORT_ARRAGEMENT, "GET");
      let listDispatcher = list?.map((item, idx) => {
        return {
          label: item.dispatcherName,
          value: item.usr_id
        }
      })
      return Promise.resolve(listDispatcher)
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

export const deleteTransportType = (transportTypeArrangementId, transportArrangementId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonSlice(transportTypeArrangementId, API_DELETE_TRANSPORT_ARRAGEMENT_TYPE, "DELETE");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getTransportTypeArranged(transportArrangementId));
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

export const addTransportArrangmentType = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_TRANSPORT_ARRAGEMENT_TYPE, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getTransportTypeArranged(payload.transportArrangmentId));
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

export const getTransportArrangmentServiceChargeList = (transportArrangementId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_TRANSPORT_ARRAGEMENT_ADD_SERVICE_CHARGE_LIST, "GET");
      let listTransportArrangmentServiceCode = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_TRANSPORT_ARRANGEMENT_SC,
        payload: listTransportArrangmentServiceCode
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

export const addTransportArrangmentServiceCharge = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getTransportArrangmentServiceChargeList(payload.transportArrangmentId));
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

export const deleteTransportArrangmentServiceCharge = (transportArrangementServiceId, lmby, transportArrangementId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementServiceId}/${lmby}`
      let create = await actionCrud.actionCommonSlice(fullParam, API_DELETE_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE, "DELETE");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getTransportArrangmentServiceChargeList(transportArrangementId));
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

export const getServiceChargeList = (transportArrangementId, projectId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}/${projectId}`
      let list = await actionCrud.actionCommonSliceParam(fullParam, API_GET_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE, "GET");
      let listServiceChargeList = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_ORDER_REQUEST_ADDITIONAL_SERVICE,
        payload: listServiceChargeList
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


export const completeTransportArrangement = (transportArrangmentId, lmby) => {
  return async () => {
    try {
      const fullParam = `${transportArrangmentId}/${lmby}`
      let create = await actionCrud.actionCommonSlice(fullParam, API_TRANSPORT_ARRANGEMENT_COMPELETE, "PUT");
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

export const addTransportArrangment = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_TRANSPORT_ARRAGEMENT, "POST");
      if (create.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: create?.message,
          showConfirmButton: true
        });
        dispatch(getTransportArragementOrderReq(payload.orderReqId))
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

export const getListDeliveryTransit = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_DELIVERY_TRANSIT, "GET");
      let listDeliveryTransit = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId
            }
          }
        }
      })
      dispatch({
        type: actionType.SET_LIST_DELIVERY_TRANSIT,
        payload: listDeliveryTransit
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

export const getListDeliveryComplete = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_DELIVERY_COMPLETE, "GET");
      let listDeliveryComplete = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId
            }
          }
        }
      })
      dispatch({
        type: actionType.SET_LIST_DELIVERY_COMPLETE,
        payload: listDeliveryComplete
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

export const getTransportArragementLocation = (orderReqId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderReqId}`
      let data = await actionCrud.actionParamRequest(fullParam, API_GET_TRANSPORT_ARRAGEMENT_DELIVERY, "GET");
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
export const deleteAddServicePickPack = (orderReqId, payload) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud
        .actionUpdateWithBody(
          API_DELETE_ADDITIONAL_SERVICE_PICK_AND_PACK,
          payload
        );
      if (response.status === "success") {
        dispatch(getOrderRequestServiceCharge(orderReqId));
        Swal.fire({
          position: "center",
          icon: "success",
          title: response?.message,
          showConfirmButton: true
        });
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

export const getListMasterLocation = (projectId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_MASTER_LOCATION, "GET");
      let listMasterLocation = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_MASTER_LOCATION,
        payload: listMasterLocation
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
export const getSelecRouteCategory = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_ROUTE_CATEGORY_ACTIVE, "GET");
      let listRouteCategory = list?.map((item, idx) => {
        return {
          label: item.routeCategoryName,
          value: item.routeTypeCode
        }
      })
      return Promise.resolve(listRouteCategory)
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

export const deleteMasterLocation = (pointCodeId, userId, projectId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${pointCodeId}/${userId}`
      let response = await actionCrud.actionParamRequest(fullParam, API_DELETE_MASTER_LOCATION, "PUT");
      if (response.status === "success") {
        dispatch(getListMasterLocation(projectId));
        Swal.fire({
          position: "center",
          icon: "success",
          title: response?.message,
          showConfirmButton: true
        });
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
export const createMasterLocation = (payload) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonCrud(payload, API_ADD_MASTER_LOCATION, "POST");
      if (response.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response?.message,
          showConfirmButton: true
        });
        dispatch(getListMasterLocation(payload.projectId));
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
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
export const getListHoDocument = (orderReqId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSliceParam(orderReqId, API_GET_HO_DOCUMENT, "GET");
      let listHoDocument = list?.map((item, idx) => {
        return {
          no: idx + 1,
          latitude: item.confirmLatitude,
          longitude: item.confirmLongitude,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_HO_DOCUMENT,
        payload: listHoDocument
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

