import * as actionType from "./actionType";

let initialState = {
    detailDashboard: {},
    listProject: [],
    listServiceCharge: [],
    listDeliveryMode: [],
    listTransportMode: [],
    listTransportType: [],
    listUom: [],
    listWarehouse: [],
    listProjectServiceCharge: [],
    listSku: [],
    listCustomer: [],
    listProjectMember: [],
    listUserNotRegisteredByRolePm: [],
    listAccountManagement: [],
    listWarehouseMembership: [],
    listOrdeRequest: [],
    listPickAndPackPending: [],
    listPickAndPackProgress: [],
    listOrdeRequestAdditionalService: []
};

const Dashboard = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.SET_DETAIL_DASHBOARD:
            return {
                ...state,
                detailDashboard: payload
            };

        case actionType.SET_DASHBOARD:
            return {
                ...state,
                ...payload
            };

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

        case actionType.SET_LIST_CUSTOMER:
            return {
                ...state,
                listCustomer: payload
            }

        case actionType.SET_LIST_PROJECT_MEMBER:
            return {
                ...state,
                listProjectMember: payload
            }

        case actionType.SET_LIST_USER_NOT_REGISTERED_PM:
            return {
                ...state,
                listUserNotRegisteredByRolePm: payload
            }
        case actionType.SET_LIST_ACCOUNT_MANAGEMENT:
            return {
                ...state,
                listAccountManagement: payload
            }
        case actionType.SET_LIST_WAREHOUSE_MEMBERSHIP:
            return {
                ...state,
                listWarehouseMembership: payload
            }
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

        case actionType.SET_LIST_PICK_AND_PACK_PROGRESS:
            return {
                ...state,
                listPickAndPackProgress: payload
            }
        case actionType.SET_LIST_ORDER_REQUEST_ADDITIONAL_SERVICE:
            return {
                ...state,
                listOrdeRequestAdditionalService: payload
            }

        default:
            return { ...state };
    }
};

export default Dashboard;