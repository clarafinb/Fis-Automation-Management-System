import * as actionType from "./actionType"
import * as actionCrud from "./actionCrud"
import { API_AUTH_LOGIN, API_GET_DATA_LOGIN } from "../../api/index"
import { setGlobalToken, removeGlobalToken } from "../../../helper/globalToken"
import Swal from "sweetalert2";

/****************************************** GLOBAL *******************************************/
export const actionLogin = (payload) => {
  return async (dispatch) => {
    try {
      let result = await actionCrud.actionLogin(payload, API_AUTH_LOGIN, "GET");

      if(result.message){
        let token = result.message

        setGlobalToken(token)

        let dataLogin = await actionCrud.actionCommonCrud(token, API_GET_DATA_LOGIN, "GET");

        if(dataLogin.data){

          dataLogin.data.token = token
          dispatch({
            type: actionType.SET_USER,
            payload: dataLogin.data,
          });

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1000,
          });
        }
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

export const actionSetReduxUser = (payload) => {
  return async (dispatch) => {
    try {
      setGlobalToken(payload.token)

      dispatch({
        type: actionType.SET_USER,
        payload: payload,
      })
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

export const actionResetUser = () => {
  return async (dispatch, getState) => {
    try {
      removeGlobalToken();

      dispatch({
        type: actionType.RESET_USER
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
}

export const actionGetGeocode = (address) => {
  return async (dispatch, getState) => {
    try {
      let data = await actionCrud.actionGeocode(address)

      return Promise.resolve(data)

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  };
}