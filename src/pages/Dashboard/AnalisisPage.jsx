import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import jumlahPenjualanIcons from '../../assets/Sell.png'
import jumlahDistributorIcons from '../../assets/SellStock.png'
import BarChart from '../../components/Chart/LineChart';
import BarChart2 from '../../components/Chart/BarChart2';
import LineChart from '../../components/Chart/BarChart';
import { useState, useEffect } from 'react';

function AnalisisPage() {

    const [sale, setSale] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/pemin/sale'); // Ganti URL dengan endpoint yang sesuai
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData.data);
                setSale(jsonData.data);

                // Cetak respons ke konsol
                console.log('Data from endpoint:', jsonData);
            } catch (error) {
                console.error('There was an error:', error);
            }
        };

        fetchData();
    }, []);

    const [distributor, setDistributor] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/pemin/distributor'); // Ganti URL dengan endpoint yang sesuai
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData.data);
                setDistributor(jsonData.data);

                // Cetak respons ke konsol
                console.log('Data from endpoint:', jsonData);
            } catch (error) {
                console.error('There was an error:', error);
            }
        };

        fetchData();
    }, []);

    const [produk, setProduk] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/pemin/product'); // Ganti URL dengan endpoint yang sesuai
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData.data);
                setProduk(jsonData.data);

        
                console.log('Data from endpoint:', jsonData);
            } catch (error) {
                console.error('There was an error:', error);
            }
        };

        fetchData();
    }, []);


    const totalSales = sale.reduce((acc, sale) => acc + sale.jumlah, 0);
    const dataDistributor = distributor.length;


    const totalSalesPerMonthAndProduct = sale.reduce((acc, sale) => {
        const saleDate = new Date(sale.tanggal_pemesanan);
        const monthYearKey = `${saleDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} ${saleDate.getFullYear()}`;
        acc[monthYearKey] = acc[monthYearKey] || {};
        const product = produk.find(product => product.id === sale.product_id);
        if (!acc[monthYearKey][sale.product_id]) {
            acc[monthYearKey][sale.product_id] = {
                product_name: product ? product.nama_produk : 'Unknown Product',
                total_quantity: 0,
            };
        }
        acc[monthYearKey][sale.product_id].total_quantity += sale.jumlah;

        return acc;
    }, {});
    console.log(totalSalesPerMonthAndProduct);


    const totalStockPerProduct = {};

    produk.forEach(product => {
        const productName = product.nama_produk;
        const productStock = product.stok;

        totalStockPerProduct[productName] = productStock;
    });

    console.log('Total Stock Per Product:', totalStockPerProduct);


    const distributionForCurrentMonth = [];
    const currentMonthYear = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric' });

    sale.forEach(saleItem => {
        const productId = saleItem.product_id;
        const product = produk.find(product => product.id === productId);
        const distributorId = saleItem.distributor_id;
        const distributorInfo = distributor.find(distributor => distributor.id === distributorId);

        if (product && distributorInfo) {
            const monthYearKey = new Date(saleItem.tanggal_pemesanan).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric' });
            if (monthYearKey === currentMonthYear) {
                const productName = product.nama_produk;
                const distributorName = distributorInfo.nama_distributor;
                const quantity = saleItem.jumlah;

                distributionForCurrentMonth.push({ distributorName, productName, quantity });
            }
        }
    });

    console.log('Distribution for Current Month:', distributionForCurrentMonth);





    return (
        <div className='flex w-screen h-screen bg-[#E8EBF0] '>

            <Sidebar />

            <div className='w-10/12   mx-[20px] my-[27px] '>
                <div className='w-full h-[86px] bg-blue-500 rounded-t-lg mb-2 text-white font-medium text-[30px] px-5 flex items-center '>Analisis</div>
                <div className='flex grid-cols-2 gap-5'>
                    <div className='w-6/12'>
                        <div className='max-h-[240px] h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2 bg-white'>
                            <div className='font-normal  text-xl text-center mb-2'>Total penjualan produk per bulan</div>
                            <div className="flex justify-center">
                                <BarChart totalSalesPerMonthAndProduct={totalSalesPerMonthAndProduct} />
                            </div>

                        </div>
                        <div className='h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2 bg-white'>
                            <div className='font-normal text-xl text-center mb-2'>Total Stok Produk</div>
                            <div className='flex justify-center w-full mb-2'>
                                <LineChart totalStockPerProduct={totalStockPerProduct} />
                            </div>
                        </div>
                    </div>
                    <div className='w-6/12'>
                        <div className='max-h-[240px]'>
                            <div className='h-[110px] border-full border-blue-400  bg-white border-2 rounded-lg mb-4 flex justify-center items-center'>
                                <div className='font-bold text-[32px] mr-[42px]'>{totalSales}</div>
                                <div className='font-normal text-xl mr-[42px]'>Jumlah Penjualan</div>
                                <img src={jumlahPenjualanIcons} alt="" />
                            </div>
                            <div className='h-[110px] border-full border-blue-400 border-2 rounded-lg mb-4 flex justify-center items-center bg-white'>
                                <div className='font-bold text-[32px] mr-[42px]'>{dataDistributor}</div>
                                <div className='font-normal text-xl mr-[42px]'>Jumlah Distributor</div>
                                <img src={jumlahDistributorIcons} alt="" />
                            </div>
                        </div>
                        <div className='h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2 bg-white'>
                            <div className='font-normal text-xl text-center mb-2'>Distribusi produk ke distributor per bulan</div>
                            <div className='flex justify-center w-full mb-2'>
                                <BarChart2 data={distributionForCurrentMonth} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalisisPage
