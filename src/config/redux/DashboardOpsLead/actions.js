import * as actionType from './actionType'
import * as actionCrud from '../Global/actionCrud'
import Swal from 'sweetalert2'
import {
  API_EXPORT_EXCEL_INBOUND_LOG_SUCCESS,
  API_GET_INBOUND_FILE,
  API_GET_INBOUND_LOG_ERROR,
  API_GET_INBOUND_LOG_SUCCESS,
  API_GET_INVENTORY_BOX,
  API_GET_INVENTORY_ITEM,
  API_GET_TEMPLATE_UPLOAD_INBOUND,
  API_GET_TEMPLATE_UPLOAD_INBOUND_BOX,
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
  API_GET_ORIGIN_POINT,
  API_GET_PICK_AND_PACK_PENDING,
  API_RESET_ORDER_REQUEST,
  API_UPLOAD_CUST_ORDER_REQ_TEIM,
  API_START_PICK_AND_PACK,
  API_GET_ORDER_REQUEST_DETAIL,
  API_GET_ORDER_REQUEST_ITEM_INVENTORY,
  API_GET_TEMPLATE_ORDER_REQUEST_ITEM,
  API_GET_ORDER_REQUEST_ITEM,
  API_GET_PICK_AND_PACK_PROGRESS,
  API_EXPORT_EXCEL_ORDER_REQUEST,
  API_GET_EVIDENCE_CHECKLIST,
  API_UPLOAD_EVIDENCE_CHECKLIST,
  API_COMPLETE_EVIDENCE_CHECKLIST,
  API_DELETE_EVIDENCE_CHECKLIST,
  API_GET_ORDER_REQUEST_TRANSPORT_ARRAGMENET,
  API_ADD_EVIDENCE_CHECKLIST,
  API_GET_DESTINATION_KEY_WH_PROJECT,
  API_GET_DELIVERY_PENDING,
  API_GET_DELIVERY_TRANSIT,
  API_GET_DELIVERY_COMPLETE,
  API_GET_MASTER_LOCATION,
  API_DELETE_MASTER_LOCATION,
  API_ADD_MASTER_LOCATION,
  API_GET_ROUTE_CATEGORY_ACTIVE,
  API_GET_HO_DOCUMENT,
  API_GET_TRANSPORT_ARRAGEMENT_TYPE,
  API_DELETE_TRANSPORT_ARRAGEMENT_TYPE,
  API_ADD_TRANSPORT_ARRAGEMENT_TYPE,
  API_GET_TRANSPORT_ARRAGEMENT_ADD_SERVICE_CHARGE_LIST,
  API_DELETE_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE,
  API_ADD_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE,
  API_TRANSPORT_ARRANGEMENT_COMPELETE,
  API_GET_TRANSPORT_ARRAGEMENT_TYPE_LIST,
  API_GET_DISPATCHER_BASE_TRANSPORT_ARRAGEMENT,
  API_GET_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE,
  API_GET_ORDER_REQUEST_ADDED_SERVICE_CHARGE,
  API_GET_ORDER_REQUEST_SERVICE_CHARGE,
  API_GET_DELIVERY_MODE_BASED_TRANSPORT_MODE,
  API_COMPLETE_PICK_AND_PACK,
  API_ADD_ORDER_REQUEST_SERVICE_CHARGE,
  API_DELETE_ADDITIONAL_SERVICE_PICK_AND_PACK,
  API_GET_TRANSPORT_ARRAGEMENT_DELIVERY,
  API_GET_TRANSPORT_ARRAGEMENT_ORDER_REQ,
  API_ADD_TRANSPORT_ARRAGEMENT,
  API_GET_DEL_BASE_ROUTE_TYPE,
  API_GET_ORDER_REQUEST_PICKUP,
  API_DELETE_ORDER_REQUEST_PICKUP,
  API_EXPORT_EXCEL_ORDER_REQUEST_PICKUP,
  API_CANCEL_ORDER_REQUEST_PICKUP,
  API_GET_ORDER_REQUEST_PICKUP_PREPARATION,
  API_COMPLETE_PICKUP_PREPARATION,
  API_GET_DELIVERY_ONSITE,
  API_GET_EVIDENCE_DELIVERY_ONSITE,
  API_UPLOAD_EVIDENCE_DELIVERY_ONSITE,
  API_DELETE_EVIDENCE_DELIVERY_ONSITE,
  API_CONFIRM_DELIVERY_ONSITE,
  API_GET_WAITING_TRANSPORT_ASSIGNMENT,
  API_GET_ACTIVITY_SUMMARY_WH_PROJECT_PICKUP,
  API_GET_RESERVED_STATUS_COMPLETE,
  API_EXPORT_EXCEL_ORDER_REQUEST_ITEM,
  API_GET_ORDER_REQUEST_ITEM_RESERVED,
  API_EXPORT_EXCEL_ORDER_REQUEST_ITEM_RESERVED,
  API_EXPORT_EXCEL_INBOUND_ITEM,
  API_EXPORT_EXCEL_INBOUND_BOX,
  API_EXPORT_EXCEL_OUTBOUND_SUCCESS_LOG,
  API_GET_OUTBOUND_TRANSACTION_SUCCESS,
  API_GET_STOCK_BOX_INVENTORY,
  API_ADD_BOX_REQUEST,
  API_GET_DETAIL_TRANSPORT_ARRANGMENT,
  API_GET_TRANSPORT_ARRANGMENT_ORDER_REQUEST,
  API_ADD_TRANSPORT_ARRAGEMENT_ORDER_REQUEST,
  API_DELETE_TRANSPORT_ARRAGEMENT_ORDER_REQUEST,
  API_CHANGE_MOVER,
  API_GET_WAITING_TRANSPORT_COMPLETE,
  API_GET_DISPATCHER_BASE_TRANSPORT_ARRAGEMENT_REASIGN,
  API_GET_ONSITE_PICKUPLIST,
  API_GET_HO_COMPLETE_LIST,
  API_EXPORT_DELIVERY_COMPLETE,
  API_GET_BTP,
  API_EXPORT_EXCEL_BTP,
  API_GET_PICKUP_TRANSIT,
  API_EXPORT_EXCEL_PICKUP_TRANSIT,
  API_GET_INVENTORY_ITEM_DETAIL,
  API_GET_INVENTORY_BOX_DETAIL,
  API_EXPORT_EXCEL_INVENTORY_ITEM_DETAIL,
  API_EXPORT_EXCEL_INVENTORY_BOX_DETAIL,
  API_GET_FINAL_CONFIRM,
  API_GET_FINAL_CONFIRM_TRANSPORT_DELIVERY,
  API_DELETE_FINAL_CONFIRM_COST_TRANSPORT,
  API_DELETE_FINAL_CONFIRM_COST_TRANSPORT_FILE,
  API_GET_PROJECT_SERVICE_CHARGE_ACTIVE,
  API_ADD_FINAL_CONFIRM_COST_TRANSPORT,
  API_SUBMIT_FINAL_CONFIRM,
  API_UPLOAD_FINAL_CONFIRM_COST_TRANSPORT_FILE,
  API_GET_FINAL_CONFIRM_WH_COST,
  API_GET_FINAL_COMPLETE,
  API_GET_FINAL_COMPLETE_ORDER_REQUEST,
  API_GET_FINAL_COMPLETE_COST_TRANSPORT,
  API_GET_FINAL_COMPLETE_WH_COST,
  API_GET_ORDER_REQUEST_BULK,
  API_GET_ORDER_REQUEST_BULK_TEMPLATE,
  API_GET_DELIVERY_PROCESS_TYPE_PACKAGE_PROCESS,
  API_GET_ROUTE_TYPE_PACKAGE_PROCESS,
  API_GET_PICKUP_DONE,
  API_COMPLETE_PICKUP_DONE,
} from '../../api/index'

/**************************************** DASHBOARD OPS LEAD ****************************************/
export const getActivitySummaryWHProject = (userId, projectId, type) => {
  return async () => {
    try {
      let resultData = []

      if (type === 'dashboardopsleaddelivery') {
        resultData = await actionCrud.actionCommonSlice(
          projectId,
          API_GET_ACTIVITY_SUMMARY_WH_PROJECT,
          'GET',
          userId,
        )

      } else {
        resultData = await actionCrud.actionCommonSlice(
          projectId,
          API_GET_ACTIVITY_SUMMARY_WH_PROJECT_PICKUP,
          'GET',
          userId,
        )
      }

      const result = resultData?.map((row, index) => {
        return {
          ...row,
          projectId: projectId,
        }
      })
      return Promise.resolve(result)

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const setProject = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionType.SET_PROJECT,
        payload: payload,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListOrderRequest = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_ORDER_REQUEST, 'GET')
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
              userId: whId,
            },
          },
        }
      })
      dispatch({
        type: actionType.SET_LIST_ORDER_REQUEST,
        payload: listOrdeRequest,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getSelectOriginPoin = (projectId, routeTypeId, whCode) => {
  return async () => {
    try {
      const fullParam = `${projectId}/${routeTypeId}/${whCode}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_ORIGIN_POINT, 'GET')
      let data = list?.map((item, idx) => {
        return {
          label: item.point_code,
          value: item.point_code_id,
          address: item.address,
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getSelecRouteType = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_TYPE_ROUTE, 'GET')
      let data = list?.map((item) => {
        return {
          label: item.routeType,
          value: item.routeTypeId,
          ...item,
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const createOrderRequest = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_ORDER_REQUEST, 'POST')
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getListOrderRequest(payload.projectId, payload.whId, payload.LMBY))
        return Promise.resolve(create.status)
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const deleteOrderRequest = (payload, projectId, whId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_DELETE_ORDER_REQUEST, 'PUT')
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getListOrderRequest(projectId, whId, payload.LMBY))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const cancelOrderRequest = (payload, projectId, whId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_CANCEL_ORDER_REQUEST, 'PUT')
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getListOrderRequest(projectId, whId, payload.LMBY))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getSelectDeliveryProcess = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_TYPE_DELIVERY_PROCESS, 'GET')
      let data = list?.map((item, idx) => {
        return {
          label: item.processName,
          value: item.packageProcessId,
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getSelectDeliveryType = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_DEL_BASE_ROUTE_TYPE, 'GET')
      let data = list?.map((item, idx) => {
        return {
          label: item.deliveryMode,
          value: item.deliveryModeId,
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getSelecTransportType = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(
        payload,
        API_GET_TRANSPORT_TYPE_ACTIVE_ONLY,
        'GET',
      )
      let data = list?.map((item, idx) => {
        return {
          label: item.transportMode + '-' + item.transportName,
          value: item.transportTypeId,
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getSelectPackageType = () => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(null, API_GET_PACKAGE_TYPE, 'GET')
      let data = list?.map((item, idx) => {
        return {
          label: item.packageName,
          value: item.packageId,
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListPickAndPackPending = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_PICK_AND_PACK_PENDING,
        'GET',
      )
      let listPickAndPackPending = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId,
            },
          },
        }
      })
      dispatch({
        type: actionType.SET_LIST_PICK_AND_PACK_PENDING,
        payload: listPickAndPackPending,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const startPickAndPack = (payload, projectId, whId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_START_PICK_AND_PACK, 'PUT')
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getListPickAndPackPending(projectId, whId, payload.LMBY))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const resetPickAndPack = (orderReqId, projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonSlice(orderReqId, API_RESET_ORDER_REQUEST, 'DELETE')
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getListPickAndPackPending(projectId, whId, userId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const uploadOrderReqItem = (formData, orderReqId, projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const { value } = await actionCrud.actionCommonSliceParam(
        orderReqId,
        API_UPLOAD_CUST_ORDER_REQ_TEIM,
        'POST',
        '',
        formData,
      )
      dispatch(getListPickAndPackPending(projectId, whId, userId))
      Swal.fire({
        title: value.status,
        text: value.message,
        icon: 'success',
        confirmButtonText: 'Yes',
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getOrderRequestDetail = (orderReqId) => {
  return async () => {
    try {
      let data = await actionCrud.actionParamRequest(
        orderReqId,
        API_GET_ORDER_REQUEST_DETAIL,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const resetPickAndPackprogress = (orderReqId) => {
  return async () => {
    try {
      let create = await actionCrud.actionCommonSlice(orderReqId, API_RESET_ORDER_REQUEST, 'DELETE')
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getOrderRequestItemListWithInventory = (orderReqId, whId, inboundType) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderReqId}/${whId}/${inboundType}`
      let list = await actionCrud.actionCommonSliceParam(
        fullParam,
        API_GET_ORDER_REQUEST_ITEM_INVENTORY,
        'GET',
      )
      let listOrderReqItemWithInventory = list?.map((item, idx) => {
        return {
          no: idx + 1,
          whTypeDescription: item.typeDescription,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_ORDER_REQ_ITEM_WITH_IVENTORY,
        payload: listOrderReqItemWithInventory,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getMassUploadTemplateOrderReqItemBulkUpload = () => {
  return async () => {
    try {
      let data = await actionCrud.actionParamRequest('', API_GET_TEMPLATE_ORDER_REQUEST_ITEM, 'GET')
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const uploadOrderReqItemPickAndPackProgress = (formData, orderReqId) => {
  return async (dispatch) => {
    try {
      const { value } = await actionCrud.actionCommonSliceParam(
        orderReqId,
        API_UPLOAD_CUST_ORDER_REQ_TEIM,
        'POST',
        '',
        formData,
      )
      Swal.fire({
        title: value.status,
        text: value.message,
        icon: 'success',
        confirmButtonText: 'Yes',
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getOrderRequestItemList = (orderRequestId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderRequestId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_ORDER_REQUEST_ITEM, 'GET')
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      return Promise.resolve(result)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListPickAndPackProgress = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_PICK_AND_PACK_PROGRESS,
        'GET',
      )
      let listPickAndPackProgress = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId,
            },
          },
        }
      })
      dispatch({
        type: actionType.SET_LIST_PICK_AND_PACK_PROGRESS,
        payload: listPickAndPackProgress,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const getInventoryItem = (whId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(whId, API_GET_INVENTORY_ITEM, 'GET')
      let listInventoryItem = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_INVENTORY_ITEM,
        payload: listInventoryItem,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getInventoryBox = (whId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(whId, API_GET_INVENTORY_BOX, 'GET')
      let listInventoryBox = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_INVENTORY_BOX,
        payload: listInventoryBox,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getInboundFileUploadSummary = (whId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(whId, API_GET_INBOUND_FILE, 'GET')
      let listInboundFile = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_INBOUND_FILE,
        payload: listInboundFile,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const inboundErrLogExportToExcel = (inbFileId, fileName) => {
  return async (dispatch) => {
    try {
      const fullParam = `${inbFileId}/${fileName}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_GET_INBOUND_LOG_ERROR,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const inboundTransactionSuccessExportToExcel = (whId, whCode) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_INBOUND_LOG_SUCCESS,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getInboundTransactionSuccess = (whId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(whId, API_GET_INBOUND_LOG_SUCCESS, 'GET')
      let listInboundLog = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_INBOUND_LOG,
        payload: listInboundLog,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const getMassUploadInboundTemplate = (type = 'item') => {
  return async (dispatch) => {
    try {
      let url = (type === 'box') ?
        API_GET_TEMPLATE_UPLOAD_INBOUND_BOX :
        API_GET_TEMPLATE_UPLOAD_INBOUND
      let data = await actionCrud.actionCommonCrud(null, url, 'GET')
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const inboundItemFileUpload = (formData, whId) => {
  return async (dispatch) => {
    try {
      const { value } = await actionCrud.actionCommonSliceParam(
        whId,
        API_UPLOAD_INVENTORY_ITEM,
        'POST',
        '',
        formData,
      )
      dispatch(getInventoryItem(whId))
      dispatch(getInventoryBox(whId))
      Swal.fire({
        title: value.status,
        text: value.message,
        icon: 'success',
        confirmButtonText: 'Yes',
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const inboundBoxFileUpload = (formData, whId) => {
  return async (dispatch) => {
    try {
      const { value } = await actionCrud.actionCommonSliceParam(
        whId,
        API_UPLOAD_INVENTORY_BOX,
        'POST',
        '',
        formData,
      )
      dispatch(getInventoryItem(whId))
      dispatch(getInventoryBox(whId))
      Swal.fire({
        title: value.status,
        text: value.message,
        icon: 'success',
        confirmButtonText: 'Yes',
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const getOrderRequestTransportArrangment = (transportArrangementId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}`
      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_ORDER_REQUEST_TRANSPORT_ARRAGMENET,
        'GET',
      )
      let listRequestTransportArragement = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_REQUEST_TRANSPORT_ARRANGEMENT,
        payload: listRequestTransportArragement,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const getOrderRequestWHProjectExportToExcel = ({ projectId, whId, userId, whCode }) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_ORDER_REQUEST,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getOrderRequestInTransitPickupExportToExcel = ({ projectId, whId, userId, whCode }) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_PICKUP_TRANSIT,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getDeliveryCompletedWHProjectExportToExcel = ({ projectId, whId, userId, whCode }) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_DELIVERY_COMPLETE,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}


export const getDeliveryBTPWHProjectExportToExcel = ({ projectId, whId, userId, whCode }) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_BTP,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const getTransportArrangementEvidenceCheclist = (transportArrangementId, orderRequestId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}/${orderRequestId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_EVIDENCE_CHECKLIST, 'GET')
      let listEvidenceChecklist = list?.map((item, idx) => {
        return {
          no: idx + 1,
          uploadStatus: item.getEvidenceChecklists.length > 0 ? true : false,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_EVIDENCE_CHECKLIST,
        payload: listEvidenceChecklist,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const transportAssignmentDeliveryEvidenceUpload = (
  { transportArrangementId, assignmentId, deliveryEvidenceChecklistId, orderReqId },
  body,
) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}/${assignmentId}/${deliveryEvidenceChecklistId}/${orderReqId}`
      let response = await actionCrud.actionParamRequest(
        fullParam,
        API_UPLOAD_EVIDENCE_CHECKLIST,
        'POST',
        body,
      )
      dispatch(getTransportArrangementEvidenceCheclist(transportArrangementId, orderReqId))
      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const actDeliveryCompleteWithoutAssignment = (payload, orderReqId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(
        payload,
        API_COMPLETE_EVIDENCE_CHECKLIST,
        'POST',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getTransportArrangementEvidenceCheclist(payload.transportArrangmentId, orderReqId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const transportArrangementTransportTypeDelete = (transportArrangementId) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonCrud(
        transportArrangementId,
        API_DELETE_EVIDENCE_CHECKLIST,
        'DELETE',
      )
      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
        dispatch(getTransportArrangementEvidenceCheclist(transportArrangementId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const transportArrangementCreateEvidence = (payload) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonCrud(payload, API_ADD_EVIDENCE_CHECKLIST, 'POST')
      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
        dispatch(
          getTransportArrangementEvidenceCheclist(
            payload.transportArrangementId,
            payload.orderReqId,
          ),
        )
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const getDestinationKeyWHProject = ({ projectId, routeTypeId, whCode }) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${routeTypeId}/${whCode}`
      let list = await actionCrud.actionCommonSliceParam(
        fullParam,
        API_GET_DESTINATION_KEY_WH_PROJECT,
        'GET',
      )
      let data = list?.map((item) => {
        return {
          label: item.point_code,
          value: item.point_code_id,
          ...item,
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListDeliveryPending = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_DELIVERY_PENDING, 'GET')
      let listDeliveryPending = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId,
            },
          },
        }
      })
      dispatch({
        type: actionType.SET_LIST_DELIVERY_PENDING,
        payload: listDeliveryPending,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListDeliveryTransit = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_DELIVERY_TRANSIT, 'GET')
      let listDeliveryTransit = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId,
            },
          },
        }
      })
      dispatch({
        type: actionType.SET_LIST_DELIVERY_TRANSIT,
        payload: listDeliveryTransit,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListDeliveryComplete = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_DELIVERY_COMPLETE, 'GET')
      let listDeliveryComplete = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId,
            },
          },
        }
      })
      dispatch({
        type: actionType.SET_LIST_DELIVERY_COMPLETE,
        payload: listDeliveryComplete,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListMasterLocation = (projectId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_MASTER_LOCATION, 'GET')
      let listMasterLocation = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_MASTER_LOCATION,
        payload: listMasterLocation,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const deleteMasterLocation = (pointCodeId, userId, projectId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${pointCodeId}/${userId}`
      let response = await actionCrud.actionParamRequest(
        fullParam,
        API_DELETE_MASTER_LOCATION,
        'PUT',
      )
      if (response.status === 'success') {
        dispatch(getListMasterLocation(projectId))
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const createMasterLocation = (payload) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonCrud(payload, API_ADD_MASTER_LOCATION, 'POST')
      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
        dispatch(getListMasterLocation(payload.projectId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getSelecRouteCategory = (payload) => {
  return async () => {
    try {
      let list = await actionCrud.actionCommonCrud(payload, API_GET_ROUTE_CATEGORY_ACTIVE, 'GET')
      let listRouteCategory = list?.map((item, idx) => {
        return {
          label: item.routeCategoryName,
          value: item.routeTypeCode,
        }
      })
      return Promise.resolve(listRouteCategory)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListHoDocument = (orderReqId) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSliceParam(orderReqId, API_GET_HO_DOCUMENT, 'GET')
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
        payload: listHoDocument,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getTransportTypeArranged = (transportArrangementId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}`
      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_TRANSPORT_ARRAGEMENT_TYPE,
        'GET',
      )
      let listTransportArrangmentType = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_TRANSPORT_ARRANGEMENT_TYPE,
        payload: listTransportArrangmentType,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const deleteTransportType = (transportTypeArrangementId, transportArrangementId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonSlice(
        transportTypeArrangementId,
        API_DELETE_TRANSPORT_ARRAGEMENT_TYPE,
        'DELETE',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getTransportTypeArranged(transportArrangementId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const addTransportArrangmentType = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(
        payload,
        API_ADD_TRANSPORT_ARRAGEMENT_TYPE,
        'POST',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getTransportTypeArranged(payload.transportArrangmentId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getTransportArrangmentServiceChargeList = (transportArrangementId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}`
      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_TRANSPORT_ARRAGEMENT_ADD_SERVICE_CHARGE_LIST,
        'GET',
      )
      let listTransportArrangmentServiceCode = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_TRANSPORT_ARRANGEMENT_SC,
        payload: listTransportArrangmentServiceCode,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const addTransportArrangmentServiceCharge = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(
        payload,
        API_ADD_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE,
        'POST',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getTransportArrangmentServiceChargeList(payload.transportArrangmentId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const deleteTransportArrangmentServiceCharge = (
  transportArrangementServiceId,
  lmby,
  transportArrangementId,
) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementServiceId}/${lmby}`
      let create = await actionCrud.actionCommonSlice(
        fullParam,
        API_DELETE_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE,
        'DELETE',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getTransportArrangmentServiceChargeList(transportArrangementId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const completeTransportArrangement = (transportArrangmentId, lmby) => {
  return async () => {
    try {
      const fullParam = `${transportArrangmentId}/${lmby}`
      let create = await actionCrud.actionCommonSlice(
        fullParam,
        API_TRANSPORT_ARRANGEMENT_COMPELETE,
        'PUT',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getTransportTypeList = (transportModeId) => {
  return async () => {
    try {
      const fullParam = `${transportModeId}`
      let list = await actionCrud.actionCommonSliceParam(
        fullParam,
        API_GET_TRANSPORT_ARRAGEMENT_TYPE_LIST,
        'GET',
      )
      let listTransportType = list?.map((item, idx) => {
        return {
          label: item.transportName,
          value: item.transportTypeId,
        }
      })
      return Promise.resolve(listTransportType)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getDispatcherReassignmentBasedOnTransportArrangement = (transportArrangementId, projectId, orderReqId) => {
  return async () => {
    try {
      const fullParam = `${transportArrangementId}/${projectId}/${orderReqId}`
      let list = await actionCrud.actionCommonSliceParam(
        fullParam,
        API_GET_DISPATCHER_BASE_TRANSPORT_ARRAGEMENT_REASIGN,
        'GET',
      )
      let listDispatcher = list?.map((item, idx) => {
        return {
          label: item.dispatcherName,
          value: item.usr_id,
          installationId: item.installationId,
        }
      })
      return Promise.resolve(listDispatcher)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const getDispatcherList = (transportArrangementId, projectId, orderReqId) => {
  return async () => {
    try {
      const fullParam = `${transportArrangementId}/${projectId}/${orderReqId}`
      let list = await actionCrud.actionCommonSliceParam(
        fullParam,
        API_GET_DISPATCHER_BASE_TRANSPORT_ARRAGEMENT,
        'GET',
      )
      let listDispatcher = list?.map((item, idx) => {
        return {
          label: item.dispatcherName,
          value: item.usr_id,
          installationId: item.installationId,
        }
      })
      return Promise.resolve(listDispatcher)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getServiceChargeList = (transportArrangementId, projectId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}/${projectId}`
      let list = await actionCrud.actionCommonSliceParam(
        fullParam,
        API_GET_TRANSPORT_ARRAGEMENT_SERVICE_CHARGE,
        'GET',
      )
      let listServiceChargeList = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_ORDER_REQUEST_ADDITIONAL_SERVICE,
        payload: listServiceChargeList,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getOrderRequestServiceCharge = (orderReqId) => {
  return async (dispatch) => {
    try {
      let data = await actionCrud.actionParamRequest(
        orderReqId,
        API_GET_ORDER_REQUEST_ADDED_SERVICE_CHARGE,
        'GET',
      )
      const listOrdeRequestAdditionalService = data.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              orderReqId: orderReqId,
            },
          },
        }
      })
      dispatch({
        type: actionType.SET_LIST_ORDER_REQUEST_ADDITIONAL_SERVICE,
        payload: listOrdeRequestAdditionalService,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getOrderRequestServiceChargeList = (projectid, orderReqId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectid}/${orderReqId}`
      let data = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_ORDER_REQUEST_SERVICE_CHARGE,
        'GET',
      )
      const result = data.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectid: projectid,
              orderReqId: orderReqId,
            },
          },
        }
      })
      return Promise.resolve(result)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getDeliveryRequestFinal = (transportModeId, orderReqId) => {
  return async () => {
    try {
      const fullParam = `${transportModeId}/${orderReqId}`
      let list = await actionCrud.actionCommonSliceParam(
        fullParam,
        API_GET_DELIVERY_MODE_BASED_TRANSPORT_MODE,
        'GET',
      )
      let listDeliveryFinal = list?.map((item, idx) => {
        return {
          label: item.deliveryMode,
          value: item.deliveryModeId,
        }
      })
      return Promise.resolve(listDeliveryFinal)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const pickandPackComplete = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_COMPLETE_PICK_AND_PACK, 'PUT')
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const addOrderRequestServiceCharge = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(
        payload,
        API_ADD_ORDER_REQUEST_SERVICE_CHARGE,
        'POST',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getOrderRequestServiceCharge(payload.orderReqId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const deleteAddServicePickPack = (orderReqId, payload) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionUpdateWithBody(
        API_DELETE_ADDITIONAL_SERVICE_PICK_AND_PACK,
        payload,
      )
      if (response.status === 'success') {
        dispatch(getOrderRequestServiceCharge(orderReqId))
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getTransportArragementLocation = (orderReqId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderReqId}`
      let data = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_TRANSPORT_ARRAGEMENT_DELIVERY,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getTransportArragementOrderReq = (orderReqId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderReqId}`
      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_TRANSPORT_ARRAGEMENT_ORDER_REQ,
        'GET',
      )
      let listTransportArragement = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_TRANSPORT_ARRAGEMENT,
        payload: listTransportArragement,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const addTransportArrangment = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(payload, API_ADD_TRANSPORT_ARRAGEMENT, 'POST')
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getTransportArragementOrderReq(payload.orderReqId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListOrderRequestPickup = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_ORDER_REQUEST_PICKUP, 'GET')
      let listOrdeRequestPickup = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          detail: {
            ...item,
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId,
            },
          },
        }
      })
      dispatch({
        type: actionType.SET_LIST_ORDER_REQUEST_PICKUP,
        payload: listOrdeRequestPickup,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const deleteOrderRequestPickup = (payload, projectId, whId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(
        payload,
        API_DELETE_ORDER_REQUEST_PICKUP,
        'PUT',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getListOrderRequestPickup(projectId, whId, payload.LMBY))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getOrderRequestPickupWHProjectExportToExcel = ({
  projectId,
  whId,
  userId,
  whCode,
}) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_ORDER_REQUEST_PICKUP,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const cancelOrderRequestPickup = (payload, projectId, whId) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(
        payload,
        API_CANCEL_ORDER_REQUEST_PICKUP,
        'PUT',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
        dispatch(getListOrderRequestPickup(projectId, whId, payload.LMBY))
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListPickupPreparation = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_ORDER_REQUEST_PICKUP_PREPARATION,
        'GET',
      )
      let listOrdeRequestPickup = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          detail: {
            ...item,
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId,
            },
          },
        }
      })
      dispatch({
        type: actionType.SET_LIST_PICKUP_PREPARATION,
        payload: listOrdeRequestPickup,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const pickupPreparationComplete = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(
        payload,
        API_COMPLETE_PICKUP_PREPARATION,
        'PUT',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
      return Promise.resolve(create.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListDeliveryOnSite = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_DELIVERY_ONSITE, 'GET')
      let listDeliveryOnSite = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
          extra: {
            ...{
              projectId: projectId,
              whId: whId,
              userId: whId,
            },
          },
        }
      })
      dispatch({
        type: actionType.SET_LIST_DELIVERY_ONSITE,
        payload: listDeliveryOnSite,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListDeliveryOnSiteEvidence = (orderReqId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderReqId}`
      let list = await actionCrud.actionCommonSlice(
        fullParam,
        API_GET_EVIDENCE_DELIVERY_ONSITE,
        'GET',
      )
      let listDeliveryOnSiteEvidence = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_DELIVERY_ONSITE_EVIDENCE,
        payload: listDeliveryOnSiteEvidence,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const uploadDeliveryOnsiteEvidence = (formData, orderReqId) => {
  return async (dispatch) => {
    try {
      const { value } = await actionCrud.actionCommonSliceParam(
        orderReqId,
        API_UPLOAD_EVIDENCE_DELIVERY_ONSITE,
        'POST',
        '',
        formData,
      )
      dispatch(getListDeliveryOnSiteEvidence(orderReqId))
      Swal.fire({
        title: value.status,
        text: value.message,
        icon: 'success',
        confirmButtonText: 'Yes',
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const deleteDeliveryOnsiteEvidence = (evidenceId, userId, orderReqId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${evidenceId}/${userId}`
      let response = await actionCrud.actionParamRequest(
        fullParam,
        API_DELETE_EVIDENCE_DELIVERY_ONSITE,
        'PUT',
      )
      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
        dispatch(getListDeliveryOnSiteEvidence(orderReqId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const confirmDeliveryOnSite = (payload, projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      let confirm = await actionCrud.actionCommonCrud(payload, API_CONFIRM_DELIVERY_ONSITE, 'PUT')
      if (confirm.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: confirm?.message,
          showConfirmButton: true,
        })
        dispatch(getListDeliveryOnSite(projectId, whId, userId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: confirm?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListWaitingTransportAssignment = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`
      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_WAITING_TRANSPORT_ASSIGNMENT,
        'GET',
      )
      let listOrdeRequest = list?.map((item, idx) => {
        return {
          no: idx + 1,
          projectId: projectId,
          whId: whId,
          userId: userId,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_WAITING_TRANSPORT_ASSIGNMENT,
        payload: listOrdeRequest,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getReservedStatusComplete = (orderReqId) => {
  return async () => {
    try {
      const fullParam = `${orderReqId}`
      const result = await actionCrud.actionParamRequest(fullParam, API_GET_RESERVED_STATUS_COMPLETE, 'GET')
      return Promise.resolve(result)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getDetailTransportArrangement = (transportArrangementId) => {
  return async () => {
    try {
      const fullParam = `${transportArrangementId}`
      const [result] = await actionCrud.actionParamRequest(fullParam, API_GET_DETAIL_TRANSPORT_ARRANGMENT, 'GET')
      return Promise.resolve(result)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const orderRequestItemExcel = (orderReqId, custOrderReqNo) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderReqId}/${custOrderReqNo}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_ORDER_REQUEST_ITEM,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const orderRequestItemReservedExcel = (orderReqId, custOrderReqNo) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderReqId}/${custOrderReqNo}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_ORDER_REQUEST_ITEM_RESERVED,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getItemReservedData = (orderRequestId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderRequestId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_ORDER_REQUEST_ITEM_RESERVED, 'GET')
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      return Promise.resolve(result)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getInventoryItemBaseSummaryExportToExcel = (whId, whCode) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_INBOUND_ITEM,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getInventoryBoxSummaryExportToExcel = (whId, whCode) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_INBOUND_BOX,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const outboundTransactionSuccessExportToExcel = (whId, whCode) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_OUTBOUND_SUCCESS_LOG,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getOutboundTransactionSuccess = (whId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}`
      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_OUTBOUND_TRANSACTION_SUCCESS,
        'GET'
      )
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_OUTBOUND,
        payload: result,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
export const getBoxRequest = (whId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}`
      let list = await actionCrud.actionParamRequest(fullParam, API_GET_STOCK_BOX_INVENTORY, 'GET')
      let result = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      return Promise.resolve(result)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}
// 
export const addBoxRequest = (payload) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonCrud(payload, API_ADD_BOX_REQUEST, 'POST')
      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
        // dispatch(getListMasterLocation(payload.projectId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
      return Promise.resolve(response)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getOrderRequestNeedGroupWithoutAssignmentYet = (
  orderReqId,
  deliveryModeId,
  whId
) => {
  return async (dispatch) => {
    try {
      const fullParam = `${orderReqId}/${deliveryModeId}/${whId}`
      let list = await actionCrud.actionCommonSlice(
        fullParam,
        API_GET_TRANSPORT_ARRANGMENT_ORDER_REQUEST,
        'GET',
      )
      let listTransportArragementOrderRequest = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })
      dispatch({
        type: actionType.SET_LIST_TRANSPORT_ARRAGEMENT_ORDER_REQUEST,
        payload: listTransportArragementOrderRequest,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const transportArrangementAddOrderRequest = (
  payload
) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonCrud(payload, API_ADD_TRANSPORT_ARRAGEMENT_ORDER_REQUEST, 'POST')
      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
        dispatch(getOrderRequestTransportArrangment(payload.transportArrangmentId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
      return Promise.resolve(response)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const transportArrangementDeleteOrderRequest = (
  payload
) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonCrud(payload, API_DELETE_TRANSPORT_ARRAGEMENT_ORDER_REQUEST, 'DELETE')
      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
        dispatch(getOrderRequestTransportArrangment(payload.transportArrangmentId))
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
      return Promise.resolve(response)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const transportArrangementChangeDispatcher = (payload) => {
  return async (dispatch) => {
    try {
      let create = await actionCrud.actionCommonCrud(
        payload,
        API_CHANGE_MOVER,
        'PUT',
      )
      if (create.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: create?.message,
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: create?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListWaitingTransportConfirm = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_WAITING_TRANSPORT_COMPLETE,
        'GET'
      )

      let getListWaitingTransportComplete = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_WAITING_TRANSPORT_COMPLETE,
        payload: getListWaitingTransportComplete,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListPickupOnsite = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_ONSITE_PICKUPLIST,
        'GET'
      )

      let getLitPickupOnsite = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_PICKUP_ONSITE,
        payload: getLitPickupOnsite,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListHoComplete = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_HO_COMPLETE_LIST,
        'GET'
      )

      let getListHoComplete = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_HO_COMPLETE,
        payload: getListHoComplete,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListBtp = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_BTP,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_BACK_TO_POOL,
        payload: getListData,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListPickupTransit = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_PICKUP_TRANSIT,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_PICKUP_TRANSIT,
        payload: getListData,
      })

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListInventoryDetailItem = (whId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_INVENTORY_ITEM_DETAIL,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_INVENTEORY_ITEM_DETAIL,
        payload: getListData,
      })

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListInventoryDetailBox = (whId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_INVENTORY_BOX_DETAIL,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_INVENTEORY_BOX_DETAIL,
        payload: getListData,
      })

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getInventoryItemBaseWithDetailSummaryExportToExcel = (whId, whCode) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_INVENTORY_ITEM_DETAIL,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getInventoryBoxWithDetailSummaryExportToExcel = (whId, whCode) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}/${whCode}`
      let data = await actionCrud.actionCommonSliceParamBlob(
        fullParam,
        API_EXPORT_EXCEL_INVENTORY_BOX_DETAIL,
        'GET',
      )
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListFinalConfirm = (whId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_FINAL_CONFIRM,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_FINAL_CONFIRM,
        payload: getListData,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListFinalConfirmCostTransportDelivery = (transportArrangmentId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangmentId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_FINAL_CONFIRM_TRANSPORT_DELIVERY,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_FINAL_CONFIRM_COST_TRANSPORT_DELIVERY,
        payload: getListData,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const transportArrangementDeleteFinalCostTransport = (transportArrangementCostId, userId) => {
  return async (dispatch) => {
    try {

      const fullParam = `${transportArrangementCostId}/${userId}`

      let response = await actionCrud.actionParamRequest(
        fullParam,
        API_DELETE_FINAL_CONFIRM_COST_TRANSPORT,
        'PUT'
      )

      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const transportArrangementFinalCostTransportDeleteAttachment = (transportArrangementAddCostAttachmentId, userId) => {
  return async (dispatch) => {
    try {

      const fullParam = `${transportArrangementAddCostAttachmentId}/${userId}`

      let response = await actionCrud.actionParamRequest(
        fullParam,
        API_DELETE_FINAL_CONFIRM_COST_TRANSPORT_FILE,
        'PUT'
      )

      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getProjectServiceChargeGetAllActiveOnly = (projectId) => {
  return async () => {
    try {
      const fullParam = `${projectId}`

      let list = await actionCrud.actionParamRequest(fullParam,
        API_GET_PROJECT_SERVICE_CHARGE_ACTIVE,
        'GET')

      let data = list?.map((item, idx) => {
        return {
          label: item.serviceCharge,
          value: item.projectServiceChargeId,
          extra: item
        }
      })

      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getSelectOrderRequestTransportArrangment = (transportArrangementId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}`
      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_ORDER_REQUEST_TRANSPORT_ARRAGMENET,
        'GET',
      )

      let data = list?.map((item, idx) => {
        return {
          label: item.orderReqNo,
          value: item.orderReqId,
          extra: item
        }
      })

      return Promise.resolve(data)

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const transportArrangementAddFinalCostTransport = (
  payload
) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonCrud(
        payload,
        API_ADD_FINAL_CONFIRM_COST_TRANSPORT,
        'POST'
      )

      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
        return true
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
      return Promise.resolve(response)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const transportArrangementFinalCostConfirmed = (
  transportArrangementId,
  userId
) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementId}/${userId}`
      let response = await actionCrud.actionCommonSliceParam(
        fullParam,
        API_SUBMIT_FINAL_CONFIRM,
        'PUT'
      )

      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
        return true
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
      return Promise.resolve(response)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const transportArrangementFinalCostTransportAddAttachment = (formData, transportArrangementCostId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangementCostId}/${userId}`
      const { status, message } = await actionCrud.actionCommonSliceParam(
        fullParam,
        API_UPLOAD_FINAL_CONFIRM_COST_TRANSPORT_FILE,
        'POST',
        '',
        formData,
      )
      Swal.fire({
        title: status,
        text: message,
        icon: 'success',
        confirmButtonText: 'Yes',
      })
      return status
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}


export const getListFinalConfirmWhCost = (transportArrangmentId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangmentId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_FINAL_CONFIRM_WH_COST,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_FINAL_CONFIRM_WH_COST,
        payload: getListData,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListFinalComplete = (whId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${whId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_FINAL_COMPLETE,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_FINAL_COMPLETE,
        payload: getListData,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListFinalCompleteOrderReq = (transportArrangmentId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangmentId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_FINAL_COMPLETE_ORDER_REQUEST,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_FINAL_COMPLETE_ORDER_REQ,
        payload: getListData,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListFinalCompleteCostTransportDelivery = (transportArrangmentId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangmentId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_FINAL_COMPLETE_COST_TRANSPORT,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_FINAL_COMPLETE_COST_TRANSPORT,
        payload: getListData,
      })

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListFinalCompleteWhCost = (transportArrangmentId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${transportArrangmentId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_FINAL_COMPLETE_WH_COST,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_FINAL_COMPLETE_WH_COST,
        payload: getListData,
      })

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListOrderRequestBulkDraft = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_ORDER_REQUEST_BULK,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_ORDER_REQUEST_BULK_DRAFT,
        payload: getListData,
      })

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getBulkOrderRequestDeliveryTemplate = () => {
  return async () => {
    try {
      let url = API_GET_ORDER_REQUEST_BULK_TEMPLATE
      let data = await actionCrud.actionCommonCrud(null, url, 'GET')
      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getSelectDeliveryProcessPackageProcess = (packageProcessId) => {
  return async () => {
    try {
      const fullParam = `${packageProcessId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_DELIVERY_PROCESS_TYPE_PACKAGE_PROCESS,
        'GET'
      )

      let data = list?.map((item, idx) => {
        return {
          label: item.processName,
          value: item.packageProcessId,
        }
      })

      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getSelecRouteTypePackageProcess = (packageProcessId) => {
  return async () => {
    try {
      const fullParam = `${packageProcessId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_ROUTE_TYPE_PACKAGE_PROCESS,
        'GET'
      )

      let data = list?.map((item, idx) => {
        return {
          label: item.routeType,
          value: item.routeTypeId,
        }
      })

      return Promise.resolve(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const getListPickupDone = (projectId, whId, userId) => {
  return async (dispatch) => {
    try {
      const fullParam = `${projectId}/${whId}/${userId}`

      let list = await actionCrud.actionParamRequest(
        fullParam,
        API_GET_PICKUP_DONE,
        'GET'
      )

      let getListData = list?.map((item, idx) => {
        return {
          no: idx + 1,
          ...item,
        }
      })

      dispatch({
        type: actionType.SET_LIST_PICKUP_DONE,
        payload: getListData,
      })

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}

export const completePickupDone = (
  payload
) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonCrud(
        payload,
        API_COMPLETE_PICKUP_DONE,
        'PUT'
      )

      if (response.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message,
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: response?.message,
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
      return Promise.resolve(response.status)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
}