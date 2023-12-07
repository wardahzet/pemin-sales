import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({totalSalesPerMonthAndProduct}) => {
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
                    backgroundColor: 'rgba(255, 106, 255, 100)',
                    borderColor: 'rgba(255, 106, 255, 100)',
                    borderWidth: 1,
                },
                {
                    label: 'Petroleum',
                    data: petroleumData,
                    backgroundColor: 'rgba(255, 213, 106, 100)',
                    borderColor: 'rgba(255, 213, 106, 100)',
                    borderWidth: 1,
                },
                {
                    label: 'Kerosin',
                    data: kerosinData,
                    backgroundColor: 'rgba(106, 255, 138, 100)',
                    borderColor: 'rgba(106, 255, 138, 100)',
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
            type: 'line',
            data: data,
            options: options,
        });

        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <div className='max-w-[375px]'>
            <canvas ref={chartRef} width={450}></canvas>
        </div>

    )

};

export default BarChart;
