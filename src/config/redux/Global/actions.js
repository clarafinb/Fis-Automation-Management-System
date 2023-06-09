import * as actionType from "./actionType";

/****************************************** GLOBAL *******************************************/
export const actionSetUser= (payload) => {
    return async (dispatch, getState) => {
      try {
        dispatch({
          type: actionType.SET_USER,
          payload: payload,
        });

      } catch (error) {
  
      }
    };
};

export const actionResetUser = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionType.RESET_USER,
        payload: {
          username: '',
        },
      });

    } catch (error) {

    }
  };
}