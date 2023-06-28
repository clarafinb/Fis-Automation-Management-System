import * as actionType from "./actionType";

let initialState = {
    sidebarShow: true,
    sidebarUnfoldable: false,
    user: {},
    listUserPhoto: []
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

        case actionType.SET_SIDEBAR_FOLDABLE:
            return { 
                ...state, 
                ...payload
            }
        
        case actionType.SET_LIST_USER_PHOTO:
            return {
                ...state,
                listUserPhoto: payload
            }

        default:
            return { ...state };
    }
};

export default Global;