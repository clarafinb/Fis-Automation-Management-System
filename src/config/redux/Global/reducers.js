import * as actionType from "./actionType";

let initialState = {
    sidebarShow: false,
    user: {},
};

const Global = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: {
                    ...payload
                }
            };
            
        case actionType.RESET_USER:
            return {
                ...state,
                user: {}
            }

        case actionType.SET_SIDEBAR:
            return { 
                ...state, 
                ...payload
            }

        default:
            return { ...state };
    }
};

export default Global;