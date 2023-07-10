import React from 'react'
import { CChart } from '@coreui/react-chartjs'

function ChartDetailWarehouse({ data = {} }) {
    return (
        <>
            <CChart
                type="bar"
                data={{
                    labels: [
                        data?.totalOrderReqDelivery,
                        data?.orderReqDeliveryCanceledCount,
                        data?.pickandpackDoneCount,
                        data?.pickupInTransitCount,
                        data?.deliveryCompleteCount
                    ],
                    datasets: [
                        {
                            label: 'Chart',
                            backgroundColor: [
                                '#E4AF00',
                                '#F87272',
                                '#00A9E0',
                                'rgba(#202020, 0.25)',
                                '#4ADE80',
                            ],
                            data: [
                                data?.totalOrderReqDelivery,
                                data?.orderReqDeliveryCanceledCount,
                                data?.pickandpackDoneCount,
                                data?.pickupInTransitCount,
                                data?.deliveryCompleteCount
                            ],
                            borderWidth: 0,
                        },
                    ],
                }}
                options={{
                    plugins: {
                        legend: {
                            display: false, // Menyembunyikan label
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false, // Menyembunyikan garis grid pada sumbu x
                            },
                        },
                        y: {
                            display: false, // Menyembunyikan sumbu y
                            grid: {
                                display: false, // Menyembunyikan garis grid pada sumbu y
                            },
                        },
                    },
                }}
            />
            <hr />
            <h8>INFORMATION :</h8>
            <p className='m-0'><img src={'assets/Ellipse_orange.png'} /> ORDER REQUEST DELIVERY</p>
            <p className='m-0'><img src={'assets/Ellipse_alert.png'} /> ORDER REQUEST CANCLED</p>
            <p className='m-0'><img src={'assets/Ellipse_blue.png'} /> PICK & PACK DONE</p>
            <p className='m-0'><img src={'assets/Ellipse_grey.png'} /> DELIVERY IN TRANSIT</p>
            <p className='m-0'><img src={'assets/Ellipse_green.png'} /> DELIVERY COMPLETE</p>
        </>
    )
}

export default ChartDetailWarehouse