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
  API_ADD_UOM
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
        if(response.status === "success"){
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
        if(createProject.status === "success"){
          Swal.fire({
            position: "center",
            icon: "success",
            title: createProject?.message,
            showConfirmButton: true
          });

          dispatch(getListProject());
        }else{
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

export const setStatusActiveProject = (val,projectId) => {
  return async (dispatch) => {
    try {

        let url = API_SET_INACTIVE_PROJECT
        if(val){
          url = API_SET_ACTIVE_PROJECT
        }

        let response = await actionCrud.actionCommonSlice(projectId, url, "PUT");
        if(response.status === "success"){
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

        let listServiceCharge = list?.map((item,idx) => {
          return {
            no: idx + 1,
            serviceCharge: item.serviceCharge,
            serviceChargeCode: item.serviceChargeCode,
            uom:item.uom,
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
        if(create.status === "success"){
          Swal.fire({
            position: "center",
            icon: "success",
            title: create?.message,
            showConfirmButton: true
          });

          dispatch(getListServiceCharge());
        }else{
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

export const setStatusActiveServiceCharge = (val,serviceChargeId) => {
  return async (dispatch) => {
    try {

        let url = API_SET_INACTIVE_SC
        if(val){
          url = API_SET_ACTIVE_SC
        }

        let response = await actionCrud.actionCommonSlice(serviceChargeId, url, "PUT");
        if(response.status === "success"){
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

        let listDelivery = list?.map((item,idx) => {
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

export const setStatusActiveDelivery = (val,delModeId) => {
  return async (dispatch) => {
    try {

        let url = API_SET_INACTIVE_DEL
        if(val){
          url = API_SET_ACTIVE_DEL
        }

        let response = await actionCrud.actionCommonSlice(delModeId, url, "PUT");
        if(response.status === "success"){
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

        let listTransport = list?.map((item,idx) => {
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

export const setStatusActiveTransport = (val,transportModeId) => {
  return async (dispatch) => {
    try {

        let url = API_SET_INACTIVE_TRANSPORT
        if(val){
          url = API_SET_ACTIVE_TRANSPORT
        }

        let response = await actionCrud.actionCommonSlice(transportModeId, url, "PUT");
        if(response.status === "success"){
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
        let listTransportType = list?.map((item,idx) => {
          return {
            no: idx + 1,
            transportType: item.transportName,
            transportMode: item.transportMode,
            createName: item.createName,
            createDate:item.createDate,
            modifiedBy:item.modifiedBy,
            modifiedDate:item.modifiedDate,
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

export const setStatusActiveTransportType = (val,transportTypeId) => {
  return async (dispatch) => {
    try {

        let url = API_SET_INACTIVE_TRANSPORT_TYPE
        if(val){
          url = API_SET_ACTIVE_TRANSPORT_TYPE
        }

        let response = await actionCrud.actionCommonSlice(transportTypeId, url, "PUT");
        if(response.status === "success"){
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
        let listTransport = list?.map((item,idx) => {
          return {
            label: item.transportMode,
            value: item.transportModeId
          }
        })
        return Promise.resolve(['Please Select..',...listTransport])
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
        if(create.status === "success"){
          Swal.fire({
            position: "center",
            icon: "success",
            title: create?.message,
            showConfirmButton: true
          });
          dispatch(getListTransportType());
        }else{
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
        if(create.status === "success"){
          Swal.fire({
            position: "center",
            icon: "success",
            title: create?.message,
            showConfirmButton: true
          });
          dispatch(getListUom());
        }else{
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
        let listUom = list?.map((item,idx) => {
          return {
            no: idx + 1,
            uom: item.uom,
            modifiedBy: item.modifiedBy,
            modifiedDate: item.modifiedDate,
            status:item.isActive,
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

export const setStatusUom = (val,uomId) => {
  return async (dispatch) => {
    try {

        let url = API_SET_INACTIVE_UOM
        if(val){
          url = API_SET_ACTIVE_UOM
        }

        let response = await actionCrud.actionCommonSlice(uomId, url, "PUT");
        if(response.status === "success"){
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
        let listUom = list?.map((item,idx) => {
          return {
            label: item.uom,
            value: item.uomId
          }
        })
        return Promise.resolve(['Please Select..',...listUom])
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