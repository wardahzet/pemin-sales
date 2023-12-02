import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Data contoh
        const data = {
            labels: ['Jan', 'Feb', 'Maret', 'April', 'Mei', 'Juni', 'Jully', 'Agustus', 'September', 'Oktober', 'November','Desember'],
            datasets: [
                {
                    label: 'Gasoline',
                    data: [12, 19, 3, 5, 2,10,12,10,13,14,15,16],
                    backgroundColor: 'rgba(255, 106, 255, 100)',
                    borderColor: 'rgba(255, 106, 255, 100)',
                    borderWidth: 1,
                },
                {
                    label: 'Petroleum',
                    data: [10,12,10,13,14,15,16,12, 19, 3, 5, 2,],
                    backgroundColor: 'rgba(255, 213, 106, 100)',
                    borderColor: 'rgba(255, 213, 106, 100)',
                    borderWidth: 1,
                },
                {
                    label: 'Kerosin',
                    data: [10,12,10,13, 19, 3, 5, 2,14,15,16,12,],
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
            type: 'line',
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
