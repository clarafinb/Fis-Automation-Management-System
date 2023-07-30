import * as actionType from "./actionType";

let initialState = {
    project: {},
    listInventoryItem: [],
    listInventoryBox: [],
    listInboundFile: [],
    listInboundLog: [],
    listOrdeRequest: [],
    listPickAndPackPending: [],
    listOrderReqItemWithInventory: [],
    listPickAndPackProgress: [],
    listEvidenceChecklist: [],
    listDeliveryPending: [],
    listDeliveryTransit: []
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

        case actionType.SET_LIST_ORDER_REQUEST:
            return {
                ...state,
                listOrdeRequest: payload
            }

        case actionType.SET_LIST_PICK_AND_PACK_PENDING:
            return {
                ...state,
                listPickAndPackPending: payload
            }

        case actionType.SET_LIST_ORDER_REQ_ITEM_WITH_IVENTORY:
            return {
                ...state,
                listOrderReqItemWithInventory: payload
            }

        case actionType.SET_LIST_PICK_AND_PACK_PROGRESS:
            return {
                ...state,
                listPickAndPackProgress: payload
            }

        case actionType.SET_LIST_EVIDENCE_CHECKLIST:
            return {
                ...state,
                listEvidenceChecklist: payload
            }

        case actionType.SET_LIST_REQUEST_TRANSPORT_ARRANGEMENT:
            return {
                ...state,
                listRequestTransportArragement: payload
            }

        case actionType.SET_LIST_DELIVERY_PENDING:
            return {
                ...state,
                listDeliveryPending: payload
            }

        case actionType.SET_LIST_DELIVERY_TRANSIT:
            return {
                ...state,
                listDeliveryTransit: payload
            }

        case actionType.SET_LIST_DELIVERY_COMPLETE:
            return {
                ...state,
                listDeliveryComplete: payload
            }

        default:
            return { ...state };
    }
};

export default DashboardOpsLead;