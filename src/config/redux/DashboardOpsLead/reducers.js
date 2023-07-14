import * as actionType from "./actionType";

let initialState = {
    project: {},
    listInventoryItem: [],
    listInventoryBox: [],
    listInboundFile: [],
    listInboundLog: []
};

const DashboardOpsLead = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.SET_PROJECT:
            return {
                ...state,
                project: payload
            };

        case actionType.SET_INVENTORY_ITEM:
            return {
                ...state,
                listInventoryItem: payload
            };

        case actionType.SET_INVENTORY_BOX:
            return {
                ...state,
                listInventoryBox: payload
            };

        case actionType.SET_LIST_INBOUND_FILE:
            return {
                ...state,
                listInboundFile: payload
            };
        case actionType.SET_LIST_INBOUND_LOG:
            return {
                ...state,
                listInboundLog: payload
            };

        default:
            return { ...state };
    }
};

export default DashboardOpsLead;