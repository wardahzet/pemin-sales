import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Data contoh
    const data = {
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
      datasets: [
        {
          label: 'Data Set 1',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
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

  return <canvas ref={chartRef} style={{ width: '50px' }}></canvas>;
};

export default BarChart;
