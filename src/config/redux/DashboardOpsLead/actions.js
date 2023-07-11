import * as actionType from "./actionType"
import * as actionCrud from "../Global/actionCrud"
import Swal from "sweetalert2"
import {
    API_GET_PROJECT
} from "../../api/index"

/**************************************** DASHBOARD OPS LEAD ****************************************/

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