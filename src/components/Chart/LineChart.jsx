import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ totalSalesPerMonthAndProduct }) => {
  const chartRef = useRef(null);
  const months = Object.keys(totalSalesPerMonthAndProduct);

  const kerosinData = months.map(monthYearKey => {
    const productData = totalSalesPerMonthAndProduct[monthYearKey]['3'];
    return productData ? productData.total_quantity : 0;
  });

  const petroleumData = months.map(monthYearKey => {
    const productData = totalSalesPerMonthAndProduct[monthYearKey]['2'];
    return productData ? productData.total_quantity : 0;
  });

  const gasolineData = months.map(monthYearKey => {
    const productData = totalSalesPerMonthAndProduct[monthYearKey]['1'];
    return productData ? productData.total_quantity : 0;
  });

  useEffect(() => {
    const data = {
      labels: months.map(monthYearKey => monthYearKey),
      datasets: [
        {
          label: 'Gasoline',
          data: gasolineData,
          backgroundColor: 'rgba(255, 106, 255, 0.5)',
          borderColor: 'rgba(255, 106, 255, 1)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Petroleum',
          data: petroleumData,
          backgroundColor: 'rgba(255, 213, 106, 0.5)',
          borderColor: 'rgba(255, 213, 106, 1)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Kerosin',
          data: kerosinData,
          backgroundColor: 'rgba(106, 255, 138, 0.5)',
          borderColor: 'rgba(106, 255, 138, 1)',
          borderWidth: 1,
          fill: false,
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
      type: 'line',
      data: data,
      options: options,
    });

    return () => {
      myChart.destroy();
    };
  }, [totalSalesPerMonthAndProduct]); 

  return (
    <div className='max-w-[375px]'>
      <canvas ref={chartRef} width={450}></canvas>
    </div>
  );
};

export default LineChart;
