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
  API_SET_INACTIVE_TRANSPORT
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