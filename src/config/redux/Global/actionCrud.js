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

          if (typeData === "params") { objAxios.params = payload }
          else { objAxios.data = payload }

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

export async function actionCommonSlice(param1, url, method = "GET", param2 = "") {
     try {

          let param = param2 ? `${url}/${param1}/${param2}` : `${url}/${param1}`

          let objAxios = {
               method: `${method}`,
               url: `${param}`,
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

export async function actionCommonSliceParam(param1, url, method = "GET", param2 = "", body) {
     try {
          let param = param2 ? `${url}/${param1}/${param2}` : `${url}/${param1}`

          let objAxios = {
               method: `${method}`,
               url: `${param}`,
               data: body
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


export async function actionGeocode(address) {
     try {
          let url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`

          let objAxios = {
               method: "GET",
               url: url,
          }

          let { data } = await axios(objAxios);

          return data[0]

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

export async function actionParamRequest(fullParam, url, method = "GET", body) {
     try {
          let objAxios = {
               method: `${method}`,
               url: fullParam ? `${url}/${fullParam}` : url,
               data: body
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

export async function actionUpdateWithBody(url, body, method = "PUT") {
     try {
          let objAxios = {
               method: `${method}`,
               url: `${url}`,
               data: body
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

export async function actionCommonSliceParamBlob(param1, url, method = "GET", param2 = "", body) {
     try {

          let param = url
          if (param1) {
               param = param2 ? `${url}/${param1}/${param2}` : `${url}/${param1}`
          }

          let objAxios = {
               method: `${method}`,
               url: `${param}`,
               responseType: 'blob', // important
               data: body
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