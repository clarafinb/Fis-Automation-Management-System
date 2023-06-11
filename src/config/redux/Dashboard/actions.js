import * as actionType from "./actionType"
import * as actionCrud from "../Global/actionCrud"
import { API_GET_PROJECT, API_ADD_PROJECT, API_SET_INACTIVE, API_SET_ACTIVE, API_SET_PUBLISH } from "../../api/index"
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

export const setPublished = (projectId) => {
  return async (dispatch) => {
    try {

        let response = await actionCrud.actionCommonSlice(projectId, API_SET_PUBLISH, "PUT");
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

export const setActive = (projectId) => {
  return async (dispatch) => {
    try {

        let response = await actionCrud.actionCommonSlice(projectId, API_SET_ACTIVE, "PUT");
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

export const setUnActive = (projectId) => {
  return async (dispatch) => {
    try {

        let response = await actionCrud.actionCommonSlice(projectId, API_SET_INACTIVE, "PUT");
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