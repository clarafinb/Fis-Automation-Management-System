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
  API_SET_SKU_INACTIVE
} from "../../api/index"
import Swal from "sweetalert2";

/****************************************** GLOBAL *******************************************/
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
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
          confirmButtonText: 'Cool'
        })
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
          serviceCharge: item.serviceCharge,
          serviceChargeCode: item.serviceChargeCode,
          uom: item.uom,
          modifiedBy: item.modifiedBy,
          modifiedDate: item.modifiedDate,
          status: item.isActive,
          detail: item
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
        confirmButtonText: 'Cool'
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
      confirmButtonText: 'Cool'
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
          confirmButtonText: 'Cool'
        })
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
          deliveryMode: item.deliveryMode,
          deliveryCode: item.deliveryCode,
          status: item.isActive,
          detail: item
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
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
          transportType: item.transportName,
          transportMode: item.transportMode,
          createName: item.createName,
          createDate: item.createDate,
          modifiedBy: item.modifiedBy,
          modifiedDate: item.modifiedDate,
          status: item.isActive,
          detail: item
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
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
      return Promise.resolve(['Please Select..', ...listTransport])
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
          confirmButtonText: 'Cool'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
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
          confirmButtonText: 'Cool'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
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
          uom: item.uom,
          modifiedBy: item.modifiedBy,
          modifiedDate: item.modifiedDate,
          status: item.isActive,
          detail: item
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
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
          whName: item.whName,
          whCode: item.whCode,
          isMainWH: item.isMainWH,
          whType: item.whType,
          whAddress: item.whAddress,
          map: item.longitude + ',' + item.latitude,
          status: item.isActive,
          detail: { ...item, ...{ projectId: payload } }
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
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
      })
    }
  }
}

export const getSelectWarehouseType = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_WAREHOUSE_TYPE_GET_ALL, "GET");


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
        confirmButtonText: 'Cool'
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
      return Promise.resolve(['Please Select..', ...listProvince])
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }
}

export const createWarehouse = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_WAREHOUSE, "POST");
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
          confirmButtonText: 'Cool'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
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
          serviceCharge: item.serviceCharge,
          serviceChargeCode: item.serviceChargeCode,
          chargeFee: item.chargeFee,
          currencyName: item.currencyName,
          modifiedBy: item.modifiedBy,
          modifiedDate: item.modifiedDate,
          status: item.isActive,
          detail: { ...item, ...{ projectId: payload } }
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
        confirmButtonText: 'Cool'
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
          confirmButtonText: 'Cool'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
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
          materialCode: item.materialCode,
          materialDesc: item.materialDesc,
          uom: item.uom,
          modifiedBy: item.modifiedBy,
          modifiedDate: item.modifiedDate,
          status: item.isActive,
          detail: { ...item, ...{ projectId: payload } }
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
        confirmButtonText: 'Cool'
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
          confirmButtonText: 'Cool'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
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
        confirmButtonText: 'Cool'
      })
    }
  }
}