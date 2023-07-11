import * as actionType from "./actionType";

let initialState = {
    project: {}
};

const DashboardOpsLead = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.SET_PROJECT:
            return {
                ...state,
                project: payload
            };

        default:
            return { ...state };
    }
};

export default DashboardOpsLead;