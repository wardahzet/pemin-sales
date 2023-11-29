import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Updated data
        const data = {
            labels: ['Gasoline', 'Petroleum', 'Kerosin'],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [10, 20, 30], // Different data values for each label
                    backgroundColor: [
                        'rgba(255, 106, 255, 100)',
                        'rgba(255, 213, 106, 100)',
                        'rgba(106, 255, 138, 100)',
                    ], // Different colors for each bar
                    borderColor: [
                        'rgba(255, 106, 255, 100)',
                        'rgba(255, 213, 106, 100)',
                        'rgba(106, 255, 138, 100)',
                    ],
                    borderWidth: 1,
                    labels: ['Gasoline', 'Petroleum', 'Kerosin'], // Labels for each color
                },
            ],
        };

        // Konfigurasi chart
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        // Membuat chart
        const myChart = new Chart(chartRef.current, {
            type: 'bar',
            data: data,
            options: options,
        });

        // Membersihkan chart saat komponen dibongkar
        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <div className='max-w-[400px] h-[500px]'>
            <canvas ref={chartRef} width={20} height={10}></canvas>
        </div>
    );
};

export default LineChart;
