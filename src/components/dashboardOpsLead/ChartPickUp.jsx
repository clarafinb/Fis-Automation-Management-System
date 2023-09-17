import React from 'react'
import { CChart } from '@coreui/react-chartjs'
import { CCol, CRow } from '@coreui/react'

function ChartPickUp({ data = {} }) {
    return (
        <>
            <CRow>
                <CCol >
                    <h5 className="card-title mb-0">
                        <span className='text-underline'>CH</span>ART INFORMATION
                    </h5>
                </CCol>
            </CRow>
            <br />
            <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
                <CChart
                    type="bar"
                    data={{
                        labels: [
                            data?.totalOrderReqPickup,
                            data?.orderReqPickupCanceledCount,
                            data?.pickupInTransitCount,
                            data?.pickupOnsiteCount,
                            data?.hoCompleteCount
                        ],
                        datasets: [
                            {
                                label: 'Chart',
                                backgroundColor: [
                                    '#02275D',
                                    '#245EB1',
                                    '#00A9E0',
                                    '#E4AF00',
                                    '#BD9F3B',
                                ],
                                data: [
                                    data?.totalOrderReqPickup,
                                    data?.orderReqPickupCanceledCount,
                                    data?.pickupInTransitCount,
                                    data?.pickupOnsiteCount,
                                    data?.hoCompleteCount
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
            </div>

            <hr />
            <h8><b>INFORMATION :</b></h8>
            <p className='m-0'><img src={'assets/Ellipse1.png'} alt='' /> ORDER REQUEST PICKUP</p>
            <p className='m-0'><img src={'assets/Ellipse2.png'} alt='' /> PICKUP CANCELLED</p>
            <p className='m-0'><img src={'assets/Ellipse3.png'} alt='' /> PICKUP IN TRANSIT</p>
            <p className='m-0'><img src={'assets/Ellipse4.png'} alt='' /> PICKUP ONSITE</p>
            <p className='m-0'><img src={'assets/Ellipse5.png'} alt='' /> PICKUP COMPLETE</p>
        </>
    )
}

export default ChartPickUp