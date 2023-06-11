import axios from "axios";
import Swal from "sweetalert2";

export async function actionLogin(payload, url, method = "GET") {
    try {
         let objAxios = {
            method: `${method}`,
            url: `${url}`,
            auth: {
                username: payload.username,
                password: payload.password,
            },
         }

         let { data } = await axios(objAxios);

         return data;
    } catch (error) {
         Swal.fire({
              title: "Attention",
              text: error?.response?.data?.msg,
              icon: "warning",
              confirmButtonText: "Yes",
         });
         return Promise.reject(error)
    }
}

export async function actionCommonCrud(payload, url, method = "GET", typeData = "payload") {
    try {
         let objAxios = {
            method: `${method}`,
            url: `${url}`,
         }

         if(typeData === "params") { objAxios.params =  payload }
         else { objAxios.data =  payload }

         let { data } = await axios(objAxios);

         return data;
    } catch (error) {
         Swal.fire({
              title: "Attention",
              text: error?.response?.data?.msg,
              icon: "warning",
              confirmButtonText: "Yes",
         });
         return Promise.reject(error)
    }
}

export async function actionCommonSlice(payload, url, method = "GET") {
    try {

         let objAxios = {
            method: `${method}`,
            url: `${url}/${payload}`,
         }

         let { data } = await axios(objAxios);

         return data;
    } catch (error) {
         Swal.fire({
              title: "Attention",
              text: error?.response?.data?.msg,
              icon: "warning",
              confirmButtonText: "Yes",
         });
         return Promise.reject(error)
    }
}