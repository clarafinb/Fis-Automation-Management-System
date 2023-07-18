import * as actionType from "./actionType"
import * as actionCrud from "../Global/actionCrud"
import Swal from "sweetalert2"
import {
    API_EXPORT_EXCEL_INBOUND_LOG_SUCCESS,
    API_GET_INBOUND_FILE,
    API_GET_INBOUND_LOG_ERROR,
    API_GET_INBOUND_LOG_SUCCESS,
    API_GET_INVENTORY_BOX,
    API_GET_INVENTORY_ITEM,
    API_GET_PROJECT,
    API_GET_TEMPLATE_UPLOAD_INBOUND,
    API_UPLOAD_INVENTORY_BOX,
    API_UPLOAD_INVENTORY_ITEM,
    API_GET_ACTIVITY_SUMMARY_WH_PROJECT,
    API_GET_ORDER_REQUEST,
    API_DELETE_ORDER_REQUEST,
    API_CANCEL_ORDER_REQUEST,
    API_GET_TYPE_DELIVERY_PROCESS,
    API_GET_ACTIVE_DEL,
    API_GET_TRANSPORT_TYPE_ACTIVE_ONLY,
    API_GET_PACKAGE_TYPE,
    API_ADD_ORDER_REQUEST,
    API_GET_TYPE_ROUTE,
    API_GET_ORIGIN_POINT
} from "../../api/index"

/**************************************** DASHBOARD OPS LEAD ****************************************/
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

export const setProject = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionType.SET_PROJECT,
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

export const getListOrderRequest = (projectId, whId, userId) => {
    return async (dispatch) => {
        try {
            const fullParam = `${projectId}/${whId}/${userId}`
            let list = await actionCrud.actionParamRequest(fullParam, API_GET_ORDER_REQUEST, "GET");
            let listOrdeRequest = list?.map((item, idx) => {
                return {
                    no: idx + 1,
                    orderReqId: item.orderReqId,
                    whName: item.whName,
                    whCode: item.whCode,
                    custOrderRequest: item.custOrderRequest,
                    orderRequestDesc: item.orderRequestDesc,
                    requestorName: item.requestorName,
                    orderRequestDate: item.orderRequestDate,
                    deliveryReqType: item.deliveryReqType,
                    transportReqType: item.transportReqType,
                    origin: item.origin,
                    destination: item.destination,
                    createBy: item.createBy,
                    createDate: item.createDate,
                    orderRequestStatus: item.orderRequestStatus,
                    cancelRemarks: item.cancelRemarks,
                    detail: {
                        ...item,
                        ...{
                            projectId: projectId,
                            whId: whId,
                            userId: whId
                        }
                    }
                }
            })
            dispatch({
                type: actionType.SET_LIST_ORDER_REQUEST,
                payload: listOrdeRequest
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

export const getSelectOriginPoin = (projectId, routeTypeId, whCode) => {
    return async () => {
      try {
        const fullParam = `${projectId}/${routeTypeId}/${whCode}`
        let list = await actionCrud.actionParamRequest(fullParam, API_GET_ORIGIN_POINT, "GET");
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

export const getSelecRouteType = (payload) => {
    return async () => {
      try {
        let list = await actionCrud.actionCommonSlice(payload, API_GET_TYPE_ROUTE, "GET");
        let data = list?.map((item, idx) => {
          return {
            label: item.routeType,
            value: item.routeTypeId
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


export const createOrderRequest = (payload) => {
    return async (dispatch) => {
      try {
        let create = await actionCrud.actionCommonCrud(payload, API_ADD_ORDER_REQUEST, "POST");
        if (create.status === "success") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: create?.message,
            showConfirmButton: true
          });
          dispatch(getListOrderRequest(payload.projectId, payload.whId, payload.LMBY));
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

export const deleteOrderRequest = (payload, projectId, whId) => {
    return async (dispatch) => {
        try {
            let create = await actionCrud.actionCommonCrud(payload, API_DELETE_ORDER_REQUEST, "PUT");
            if (create.status === "success") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: create?.message,
                    showConfirmButton: true
                });
                dispatch(getListOrderRequest(projectId, whId, payload.LMBY));
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

export const cancelOrderRequest = (payload, projectId, whId) => {
    return async (dispatch) => {
        try {
            let create = await actionCrud.actionCommonCrud(payload, API_CANCEL_ORDER_REQUEST, "PUT");
            if (create.status === "success") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: create?.message,
                    showConfirmButton: true
                });
                dispatch(getListOrderRequest(projectId, whId, payload.LMBY));
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

export const getSelectDeliveryProcess = (payload) => {
    return async () => {
        try {
            let list = await actionCrud.actionCommonCrud(payload, API_GET_TYPE_DELIVERY_PROCESS, "GET");
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

export const getSelectDeliveryType = (payload) => {
    return async () => {
        try {
            let list = await actionCrud.actionCommonCrud(payload, API_GET_ACTIVE_DEL, "GET");
            let data = list?.map((item, idx) => {
                return {
                    label: item.deliveryMode,
                    value: item.deliveryModeId
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

export const getSelectPackageType = () => {
    return async () => {
        try {
            let list = await actionCrud.actionCommonCrud(null, API_GET_PACKAGE_TYPE, "GET");
            let data = list?.map((item, idx) => {
                return {
                    label: item.packageName,
                    value: item.packageId
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

export const getInventoryItem = (whId) => {
    return async (dispatch) => {
        try {
            let list = await actionCrud.actionCommonSlice(whId, API_GET_INVENTORY_ITEM, "GET");
            let listInventoryItem = list?.map((item, idx) => {
                return {
                    no: idx + 1,
                    ...item,
                }
            })
            dispatch({
                type: actionType.SET_INVENTORY_ITEM,
                payload: listInventoryItem
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

export const getInventoryBox = (whId) => {
    return async (dispatch) => {
        try {
            let list = await actionCrud.actionCommonSlice(whId, API_GET_INVENTORY_BOX, "GET");
            let listInventoryBox = list?.map((item, idx) => {
                return {
                    no: idx + 1,
                    ...item,
                }
            })
            dispatch({
                type: actionType.SET_INVENTORY_BOX,
                payload: listInventoryBox
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

export const getInboundFileUploadSummary = (whId) => {
    return async (dispatch) => {
        try {
            let list = await actionCrud.actionCommonSlice(whId, API_GET_INBOUND_FILE, "GET");
            let listInboundFile = list?.map((item, idx) => {
                return {
                    no: idx + 1,
                    ...item,
                }
            })
            dispatch({
                type: actionType.SET_LIST_INBOUND_FILE,
                payload: listInboundFile
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

export const inboundErrLogExportToExcel = (inbFileId, fileName) => {
    return async (dispatch) => {
        try {
            const fullParam = `${inbFileId}/${fileName}`
            let data = await actionCrud.actionCommonSliceParamBlob(fullParam, API_GET_INBOUND_LOG_ERROR, "GET");
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
export const inboundTransactionSuccessExportToExcel = (whId, whCode) => {
    return async (dispatch) => {
        try {
            const fullParam = `${whId}/${whCode}`
            let data = await actionCrud.actionCommonSliceParamBlob(fullParam, API_EXPORT_EXCEL_INBOUND_LOG_SUCCESS, "GET");
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

export const getInboundTransactionSuccess = (whId) => {
    return async (dispatch) => {
        try {
            let list = await actionCrud.actionCommonSlice(whId, API_GET_INBOUND_LOG_SUCCESS, "GET");
            let listInboundLog = list?.map((item, idx) => {
                return {
                    no: idx + 1,
                    ...item,
                }
            })
            dispatch({
                type: actionType.SET_LIST_INBOUND_LOG,
                payload: listInboundLog
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
export const getMassUploadInboundTemplate = () => {
    return async (dispatch) => {
        try {
            let data = await actionCrud.actionCommonCrud(null, API_GET_TEMPLATE_UPLOAD_INBOUND, "GET");
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
export const inboundItemFileUpload = (formData, whId) => {
    return async (dispatch) => {
        try {
            const { value } = await actionCrud.actionCommonSliceParam(whId, API_UPLOAD_INVENTORY_ITEM, "POST", '', formData)
            dispatch(getInventoryItem(whId));
            dispatch(getInventoryBox(whId));
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
export const inboundBoxFileUpload = (formData, whId) => {
    return async (dispatch) => {
        try {
            const { value } = await actionCrud.actionCommonSliceParam(whId, API_UPLOAD_INVENTORY_BOX, "POST", '', formData)
            dispatch(getInventoryItem(whId));
            dispatch(getInventoryBox(whId));
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