import * as actionType from "./actionType";

let initialState = {

    listProject: [],
    listServiceCharge: [],
    listDeliveryMode: [],
    listTransportMode: [],
    listTransportType: [],
    listUom: [],
    listWarehouse: [],
    listProjectServiceCharge: [],
    listSku: []

};

const Dashboard = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.SET_LIST_PROJECT:
            return {
                ...state,
                listProject: payload
            };

        case actionType.RESET_LIST_PROJECT:
            return {
                ...state,
                listProject: []
            }

        case actionType.SET_LIST_SERVICE_CHARGE:
            return {
                ...state,
                listServiceCharge: payload
            };

        case actionType.SET_LIST_DELIVERY_MODE:
            return {
                ...state,
                listDeliveryMode: payload
            };

        case actionType.SET_LIST_TRANSPORT_MODE:
            return {
                ...state,
                listTransportMode: payload
            };

        case actionType.SET_LIST_TRANSPORT_TYPE:
            return {
                ...state,
                listTransportType: payload
            };

        case actionType.SET_LIST_UOM:
            return {
                ...state,
                listUom: payload
            };

        case actionType.SET_LIST_WAREHOUSE:
            return {
                ...state,
                listWarehouse: payload
            };

        case actionType.SET_LIST_PROJECT_SERVICE_CHARGE:
            return {
                ...state,
                listProjectServiceCharge: payload
            };

        case actionType.SET_LIST_SKU:
            return {
                ...state,
                listSku: payload
            };

        default:
            return { ...state };
    }
};

export default Dashboard;