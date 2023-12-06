import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ totalStockPerProduct }) => {
    const chartRef = useRef(null);

    useEffect(() => {
       
        const data = {
            labels: Object.keys(totalStockPerProduct),
            datasets: [
                {
                    label: 'Total Stock Per Product',
                    data: Object.values(totalStockPerProduct), 
                    backgroundColor: [
                        'rgba(255, 106, 255, 100)',
                        'rgba(255, 213, 106, 100)',
                        'rgba(106, 255, 138, 100)',
                        
                    ],
                    borderColor: [
                        'rgba(255, 106, 255, 100)',
                        'rgba(255, 213, 106, 100)',
                        'rgba(106, 255, 138, 100)',
                        
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };
        const myChart = new Chart(chartRef.current, {
            type: 'bar',
            data: data,
            options: options,
        });

        return () => {
            myChart.destroy();
        };
    }, [totalStockPerProduct]);

    return (
        <div className='max-w-[400px] h-[500px]'>
            <canvas ref={chartRef} width={20} height={10}></canvas>
        </div>
    );
};

export default LineChart;
