import * as actionType from "./actionType";

let initialState = {

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

        default:
            return { ...state };
    }
};

export default Global;