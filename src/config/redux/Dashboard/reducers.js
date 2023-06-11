import * as actionType from "./actionType";

let initialState = {

    listProject: [],
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

        default:
            return { ...state };
    }
};

export default Dashboard;