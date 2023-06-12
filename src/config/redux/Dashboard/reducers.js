import * as actionType from "./actionType";

let initialState = {

    listProject: [],
    listServiceCharge: [],
    listDeliveryMode: [],
    listTransportMode: []

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
            

        default:
            return { ...state };
    }
};

export default Dashboard;