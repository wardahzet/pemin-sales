import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

const BarChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Data contoh
        const data = {
            labels: ['Gasoline', 'Petroleum', 'Kerosin'],
            datasets: [
                {
                    label: 'Gasoline',
                    data: [12, 19, 3],
                    backgroundColor: 'rgba(255, 106, 255, 100)',
                    borderColor: 'rgba(255, 106, 255, 100)',
                    borderWidth: 1,
                },
                {
                    label: 'Petroleum',
                    data: [10,12,10],
                    backgroundColor: 'rgba(255, 213, 106, 100)',
                    borderColor: 'rgba(255, 213, 106, 100)',
                    borderWidth: 1,
                },
                {
                    label: 'Kerosin',
                    data: [10,12,10,13],
                    backgroundColor: 'rgba(106, 255, 138, 100)',
                    borderColor: 'rgba(106, 255, 138, 100)',
                    borderWidth: 1,
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

    )

};

export default BarChart;
