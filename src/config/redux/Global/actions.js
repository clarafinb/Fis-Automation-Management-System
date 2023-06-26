import * as actionType from "./actionType"
import * as actionCrud from "./actionCrud"
import {
  API_AUTH_LOGIN,
  API_GET_DATA_LOGIN,
  API_ADD_PHOTO_USER,
  API_GET_USER_ACTIVE_PHOTO,
  API_GET_USER_PHOTO,
  API_DELETE_USER_PHOTO,
  API_SET_USER_PHOTO_ACTIVE,
  API_SET_USER_PHOTO_INACTIVE,
  API_GET_DETAIL_USER_ACCOUNT,

} from "../../api/index"
import { setGlobalToken, removeGlobalToken } from "../../../helper/globalToken"
import Swal from "sweetalert2";

/****************************************** GLOBAL *******************************************/
export const actionLogin = (payload) => {
  return async (dispatch) => {
    try {
      let result = await actionCrud.actionLogin(payload, API_AUTH_LOGIN, "GET");

      if (result.message) {
        let token = result.message

        setGlobalToken(token)

        let dataLogin = await actionCrud.actionCommonCrud(token, API_GET_DATA_LOGIN, "GET");

        if (dataLogin.data) {

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

export const getDetailProfile = (userId) => {
  return async () => {
    try {
      const [data] = await actionCrud.actionCommonSlice(userId, API_GET_DETAIL_USER_ACCOUNT, "GET");
      return Promise.resolve(data)
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

export const getUserActivePhoto = (userId) => {
  return async () => {
    try {
      const { photoPath } = await actionCrud.actionCommonSlice(userId, API_GET_USER_ACTIVE_PHOTO, "GET");
      return Promise.resolve(photoPath || null)
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
export const getListUserPhoto = (payload) => {
  return async (dispatch) => {
    try {
      let list = await actionCrud.actionCommonSlice(payload, API_GET_USER_PHOTO, "GET");
      let listUserPhoto = list?.map((item, idx) => {
        return {
          no: idx + 1,
          photoId: item.photoId,
          photoPath: item.photoPath,
          IsActive: item.IsActive,
          detail: { ...item }
        }
      })
      dispatch({
        type: actionType.SET_LIST_USER_PHOTO,
        payload: listUserPhoto
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

export const setStatusPhoto = (photoId, userId) => {
  return async (dispatch) => {
    try {
      let response = await actionCrud.actionCommonSlice(photoId, API_DELETE_USER_PHOTO, "DELETE");
      if (response.status === "success") {
        dispatch(getListUserPhoto(userId));
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

export const setStatusActivePhoto = (val, photoId, userId) => {
  return async (dispatch) => {
    try {

      let url = API_SET_USER_PHOTO_INACTIVE
      if (val) {
        url = API_SET_USER_PHOTO_ACTIVE
      }

      let response = await actionCrud.actionCommonSlice(photoId, url, "PUT", userId);
      if (response.status === "success") {
        dispatch(getListUserPhoto(userId));
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

export const addNewPhotoUser = (formData, userId) => {
  return async (dispatch, getState) => {
    try {
      const { status, message } = await actionCrud.actionCommonSliceParam(userId, API_ADD_PHOTO_USER, "POST", '', formData)
      dispatch(getListUserPhoto(userId));
      Swal.fire({
        title: status,
        text: message,
        icon: "success",
        confirmButtonText: "Yes",
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

