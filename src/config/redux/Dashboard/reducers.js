import * as actionType from "./actionType";

let initialState = {
    detailDashboard: {},
    menu: [],
    activeMenu: "",
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
    listSubDistrict: [],
    listMasterWarehouseType: [],
    listBulkUploadSku: [],
    listEvidenceChecklist: [],
    listEvidenceChecklistProject: [],
    listMasterAssetTruck: [],
    listMasterPlateCode: [],
    listMrs: [],
    listMrsDetail: [],
    listMrsDetailBulkUpload: [],
    listTemplateSetting: []
};

const Dashboard = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.SET_DETAIL_DASHBOARD:
            return {
                ...state,
                detailDashboard: payload
            };

        case actionType.RESET_DETAIL_DASHBOARD:
            return {
                ...state,
                detailDashboard: {}
            };

        case actionType.SET_DASHBOARD:
            return {
                ...state,
                ...payload
            };

        case actionType.SET_MENU:
            return {
                ...state,
                menu: payload
            };

        case actionType.SET_ACTIVE_MENU:
            return {
                ...state,
                activeMenu: payload
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

        case actionType.SET_LIST_SUB_DISTRICT:
            return {
                ...state,
                listSubDistrict: payload
            }

        case actionType.SET_LIST_MASTER_WAREHOUSE_TYPE:
            return {
                ...state,
                listMasterWarehouseType: payload
            }

        case actionType.SET_LIST_BULK_UPLOAD_SKU:
            return {
                ...state,
                listBulkUploadSku: payload
            }
        case actionType.SET_LIST_EVIDENCE_CHECKLIST:
            return {
                ...state,
                listEvidenceChecklist: payload
            }
        case actionType.SET_LIST_EVIDENCE_CHECKLIST_PROJECT:
            return {
                ...state,
                listEvidenceChecklistProject: payload
            }
        case actionType.SET_LIST_MASTER_ASSET_TRUCK:
            return {
                ...state,
                listMasterAssetTruck: payload
            }
        case actionType.SET_LIST_MASTER_PLATE_CODE:
            return {
                ...state,
                listMasterPlateCode: payload
            }
        case actionType.SET_LIST_MRS:
            return {
                ...state,
                listMrs: payload
            }

        case actionType.RESET_ACTIVE_MENU:
            return {
                ...state,
                activeMenu: ""
            }

        case actionType.SET_LIST_MRS_DETAIL:
            return {
                ...state,
                listMrsDetail: payload
            }

        case actionType.SET_LIST_MRS_DETAIL_BULK_UPLOAD:
            return {
                ...state,
                listMrsDetailBulkUpload: payload
            }

        case actionType.SET_LIST_TEMPLATE_SETTING:
            return {
                ...state,
                listTemplateSetting: payload
            }

        default:
            return { ...state };
    }
};

export default Dashboard;