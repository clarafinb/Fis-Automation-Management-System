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
    listDeliveryTransit: [],
    listMasterLocation: [],
    listHoDocument: [],
    listRequestTransportArragement: [],
    listTransportArragementSc: [],
    listOrdeRequestAdditionalService: [],
    listTransportArragement: [],
    listTransportArrangmentType: [],
    listOrdeRequestPickup: [],
    listPickupPreparation: [],
    listDeliveryOnSite: [],
    listDeliveryOnSiteEvidence: [],
    listWaitingTransportAssignment: [],
    listOutboundLog: [],
    listTransportArragementOrderRequest: [],
    listWaitingTransporComplete: [],
    listPickupOnsite: [],
    listHoComplete: [],
    listBackToPool: [],
    listPickupTransit: [],
    listInventoryDetailItem: [],
    listInventoryDetailBox: [],
    listFinalConfirm: [],
    listFinalConfirmCostTransportDelivery: [],
    listFinalConfirmWhCost: [],
    listFinalComplete: [],
    listFinalCompleteOrderReq: [],
    listFinalCompleteCostTransport: [],
    listFinalCompleteWhCost: [],
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

        case actionType.SET_LIST_MASTER_LOCATION:
            return {
                ...state,
                listMasterLocation: payload
            }

        case actionType.SET_LIST_HO_DOCUMENT:
            return {
                ...state,
                listHoDocument: payload
            }

        case actionType.SET_LIST_TRANSPORT_ARRANGEMENT_SC:
            return {
                ...state,
                listTransportArragementSc: payload
            }

        case actionType.SET_LIST_ORDER_REQUEST_ADDITIONAL_SERVICE:
            return {
                ...state,
                listOrdeRequestAdditionalService: payload
            }


        case actionType.SET_LIST_TRANSPORT_ARRAGEMENT:
            return {
                ...state,
                listTransportArragement: payload
            }

        case actionType.SET_LIST_TRANSPORT_ARRANGEMENT_TYPE:
            return {
                ...state,
                listTransportArrangmentType: payload
            }

        case actionType.SET_LIST_ORDER_REQUEST_PICKUP:
            return {
                ...state,
                listOrdeRequestPickup: payload
            }

        case actionType.SET_LIST_PICKUP_PREPARATION:
            return {
                ...state,
                listPickupPreparation: payload
            }

        case actionType.SET_LIST_DELIVERY_ONSITE:
            return {
                ...state,
                listDeliveryOnSite: payload
            }

        case actionType.SET_LIST_DELIVERY_ONSITE_EVIDENCE:
            return {
                ...state,
                listDeliveryOnSiteEvidence: payload
            }

        case actionType.SET_LIST_WAITING_TRANSPORT_ASSIGNMENT:
            return {
                ...state,
                listWaitingTransportAssignment: payload
            }

        case actionType.SET_LIST_TRANSPORT_ARRAGEMENT_ORDER_REQUEST:
            return {
                ...state,
                listTransportArragementOrderRequest: payload
            }

        case actionType.SET_LIST_WAITING_TRANSPORT_COMPLETE:
            return {
                ...state,
                listWaitingTransporComplete: payload
            }

        case actionType.SET_LIST_PICKUP_ONSITE:
            return {
                ...state,
                listPickupOnsite: payload
            }

        case actionType.SET_LIST_HO_COMPLETE:
            return {
                ...state,
                listHoComplete: payload
            }

        case actionType.SET_LIST_BACK_TO_POOL:
            return {
                ...state,
                listBackToPool: payload
            }

        case actionType.SET_LIST_PICKUP_TRANSIT:
            return {
                ...state,
                listPickupTransit: payload
            }

        case actionType.SET_LIST_INVENTEORY_ITEM_DETAIL:
            return {
                ...state,
                listInventoryDetailItem: payload
            }

        case actionType.SET_LIST_INVENTEORY_BOX_DETAIL:
            return {
                ...state,
                listInventoryDetailBox: payload
            }

        case actionType.SET_LIST_FINAL_CONFIRM:
            return {
                ...state,
                listFinalConfirm: payload
            }

        case actionType.SET_LIST_FINAL_CONFIRM_COST_TRANSPORT_DELIVERY:
            return {
                ...state,
                listFinalConfirmCostTransportDelivery: payload
            }

        case actionType.SET_LIST_FINAL_CONFIRM_WH_COST:
            return {
                ...state,
                listFinalConfirmWhCost: payload
            }

        case actionType.SET_LIST_FINAL_COMPLETE:
            return {
                ...state,
                listFinalComplete: payload
            }

        case actionType.SET_LIST_FINAL_COMPLETE_ORDER_REQ:
            return {
                ...state,
                listFinalCompleteOrderReq: payload
            }

        case actionType.SET_LIST_FINAL_COMPLETE_COST_TRANSPORT:
            return {
                ...state,
                listFinalCompleteCostTransport: payload
            }

        case actionType.SET_LIST_FINAL_COMPLETE_WH_COST:
            return {
                ...state,
                listFinalCompleteWhCost: payload
            }

        default:
            return { ...state };
    }
};

export default DashboardOpsLead;