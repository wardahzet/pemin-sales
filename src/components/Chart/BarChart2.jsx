import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Extracting unique product names and distributor names from the data
        const productNames = [...new Set(data.map(item => item.productName))];
        const distributorNames = [...new Set(data.map(item => item.distributorName))];

    
        const datasets = productNames.map((productName, index) => {
            const quantities = distributorNames.map(distributorName => {
                const dataPoint = data.find(item => item.productName === productName && item.distributorName === distributorName);
                return dataPoint ? dataPoint.quantity : 0;
            });

           
            let backgroundColor, borderColor;

            if (productName === 'Gasoline') {
                backgroundColor = 'rgba(255, 104, 233, 1)';
                borderColor = 'rgba(255, 104, 233, 1)';
            } else if (productName === 'Petrolium') {
                backgroundColor = 'rgba(255, 213, 106, 1)';
                borderColor = 'rgba(255, 213, 106, 1)';
            } else if (productName === 'Kerosin') {
                backgroundColor = 'rgba(106, 255, 138, 1)';
                borderColor = 'rgba(106, 255, 138, 1)';
            } else {
                backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
                borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
            }
            return {
                label: productName,
                data: quantities,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            };
        });

    
        const dataConfig = {
            labels: distributorNames,
            datasets: datasets,
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
            data: dataConfig,
            options: options,
        });
        return () => {
            myChart.destroy();
        };
    }, [data]);

    return (
        <div className='max-w-[400px] h-[500px]'>
            <canvas ref={chartRef} width={20} height={10}></canvas>
        </div>
    );
};

export default BarChart;
