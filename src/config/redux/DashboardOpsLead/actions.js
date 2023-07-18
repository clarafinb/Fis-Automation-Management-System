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
    API_GET_ACTIVITY_SUMMARY_WH_PROJECT
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