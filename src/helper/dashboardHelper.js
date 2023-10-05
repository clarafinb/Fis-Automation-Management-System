export const manipulateDataTableDashboard = (data) => {
    let listData = data?.map((item, idx) => {
        return {
            projectName: item?.projectName,
            whName: item?.whName,
            whCode: item?.whCode,
            projectId: item?.projectId,
            whId: item?.whId,
            delivery: [
                {
                    no: 1,
                    transaction: "ORDER REQUEST DELIVERY",
                    totalTransaction: item?.totalOrderReqDelivery,
                    color: "#02275D",
                    key: "orderRequest",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 2,
                    transaction: "PICK AND PACK PENDING",
                    totalTransaction: item?.pickandpackpendingCount,
                    color: "#245EB1",
                    key: "pickAndPackPending",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 3,
                    transaction: "PICK AND PACK ON PROGRESS",
                    totalTransaction: item?.pickandpackOnProgressCount,
                    color: "#00A9E0",
                    key: "pickAndPackProgress",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 4,
                    transaction: "WAITING DISPATCH",
                    totalTransaction: item?.waitingDispatchCount,
                    color: "#E4AF00",
                    key: "waitingDispatch",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 5,
                    transaction: "DELIVERY IN TRANSIT",
                    totalTransaction: item?.deliveryInTransitCount,
                    color: "#BD9F3B",
                    key: "deliveryTransit",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 6,
                    transaction: "DELIVERY ON SITE",
                    totalTransaction: item?.deliveryOnsiteCount,
                    color: "#F87272",
                    key: "deliveryOnSite",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 7,
                    transaction: "DELIVERY COMPLETE",
                    totalTransaction: item?.deliveryCompleteCount,
                    color: "#4ADE80",
                    key: "deliveryComplete",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                },
                {
                    no: 8,
                    transaction: "BACK TO POOL",
                    totalTransaction: item?.btpCount,
                    color: "#02275D",
                    key: "backToPool",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }
            ],
            pickUp: [
                {
                    no: 1,
                    transaction: "ORDER REQUEST PICKUP",
                    totalTransaction: item?.totalOrderReqPickup,
                    color: "#02275D",
                    key: "orderRequestPickup",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 2,
                    transaction: "PICKUP PREPARATION",
                    totalTransaction: item?.pickupPrepCount,
                    color: "#245EB1",
                    key: "pickupPreparation",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 3,
                    transaction: "WAITING TRANSPORT ASSIGNMENT",
                    totalTransaction: item?.waitingTransportAssignmentCount,
                    color: "#00A9E0",
                    key: "waitingTransportAssignment",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 4,
                    transaction: "WAITING TRANSPORT CONFIRM",
                    totalTransaction: item?.waitingDispatcherConfirmCount,
                    color: "#4ADE80",
                    key: "waitingTransportConfirm",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 5,
                    transaction: "PICKUP IN TRANSIT",
                    totalTransaction: item?.pickupInTransitCount,
                    color: "#E4AF00",
                    key: "pickupInTransit",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 6,
                    transaction: "ON SITE",
                    totalTransaction: item?.pickupOnsiteCount,
                    color: "#BD9F3B",
                    key: "pickupOnsite",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }, {
                    no: 7,
                    transaction: "HO COMPLETED",
                    totalTransaction: item?.hoCompleteCount,
                    color: "#F87272",
                    key: "hoComplete",
                    whId: item?.whId,
                    whName: item?.whName,
                    projectId: item?.projectId,
                    projectName: item?.projectName
                }
            ]
        }
    })

    return listData

}
